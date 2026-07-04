import { NextRequest, NextResponse } from "next/server";

const REQUIRED_FIELDS = ["fullName", "nik", "address", "occupation", "emergencyContact"] as const;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string | null;
    const nik = formData.get("nik") as string | null;

    if (!fullName || !nik) {
      return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
    }

    const fs = await import("fs/promises");
    const submissionsDir = process.cwd() + "/data/submissions";
    await fs.mkdir(submissionsDir, { recursive: true });

    const data: Record<string, unknown> = {
      id: `submission-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };

    for (const field of REQUIRED_FIELDS) {
      const val = formData.get(field);
      if (val) data[field] = val;
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

    await fs.writeFile(`${submissionsDir}/${data.id}.json`, JSON.stringify(data, null, 2));

    const ktp = formData.get("ktp") as File | null;
    if (ktp) {
      const buffer = Buffer.from(await ktp.arrayBuffer());
      await fs.writeFile(`${submissionsDir}/${nik}-ktp.jpg`, buffer);
    }
    const selfie = formData.get("selfie") as File | null;
    if (selfie) {
      const buffer = Buffer.from(await selfie.arrayBuffer());
      await fs.writeFile(`${submissionsDir}/${nik}-selfie.jpg`, buffer);
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Gagal memproses pengajuan." }, { status: 500 });
  }
}
