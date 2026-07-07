import { mkdir } from "fs/promises";

export function getDataDir(): string {
  if (process.env.VERCEL === "1") {
    return "/tmp/data/submissions";
  }
  return process.cwd() + "/data/submissions";
}

export async function ensureDataDir(): Promise<string> {
  const dir = getDataDir();
  await mkdir(dir, { recursive: true });
  return dir;
}
