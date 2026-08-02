import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const AUTHORIZED_ADMIN_EMAIL = 'karlhenz04@gmail.com';

    // Strictly verify email address first - reject immediately if wrong email
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          error: 'Incorrect email address.',
        },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ketmrgmuhgelxdpqzxrq.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Zph252PPdN06eVnIiiNGaA_QdPFt9li';

    // 1. Attempt official Supabase Auth authentication via REST API
    try {
      const authRes = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      if (authRes.ok) {
        const authData = await authRes.json();
        return NextResponse.json({
          success: true,
          message: 'Authenticated successfully via Supabase Auth!',
          user: authData.user,
          access_token: authData.access_token,
          provider: 'supabase',
        });
      } else {
        const errData = await authRes.json().catch(() => ({}));
        console.warn('Supabase Auth response:', errData);
      }
    } catch (supabaseErr) {
      console.warn('Supabase Auth connection error:', supabaseErr);
    }

    // 2. Validate password for authorized administrator
    if (cleanPassword === 'Haint12@+') {
      return NextResponse.json({
        success: true,
        message: 'Authenticated successfully.',
        user: {
          email: cleanEmail,
          role: 'authenticated',
        },
        provider: 'local_administrator',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Incorrect password.',
      },
      { status: 401 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
