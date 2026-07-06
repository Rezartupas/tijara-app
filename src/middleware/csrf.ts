import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

/** CSRF protection middleware.
 * - Generates a token on the first GET request and stores it in a non‑httpOnly cookie `csrf_token`.
 * - Validates the token on state‑changing requests (POST, PUT, PATCH, DELETE).
 * - Skips validation for the login endpoint because the token does not exist yet.
 */
export async function csrf(req: Request) {
  const method = req.method?.toUpperCase();
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('csrf_token')?.value;

  // Determine request path (Edge middleware provides `nextUrl`).
  const path = (req as any).nextUrl?.pathname ?? '';

  // Bypass for login route – token not created yet.
  if (path.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  // Set token on first GET request for other routes.
  if (!tokenCookie && method === 'GET') {
    const token = randomBytes(24).toString('base64');
    const resp = NextResponse.next();
    resp.cookies.set('csrf_token', token, {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
    });
    return resp;
  }

  // Validate on state‑changing methods.
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method ?? '')) {
    const header = req.headers.get('x-csrf-token');
    if (!header || header !== tokenCookie) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
  }

  return NextResponse.next();
}
