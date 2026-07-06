import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE_NAME = "tijara_admin_token";

function getCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "tijara123",
  };
}

function generateToken(username: string): string {
  const secret = process.env.ADMIN_PASSWORD || "tijara123";
  const payload = `${username}:${Date.now()}:${secret}`;
  return Buffer.from(payload).toString("base64");
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length < 2) return false;
    const [username] = parts;
    const { username: expected } = getCredentials();
    return username === expected;
  } catch {
    return false;
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
  return verifyToken(token);
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
