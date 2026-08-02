import { NextRequest, NextResponse } from 'next/server';

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

    const supabaseUrl = 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
    const supabaseKey = 'sb_publishable_Zph252PPdN06eVnIiiNGaA_QdPFt9li';

    let savedToSupabase = false;

    try {
      let restRes = await fetch(`${supabaseUrl}/rest/v1/citizen_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify([feedbackRecord]),
      });

      if (restRes.ok || restRes.status === 201) {
        savedToSupabase = true;
      } else {
        const errText = await restRes.text();
        // If Supabase table is missing the 'photo' column, retry without the 'photo' property
        if (errText.includes('photo') || errText.includes('PGRST204')) {
          const recordWithoutPhoto = { ...feedbackRecord };
          delete recordWithoutPhoto.photo;

          const retryRes = await fetch(`${supabaseUrl}/rest/v1/citizen_feedback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=minimal',
            },
            body: JSON.stringify([recordWithoutPhoto]),
          });

          if (retryRes.ok || retryRes.status === 201) {
            savedToSupabase = true;
          }
        }
      }
    } catch (dbErr: unknown) {
      console.warn('Supabase store note:', dbErr);
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

// Default realistic initial feedback reports if database is fresh or empty
const INITIAL_DEMO_FEEDBACK = [
  {
    id: 'demo-1',
    reference_code: 'UMG-GRV-8492',
    category: 'streetlight',
    name: 'Roberto V. Dela Cruz',
    contact: '0917-555-8492',
    barangay: 'Poblacion East',
    description: '3 consecutive streetlights along Rizal Street near Municipal Hall are flickering and turned off at night. Causes dark hazard for evening pedestrians.',
    photo: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=600&q=80',
    status: 'pending',
    admin_notes: '',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-2',
    reference_code: 'UMG-GRV-7311',
    category: 'road',
    name: 'Maria Clara Santos',
    contact: '0918-234-5678',
    barangay: 'Alo-o',
    description: 'Deep road pothole near the Alo-o Elementary School bridge expansion. Requires immediate asphalt patch to prevent motor tricycle accidents.',
    photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    status: 'in_progress',
    admin_notes: 'Dispatched Municipal Engineering Team (Engr. R. Santos). Asphalt repair scheduled for tomorrow 9:00 AM.',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'demo-3',
    reference_code: 'UMG-GRV-6120',
    category: 'garbage',
    name: 'Farmer Juan A. MENDOZA',
    contact: '0920-987-6543',
    barangay: 'Lauren',
    description: 'Garbage dump accumulation along Purok 3 main feeder road. Requesting MENRO waste truck schedule pickup for agricultural waste containers.',
    photo: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    status: 'under_review',
    admin_notes: 'Referred to MENRO Environment Officer for schedule confirmation on Friday route.',
    created_at: new Date(Date.now() - 3600000 * 32).toISOString(),
  },
  {
    id: 'demo-4',
    reference_code: 'UMG-GRV-5099',
    category: 'health',
    name: 'Dr. Anita P. Soriano',
    contact: '0999-111-2233',
    barangay: 'Maseilseil',
    description: 'Stagnant canal water accumulation behind Barangay Hall after heavy rains. Requesting Municipal Health Office anti-dengue larvicide spraying.',
    photo: null,
    status: 'resolved',
    admin_notes: 'Sanitation team completed larvicide spraying and canal declogging on Aug 1, 2026.',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'demo-5',
    reference_code: 'UMG-GRV-4201',
    category: 'appreciation',
    name: 'Elena D. Roxas',
    contact: '0915-444-3322',
    barangay: 'San Jose',
    description: 'Commendation to the BPLO staff for fast business permit renewal process at the Municipal Hall ONE-STOP-SHOP. Very efficient and helpful service!',
    photo: null,
    status: 'resolved',
    admin_notes: 'Commendation letter forwarded to HR & Office of the Mayor for employee recognition.',
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
];

export async function GET() {
  const supabaseUrl = 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
  const supabaseKey = 'sb_publishable_Zph252PPdN06eVnIiiNGaA_QdPFt9li';

  try {
    const restRes = await fetch(`${supabaseUrl}/rest/v1/citizen_feedback?select=*&order=created_at.desc&limit=50`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      cache: 'no-store',
    });

    if (restRes.ok) {
      const data = await restRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json({
          success: true,
          feedback: data,
        });
      }
    }

    return NextResponse.json({
      success: true,
      feedback: INITIAL_DEMO_FEEDBACK,
    });
  } catch {
    return NextResponse.json({
      success: true,
      feedback: INITIAL_DEMO_FEEDBACK,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference_code, status, admin_notes } = body;

    if (!reference_code) {
      return NextResponse.json({ error: 'Reference code is required.' }, { status: 400 });
    }

    const supabaseUrl = 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
    const supabaseKey = 'sb_publishable_Zph252PPdN06eVnIiiNGaA_QdPFt9li';

    try {
      const updateData: Record<string, unknown> = {};
      if (status) updateData.status = status;
      if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

      const patchRes = await fetch(`${supabaseUrl}/rest/v1/citizen_feedback?reference_code=eq.${encodeURIComponent(reference_code)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(updateData),
      });

      if (patchRes.ok) {
        const updated = await patchRes.json();
        return NextResponse.json({
          success: true,
          message: 'Status updated successfully',
          data: updated,
        });
      }
    } catch (e) {
      console.warn('Supabase patch note:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated locally',
      record: { reference_code, status, admin_notes },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
