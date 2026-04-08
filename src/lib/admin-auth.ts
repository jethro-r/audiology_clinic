import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Server-side token store (in-memory; resets on server restart, which is fine — sessions are transient)
const activeTokens = new Set<string>();

export function generateToken(): string {
  return crypto.randomBytes(48).toString('hex');
}

export function registerToken(token: string): void {
  activeTokens.add(token);
}

export function revokeToken(token: string): void {
  activeTokens.delete(token);
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) return false;
  return activeTokens.has(session.value);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
