import { NextRequest, NextResponse } from "next/server";

const REQUIRED_FIELDS = ["fullName", "nik", "address", "occupation", "emergencyContact"] as const;

function extFromType(mime: string): string {
  if (mime === "image/png") return ".png";
  if (mime === "image/jpeg" || mime === "image/jpg") return ".jpg";
  return ".bin";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const missing: string[] = [];

    for (const field of REQUIRED_FIELDS) {
      const val = formData.get(field);
      if (!val || typeof val !== "string" || !val.trim()) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return NextResponse.json({ error: `Data tidak lengkap: ${missing.join(", ")}.` }, { status: 400 });
    }

    const fs = await import("fs/promises");
    const submissionsDir = process.cwd() + "/data/submissions";
    await fs.mkdir(submissionsDir, { recursive: true });

    const id = `submission-${Date.now()}`;
    const nik = formData.get("nik") as string;

    const data: Record<string, unknown> = {
      id,
      submittedAt: new Date().toISOString(),
      agreedToAkad: true,
    };

    for (const field of REQUIRED_FIELDS) {
      data[field] = formData.get(field);
    }

    const productRaw = formData.get("product");
    if (productRaw) {
      try {
        data.product = JSON.parse(productRaw as string);
      } catch {
        data.product = productRaw;
      }
    }

    const tenor = formData.get("tenor");
    if (tenor) data.tenor = Number(tenor);
    const angsuran = formData.get("angsuran");
    if (angsuran) data.angsuran = Number(angsuran);
    const total = formData.get("total");
    if (total) data.total = Number(total);

    await fs.writeFile(`${submissionsDir}/${id}.json`, JSON.stringify(data, null, 2));

    const ktp = formData.get("ktp") as File | null;
    if (ktp) {
      const buffer = Buffer.from(await ktp.arrayBuffer());
      const ext = extFromType(ktp.type);
      await fs.writeFile(`${submissionsDir}/${id}-ktp${ext}`, buffer);
    }
    const selfie = formData.get("selfie") as File | null;
    if (selfie) {
      const buffer = Buffer.from(await selfie.arrayBuffer());
      const ext = extFromType(selfie.type);
      await fs.writeFile(`${submissionsDir}/${id}-selfie${ext}`, buffer);
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memproses pengajuan." }, { status: 500 });
  }
}
