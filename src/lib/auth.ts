import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE_NAME = "tijara_admin_token";
const ADMIN_ROLE = "admin";

function getCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "tijara123",
  };
}

function generateToken(username: string, role: string = ADMIN_ROLE): string {
  const secret = process.env.ADMIN_PASSWORD || "tijara123";
  const payload = `${username}:${role}:${Date.now()}:${secret}`;
  return Buffer.from(payload).toString("base64");
}

/**
 * Verifies a token and returns its parsed parts.
 * Returns null if verification fails.
 */
function verifyToken(token: string): { username: string; role: string } | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length < 4) return null;
    const [username, role] = parts;
    const { username: expected } = getCredentials();
    // Only accept tokens that match the configured admin username.
    if (username !== expected) return null;
    return { username, role };
  } catch {
    return null;
  }
}

export function validateCredentials(inputUser: string, inputPass: string): boolean {
  const { username, password } = getCredentials();
  return inputUser === username && inputPass === password;
}

export function createSessionCookie(username: string): { name: string; value: string } {
  return { name: COOKIE_NAME, value: generateToken(username) };
}

export function checkAuth(): boolean {
  const store = cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export function getCurrentUsername(): string | null {
  const store = cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    return parts[0] || null;
  } catch {
    return null;
  }
}
