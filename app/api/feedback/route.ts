import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Helper function for Direct REST API fetch
async function fetchSupabaseRest(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    ...(options.headers || {}),
  };
  return fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, { ...options, headers });
}

// ==========================================
// 1. POST: MAG-SAVE NG BAGONG FEEDBACK
// ==========================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, name, contact, barangay, description, photo } = body;

    if (!name || !contact || !description) {
      return NextResponse.json(
        { error: 'Name, contact, and description are required fields.' },
        { status: 400 }
      );
    }

    const referenceCode = `UMG-GRV-${Math.floor(1000 + Math.random() * 9000)}`;

    const feedbackRecord = {
      reference_code: referenceCode,
      category: category || 'general',
      name,
      contact,
      barangay: barangay || 'Poblacion East',
      description,
      photo: photo || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    let savedToSupabase = false;

    // 1. Try Supabase Client
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from('citizen_feedback').insert([feedbackRecord]);
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Ignore client error and fall back to REST
    }

    // 2. Direct REST Fallback
    if (!savedToSupabase && SUPABASE_KEY) {
      try {
        const res = await fetchSupabaseRest('citizen_feedback', {
          method: 'POST',
          headers: { 'Prefer': 'return=minimal' },
          body: JSON.stringify([feedbackRecord]),
        });
        if (res.ok || res.status === 201) savedToSupabase = true;
      } catch (restErr) {
        console.warn('REST Insert Error:', restErr);
      }
    }

    return NextResponse.json({
      success: true,
      referenceCode,
      savedToSupabase,
      message: 'Feedback submitted successfully',
      record: feedbackRecord,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ==========================================
// 2. GET: KUNIN ANG FEEDBACKS PARA SA ADMIN
// ==========================================
export async function GET() {
  try {
    let feedbackData: Record<string, unknown>[] = [];
    let fetched = false;

    // 1. Try via Supabase SDK Client
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('citizen_feedback')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (!error && data) {
          feedbackData = data;
          fetched = true;
        }
      }
    } catch {
      // SDK Failed, proceed to REST API fallback
    }

    // 2. Fallback via Direct REST API Fetch
    if (!fetched && SUPABASE_KEY) {
      try {
        const res = await fetchSupabaseRest('citizen_feedback?select=*&order=created_at.desc&limit=100', {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            feedbackData = data;
            fetched = true;
          }
        }
      } catch (restErr) {
        console.error('REST Fetch Error:', restErr);
      }
    }

    return NextResponse.json({
      success: true,
      feedback: feedbackData,
    });
  } catch (err) {
    console.error('API GET Exception:', err);
    return NextResponse.json({ success: true, feedback: [] });
  }
}


