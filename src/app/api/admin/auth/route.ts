import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import {
  generateToken,
  registerToken,
  revokeToken,
  getSessionToken,
} from '@/lib/admin-auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_TOKEN = 'admin_session';
const TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() < entry.lockedUntil) return true;
  loginAttempts.delete(ip);
  return false;
}

function recordFailedAttempt(ip: string): void {
  const entry = loginAttempts.get(ip) ?? { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  loginAttempts.set(ip, entry);
}

function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

// POST - Login
export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD environment variable is not set');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (
      typeof password !== 'string' ||
      !crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(ADMIN_PASSWORD)
      )
    ) {
      recordFailedAttempt(ip);
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = generateToken();
    registerToken(token);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
      path: '/',
    });

    clearAttempts(ip);
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

  // Token must exist in server-side store
  const { verifyAdmin } = await import('@/lib/admin-auth');
  if (!(await verifyAdmin())) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

// DELETE - Logout
export async function DELETE() {
  const token = await getSessionToken();
  if (token) {
    revokeToken(token);
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN);
  return NextResponse.json({ success: true });
}
