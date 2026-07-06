// src/lib/validation.ts

/** Simple validation utilities */

/**
 * Checks whether a string looks like a valid submission ID.
 * Adjust the regex according to your actual ID format (e.g., UUID, numeric, etc.).
 */
export function isValidId(id: string): boolean {
  // Example: allow only alphanumeric, dash, and underscore, 1-64 chars.
  const re = /^[a-zA-Z0-9_-]{1,64}$/;
  return re.test(id);
}