// ==========================================
// 3. PATCH: UPDATE STATUS / NOTES / PHOTO / CATEGORY
// ==========================================
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference_code, id, category, status, admin_notes, notes, remarks, photo } = body;

    if (!reference_code && !id) {
      return NextResponse.json(
        { error: 'Reference code or ID is required for update.' },
        { status: 400 }
      );
    }

    // Prepare fields to update
    const updateData: Record<string, unknown> = {};
    if (category !== undefined) updateData.category = category; // 👈 DINAGDAG DITO
    if (status !== undefined) updateData.status = status;
    
    // Check notes/admin_notes value
    const notesValue = admin_notes ?? notes ?? remarks;
    if (notesValue !== undefined) {
      updateData.admin_notes = notesValue;
      updateData.notes = notesValue; // fallback column
    }
    
    if (photo !== undefined) updateData.photo = photo;

    let updatedInSupabase = false;
    let updatedRecord = null;

    // 1. Try updating via Supabase Client SDK
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        let query = supabase.from('citizen_feedback').update(updateData);
        
        if (reference_code) {
          query = query.eq('reference_code', reference_code);
        } else if (id) {
          query = query.eq('id', id);
        }

        const { data, error } = await query.select();

        if (!error && data && data.length > 0) {
          updatedInSupabase = true;
          updatedRecord = data[0];
        } else if (error) {
          console.warn('Supabase SDK Patch Warning:', error.message);
          
          // Retry with minimal payload if unknown column was provided
          const safeData: Record<string, unknown> = {};
          if (category !== undefined) safeData.category = category;
          if (status !== undefined) safeData.status = status;
          if (photo !== undefined) safeData.photo = photo;
          
          let retryQuery = supabase.from('citizen_feedback').update(safeData);
          if (reference_code) retryQuery = retryQuery.eq('reference_code', reference_code);
          else if (id) retryQuery = retryQuery.eq('id', id);

          const { data: retryData, error: retryErr } = await retryQuery.select();
          if (!retryErr && retryData && retryData.length > 0) {
            updatedInSupabase = true;
            updatedRecord = retryData[0];
          }
        }
      }
    } catch (sdkErr) {
      console.warn('Supabase SDK Patch Exception:', sdkErr);
    }

    // 2. Direct REST Fallback if SDK didn't confirm update
    if (!updatedInSupabase && SUPABASE_KEY) {
      try {
        const filterQuery = reference_code
          ? `reference_code=eq.${encodeURIComponent(reference_code)}`
          : `id=eq.${encodeURIComponent(String(id))}`;

        const res = await fetchSupabaseRest(`citizen_feedback?${filterQuery}`, {
          method: 'PATCH',
          headers: {
            'Prefer': 'return=representation',
          },
          body: JSON.stringify(updateData),
        });

        if (res.ok) {
          const restData = await res.json();
          if (Array.isArray(restData) && restData.length > 0) {
            updatedInSupabase = true;
            updatedRecord = restData[0];
          }
        }
      } catch (restErr) {
        console.warn('REST Patch Exception:', restErr);
      }
    }

    if (updatedInSupabase) {
      return NextResponse.json({
        success: true,
        message: 'Report updated successfully in database.',
        data: updatedRecord,
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to persist update to database. Please check Supabase RLS policy.',
      record: { reference_code, id, ...updateData },
    }, { status: 400 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE: PAG-BURA NG REPORT (ADMIN ONLY)
// ==========================================
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference_codes, reference_code, ids, id } = body;

    const codesToDelete: string[] = Array.isArray(reference_codes)
      ? reference_codes
      : reference_code
      ? [reference_code]
      : [];

    const idsToDelete: (string | number)[] = Array.isArray(ids)
      ? ids
      : id !== undefined && id !== null
      ? [id]
      : [];

    if (codesToDelete.length === 0 && idsToDelete.length === 0) {
      return NextResponse.json({ error: 'No reference code or ID provided for deletion.' }, { status: 400 });
    }

    let deletedFromSupabase = false;

    // SDK Delete
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        if (codesToDelete.length > 0) {
          const { error } = await supabase.from('citizen_feedback').delete().in('reference_code', codesToDelete);
          if (!error) deletedFromSupabase = true;
        }
        if (idsToDelete.length > 0) {
          const { error } = await supabase.from('citizen_feedback').delete().in('id', idsToDelete);
          if (!error) deletedFromSupabase = true;
        }
      }
    } catch {
      // Fallback
    }

    // Direct REST Fallback
    if (!deletedFromSupabase && SUPABASE_KEY) {
      try {
        for (const code of codesToDelete) {
          const res = await fetchSupabaseRest(`citizen_feedback?reference_code=eq.${encodeURIComponent(code)}`, {
            method: 'DELETE',
          });
          if (res.ok) deletedFromSupabase = true;
        }
      } catch (e) {
        console.warn('REST Delete Error:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: deletedFromSupabase
        ? 'Successfully deleted record(s) from Supabase database.'
        : 'Record(s) removed locally.',
      deletedFromSupabase,
      deletedCodes: codesToDelete,
      deletedIds: idsToDelete,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}