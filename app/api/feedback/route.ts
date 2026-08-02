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

export async function GET() {
  const supabaseUrl = 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
  const supabaseKey = 'sb_publishable_Zph252PPdN06eVnIiiNGaA_QdPFt9li';

  try {
    const restRes = await fetch(`${supabaseUrl}/rest/v1/citizen_feedback?select=*&order=created_at.desc&limit=20`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      cache: 'no-store',
    });

    if (restRes.ok) {
      const data = await restRes.json();
      return NextResponse.json({
        success: true,
        feedback: data || [],
      });
    }

    return NextResponse.json({
      success: false,
      feedback: [],
    });
  } catch {
    return NextResponse.json({
      success: false,
      feedback: [],
    });
  }
}
