import { Suspense } from "react";
import KYCForm from "@/components/submission/KYCForm";

export default function PengajuanPage() {
  return (
    <article className="mx-auto max-w-2xl animate-fade-in-up">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pengajuan Pembiayaan</h1>
        <p className="mt-3 text-lg text-gray-500">Lengkapi data diri Anda untuk proses verifikasi.</p>
      </header>
      <section className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm sm:p-10">
        <Suspense fallback={
          <div className="space-y-6 animate-pulse" role="status" aria-label="Memuat formulir">
            <div className="h-12 w-full rounded-2xl bg-gray-200" />
            <div className="h-12 w-full rounded-2xl bg-gray-200" />
            <div className="h-12 w-full rounded-2xl bg-gray-200" />
            <span className="sr-only">Memuat...</span>
          </div>
        }>
          <KYCForm />
        </Suspense>
      </section>
    </article>
  );
}
