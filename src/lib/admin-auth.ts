import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Stateless admin session tokens using HMAC signatures.
 *
 * On Vercel each API route is a separate serverless function — they don't share
 * `global` state, so the previous in-memory `Set<string>` approach meant tokens
 * registered during login (in /api/admin/auth) were invisible to every other
 * route.  By signing the token with a secret derived from ADMIN_PASSWORD, any
 * serverless instance can verify the session without shared state.
 */

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }
  return secret;
}

// ── Public helpers ──────────────────────────────────────────────────────

export function generateToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${token}.${expiresAt}`;
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/** No-op kept for API compat — signing replaces the in-memory store. */
export function registerToken(_token: string): void {
  // Token is self-validating via HMAC; nothing to store.
}

/** No-op kept for API compat — logout simply clears the cookie. */
export function revokeToken(_token: string): void {
  // Nothing to revoke server-side; the cookie is deleted client-side.
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) return false;
  return isValidSession(session.value);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// ── Internal ────────────────────────────────────────────────────────────

function isValidSession(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 3) return false;

  const [token, expiresAtStr, signature] = parts;

  // Check expiry
  const expiresAt = parseInt(expiresAtStr, 10);
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;

  // Verify HMAC signature
  const payload = `${token}.${expiresAtStr}`;
  const expected = crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex'),
    );
  } catch {
    // Length mismatch or other error
    return false;
  }
}
