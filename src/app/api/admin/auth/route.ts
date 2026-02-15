import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'veritashearing2026';
const SESSION_TOKEN = 'admin_session';
const TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// POST - Login
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = generateToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

// GET - Verify session
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_TOKEN);

  if (!session?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

// DELETE - Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN);
  return NextResponse.json({ success: true });
}
