import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSessionCookie } from "@/lib/auth";
import { randomBytes } from "crypto";


export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password wajib diisi." }, { status: 400 });
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
    }

    const cookie = createSessionCookie(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    // Set CSRF token cookie for subsequent requests
    const csrfToken = randomBytes(24).toString('base64');
    response.cookies.set('csrf_token', csrfToken, {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
      // No explicit maxAge – session cookie
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Gagal memproses login." }, { status: 500 });
  }
}
