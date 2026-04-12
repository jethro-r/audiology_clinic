import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Server-side token store
// In dev, HMR re-evaluates modules and would wipe in-memory state on every
// hot reload. Attaching to `global` preserves existing tokens across reloads.
declare global {
  // eslint-disable-next-line no-var
  var _adminTokens: Set<string> | undefined;
}

const activeTokens: Set<string> = global._adminTokens ?? new Set<string>();
if (!global._adminTokens) {
  global._adminTokens = activeTokens;
}

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
