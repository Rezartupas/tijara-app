import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { checkAuth, getCurrentUsername } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !["pending", "diterima", "ditolak"].includes(status)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const username = getCurrentUsername();

    const filePath = path.join(process.cwd(), "data/submissions", `${id}.json`);
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    if (status === data.status) {
      return NextResponse.json({ success: true });
    }

    data.status = status;
    data.statusUpdatedBy = username || "admin";
    data.statusUpdatedAt = new Date().toISOString();
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, status, updatedBy: username, updatedAt: data.statusUpdatedAt });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
