import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("tijara_admin_token", "", {
    httpOnly: true,
    path: "/admin",
    maxAge: 0,
  });
  return response;
}
