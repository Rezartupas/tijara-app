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
