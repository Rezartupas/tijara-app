import { Suspense } from "react";
import KYCForm from "@/components/KYCForm";

export default function PengajuanPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Pengajuan Pembiayaan</h1>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Suspense fallback={<p className="text-center text-gray-500">Memuat...</p>}>
          <KYCForm />
        </Suspense>
      </div>
    </div>
  );
}
