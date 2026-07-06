"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AkadModal from "./AkadModal";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
const PHONE_REGEX = /^(0|62)[0-9]{8,13}$/;

const kycSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  phoneNumber: z.string().regex(PHONE_REGEX, "Nomor HP tidak valid. Gunakan format 08xx atau 62xx"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  occupation: z.string().min(3, "Pekerjaan wajib diisi"),
  emergencyName: z.string().min(3, "Nama kontak darurat minimal 3 karakter"),
  emergencyRelationship: z.string().min(2, "Hubungan wajib diisi"),
  emergencyPhone: z.string().regex(PHONE_REGEX, "Nomor HP kontak darurat tidak valid"),
});

type KYCFormValues = z.infer<typeof kycSchema>;

function validateFile(file: File | null): string | null {
  if (!file) return "Wajib diunggah.";
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return "Format file harus JPG atau PNG.";
  if (file.size > MAX_FILE_SIZE) return "Ukuran file maksimal 5 MB.";
  return null;
}

export default function KYCForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [ktpError, setKtpError] = useState("");
  const [selfieError, setSelfieError] = useState("");
  const [showAkad, setShowAkad] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<KYCFormValues>({
    resolver: zodResolver(kycSchema),
  });

  const FIELD_LABELS: Record<string, string> = {
    fullName: "Nama Lengkap",
    nik: "NIK",
    phoneNumber: "Nomor HP (WhatsApp)",
    address: "Alamat Domisili",
    occupation: "Pekerjaan",
    emergencyName: "Nama Kontak Darurat",
    emergencyRelationship: "Hubungan dengan Pengaju",
    emergencyPhone: "Nomor HP Kontak Darurat",
  };

  async function nextStep() {
    const valid = await trigger();
    if (valid) setStep(1);
  }

  function onSubmit() {
    const ktpErr = validateFile(ktpFile);
    const selfieErr = validateFile(selfieFile);
    setKtpError(ktpErr || "");
    setSelfieError(selfieErr || "");
    if (ktpErr || selfieErr) return;
    setShowAkad(true);
  }

  async function handleAgree() {
    setShowAkad(false);
    setSubmitting(true);
    setSubmitError("");

    try {
      const values = getValues();
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("nik", values.nik);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("address", values.address);
      formData.append("occupation", values.occupation);
      formData.append("emergencyName", values.emergencyName);
      formData.append("emergencyRelationship", values.emergencyRelationship);
      formData.append("emergencyPhone", values.emergencyPhone);

      const productRaw = sessionStorage.getItem("tijara_product");
      if (productRaw) formData.append("product", productRaw);
      const tenor = searchParams.get("tenor");
      if (tenor) formData.append("tenor", tenor);
      const angsuran = searchParams.get("angsuran");
      if (angsuran) formData.append("angsuran", angsuran);
      const total = searchParams.get("total");
      if (total) formData.append("total", total);

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

  const MAIN_FIELDS = ["fullName", "nik", "phoneNumber", "address", "occupation"] as const;
  const EMERGENCY_FIELDS = ["emergencyName", "emergencyRelationship", "emergencyPhone"] as const;

  if (step === 0) {
    return (
      <form className="space-y-4">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
          <span className="h-px w-8 bg-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        </div>
        <p className="mb-4 text-center text-xs text-gray-500">Langkah 1 dari 2</p>
        <h2 className="text-lg font-semibold text-gray-900">Data Diri</h2>
        {MAIN_FIELDS.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {FIELD_LABELS[field]}
            </label>
            <input
              id={field}
              type={field === "phoneNumber" ? "tel" : "text"}
              {...register(field)}
              placeholder={field === "phoneNumber" ? "08123456789" : undefined}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
            />
            {errors[field] && <p className="mt-1.5 text-xs font-medium text-red-600 animate-fade-in-up">{errors[field].message}</p>}
          </div>
        ))}

        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-800">Kontak Darurat</h3>
          <p className="mb-3 text-xs text-gray-500">Siapa yang bisa dihubungi jika terjadi sesuatu?</p>
          {EMERGENCY_FIELDS.map((field) => (
            <div key={field} className="mt-3">
              <label className="block text-sm font-medium text-gray-700">
                {FIELD_LABELS[field]}
              </label>
              <input
                id={field}
                type={field === "emergencyPhone" ? "tel" : "text"}
                {...register(field)}
                placeholder={field === "emergencyPhone" ? "08123456789" : undefined}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              />
              {errors[field] && <p className="mt-1.5 text-xs font-medium text-red-600 animate-fade-in-up">{errors[field].message}</p>}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          Langkah Selanjutnya
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
        <span className="h-px w-8 bg-gray-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
      </div>
      <p className="mb-4 text-center text-xs text-gray-500">Langkah 2 dari 2</p>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Upload Dokumen</h2>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="text-sm text-primary-600 hover:underline"
        >
          &larr; Kembali
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Foto KTP</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => { setKtpFile(e.target.files?.[0] || null); setKtpError(""); }}
          className="mt-1 w-full text-sm"
        />
        {ktpError && <p className="mt-1 text-xs text-red-600">{ktpError}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Swafoto dengan KTP</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => { setSelfieFile(e.target.files?.[0] || null); setSelfieError(""); }}
          className="mt-1 w-full text-sm"
        />
        {selfieError && <p className="mt-1 text-xs text-red-600">{selfieError}</p>}
      </div>
      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={submitting}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-soft"
      >
        {submitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Mengirim Data...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Kirim Pengajuan
          </>
        )}
      </button>
      <AkadModal open={showAkad} onClose={() => setShowAkad(false)} onAgree={handleAgree} />
    </div>
  );
}
