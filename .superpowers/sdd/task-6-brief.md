### Task 6: KYC Form Page — Multi-Step Form with Akad Modal

**Files:**
- Create: `src/app/pengajuan/page.tsx`
- Create: `src/components/KYCForm.tsx`
- Create: `src/components/AkadModal.tsx`
- Modify: `package.json` (add react-hook-form + zod)

**Interfaces:**
- Consumes: `Product`, `SimulationResult` (via query params), `KYCData`
- Produces: Multi-step KYC form (data diri, upload dokumen, akad digital), on submit calls `POST /api/submission` and redirects to `/pengajuan/success`

- [ ] **Step 1: Install form libraries**

```bash
npm install react-hook-form @hookform/resolvers zod
```

- [ ] **Step 2: Write AkadModal component**

Create `src/components/AkadModal.tsx`:

```typescript
"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function AkadModal({ open, onClose, onAgree }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900">Akad Murabahah & Wakalah bil Ujrah</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Dengan mengklik "Setuju", Anda menyatakan telah membaca, memahami, dan menyetujui
            seluruh ketentuan akad berikut:
          </p>
          <p>
            <strong>Wakalah bil Ujrah:</strong> Anda memberikan kuasa kepada Tijara untuk mewakili
            Anda dalam memilih, memeriksa, dan memastikan spesifikasi barang yang dibeli dari
            marketplace e-commerce.
          </p>
          <p>
            <strong>Murabahah:</strong> Tijara membeli barang secara tunai dari merchant dan
            menjualnya kepada Anda sebesar harga perolehan ditambah margin keuntungan (ribhun)
            sebesar 4,5% per bulan yang disepakati di awal. Harga jual dan angsuran bersifat tetap
            (fixed) selama masa akad.
          </p>
          <p>
            Anda setuju untuk membayar angsuran tepat waktu setiap bulan. Keterlambatan yang
            disengaja akan dikenakan ta&apos;zir (denda sosial) yang disalurkan sebagai dana
            kebajikan, bukan pendapatan perusahaan.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onAgree}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Setuju & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write KYCForm component**

Create `src/components/KYCForm.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AkadModal from "./AkadModal";

const kycSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  occupation: z.string().min(3, "Pekerjaan wajib diisi"),
  emergencyContact: z.string().min(10, "Kontak darurat minimal 10 digit"),
});

type KYCFormValues = z.infer<typeof kycSchema>;

export default function KYCForm() {
  const [step, setStep] = useState(0);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [showAkad, setShowAkad] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
  });

  async function nextStep() {
    const valid = await trigger();
    if (valid) setStep(1);
  }

  function onSubmit() {
    setShowAkad(true);
  }

  async function handleAgree() {
    setAgreed(true);
    setShowAkad(false);
    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      const values = (await trigger()) as unknown as KYCFormValues;
      if (values) {
        formData.append("fullName", (document.getElementById("fullName") as HTMLInputElement)?.value || "");
        formData.append("nik", (document.getElementById("nik") as HTMLInputElement)?.value || "");
      }
      if (ktpFile) formData.append("ktp", ktpFile);
      if (selfieFile) formData.append("selfie", selfieFile);

      const res = await fetch("/api/submission", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Gagal mengirim pengajuan.");
      window.location.href = "/pengajuan/success";
    } catch {
      setSubmitError("Gagal mengirim pengajuan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 0) {
    return (
      <form className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Data Diri</h2>
        {(["fullName", "nik", "address", "occupation", "emergencyContact"] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field === "fullName" && "Nama Lengkap"}
              {field === "nik" && "NIK"}
              {field === "address" && "Alamat Domisili"}
              {field === "occupation" && "Pekerjaan"}
              {field === "emergencyContact" && "Kontak Darurat"}
            </label>
            <input
              id={field}
              {...register(field)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            {errors[field] && <p className="mt-1 text-xs text-red-600">{errors[field].message}</p>}
          </div>
        ))}
        <button type="button" onClick={nextStep} className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700">
          Selanjutnya
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Upload Dokumen</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Foto KTP</label>
        <input type="file" accept="image/*" onChange={(e) => setKtpFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Swafoto dengan KTP</label>
        <input type="file" accept="image/*" onChange={(e) => setSelfieFile(e.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
      </div>
      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={!ktpFile || !selfieFile || submitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {submitting ? "Mengirim..." : "Ajukan Pembiayaan"}
      </button>
      <AkadModal open={showAkad} onClose={() => setShowAkad(false)} onAgree={handleAgree} />
    </div>
  );
}
```

- [ ] **Step 4: Write pengajuan page**

Create `src/app/pengajuan/page.tsx`:

```typescript
import KYCForm from "@/components/KYCForm";

export default function PengajuanPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Pengajuan Pembiayaan</h1>
      <KYCForm />
    </div>
  );
}
```

- [ ] **Step 5: Write submission API route**

Create `src/app/api/submission/route.ts`:

```typescript
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
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```
Visit `/pengajuan` — confirm the multi-step form renders, validation works, Akad modal opens on submit, and submission redirects.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add KYC multi-step form with Akad modal and submission API"
```

---
