import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string | null;
    const nik = formData.get("nik") as string | null;
    const ktp = formData.get("ktp") as File | null;
    const selfie = formData.get("selfie") as File | null;

    if (!fullName || !nik) {
      return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
    }

    // MVP: store submission in memory / file
    const fs = await import("fs/promises");
    const submissionsDir = process.cwd() + "/data/submissions";
    await fs.mkdir(submissionsDir, { recursive: true });

    const filename = `submission-${Date.now()}.json`;
    const data = {
      id: filename.replace(".json", ""),
      fullName,
      nik,
      submittedAt: new Date().toISOString(),
    };
    await fs.writeFile(`${submissionsDir}/${filename}`, JSON.stringify(data, null, 2));

    // Save files if present
    if (ktp) {
      const buffer = Buffer.from(await ktp.arrayBuffer());
      await fs.writeFile(`${submissionsDir}/${nik}-ktp.jpg`, buffer);
    }
    if (selfie) {
      const buffer = Buffer.from(await selfie.arrayBuffer());
      await fs.writeFile(`${submissionsDir}/${nik}-selfie.jpg`, buffer);
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Gagal memproses pengajuan." }, { status: 500 });
  }
}
