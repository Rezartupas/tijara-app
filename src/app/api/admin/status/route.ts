import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { checkAdminAuth, getCurrentUsername } from "@/lib/auth";
import { rateLimit } from "@/middleware/rateLimit";
import { isValidId } from "@/lib/validation";

export async function PATCH(req: NextRequest) {
  // Rate limiting
  const limitResult = rateLimit(req);
  if (limitResult) return limitResult;

  // Authentication
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Simple CSRF protection placeholder
  const csrfHeader = req.headers.get("x-csrf-token");
  if (!csrfHeader) {
    return NextResponse.json({ error: "Missing CSRF token" }, { status: 403 });
  }

  try {
    const { id, status, note } = await req.json();

    if (!id || !isValidId(id) || !["pending", "diterima", "ditolak"].includes(status)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const username = getCurrentUsername();

    const filePath = path.join(process.cwd(), "data/submissions", `${id}.json`);
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    // Update data
    data.status = status;
    if (note !== undefined) {
      data.adminNote = note;
    }
    data.statusUpdatedBy = username || "admin";
    data.statusUpdatedAt = new Date().toISOString();
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, status, note: data.adminNote, updatedBy: username, updatedAt: data.statusUpdatedAt });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
