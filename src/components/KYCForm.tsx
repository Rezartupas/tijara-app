"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AkadModal from "./AkadModal";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

const kycSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  occupation: z.string().min(3, "Pekerjaan wajib diisi"),
  emergencyContact: z.string().min(10, "Kontak darurat minimal 10 digit"),
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
      formData.append("address", values.address);
      formData.append("occupation", values.occupation);
      formData.append("emergencyContact", values.emergencyContact);

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
        <button
          type="button"
          onClick={nextStep}
          className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
        >
          Selanjutnya
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
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
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {submitting ? "Mengirim..." : "Ajukan Pembiayaan"}
      </button>
      <AkadModal open={showAkad} onClose={() => setShowAkad(false)} onAgree={handleAgree} />
    </div>
  );
}
