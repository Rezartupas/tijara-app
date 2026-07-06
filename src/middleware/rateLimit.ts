// src/middleware/rateLimit.ts

// Simple in‑memory rate limiter for Next.js API routes.
// Limits each IP to `MAX_REQUESTS` requests per `WINDOW_MS`.

import type { NextRequest, NextResponse } from "next/server";

const MAX_REQUESTS = 30; // max requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

// Store timestamps per IP
const ipMap = new Map<string, number[]>();

export function rateLimit(req: NextRequest): NextResponse | null {
  const ip = req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const timestamps = ipMap.get(ip) ?? [];
  // Remove timestamps older than window
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  ipMap.set(ip, recent);
  if (recent.length > MAX_REQUESTS) {
    return new NextResponse(JSON.stringify({ error: "Too many requests, please try later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null; // allowed
}
