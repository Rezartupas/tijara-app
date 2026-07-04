import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { checkAuth } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !["pending", "diterima", "ditolak"].includes(status)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data/submissions", `${id}.json`);
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    data.status = status;
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
