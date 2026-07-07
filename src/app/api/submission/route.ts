import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { ensureDataDir } from "@/lib/storage";

const REQUIRED_FIELDS = ["fullName", "nik", "phoneNumber", "address", "occupation", "emergencyName", "emergencyRelationship", "emergencyPhone"] as const;

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    stream.end(buffer);
  });
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

    const submissionsDir = await ensureDataDir();

    const id = `submission-${Date.now()}`;

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

    const ktp = formData.get("ktp") as File | null;
    if (ktp) {
      data.ktpUrl = await uploadToCloudinary(ktp, "tijara/ktp");
    }
    const selfie = formData.get("selfie") as File | null;
    if (selfie) {
      data.selfieUrl = await uploadToCloudinary(selfie, "tijara/selfie");
    }

    const fs = await import("fs/promises");
    await fs.writeFile(`${submissionsDir}/${id}.json`, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ error: "Gagal memproses pengajuan." }, { status: 500 });
  }
}
