import Link from "next/link";
import { CheckIcon } from "@/components/ui/Icons";

export default function SuccessPage() {
  return (
    <article className="mx-auto max-w-lg text-center">
      <div className="rounded-full bg-primary-100 p-4 inline-block" aria-hidden="true">
        <CheckIcon className="h-12 w-12 text-primary-600" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-gray-900">Pengajuan Terkirim!</h1>
      <p className="mt-2 text-gray-600">
        Pengajuan pembiayaan Anda sedang diproses. Tim Tijara akan menghubungi Anda melalui
        kontak yang didaftarkan.
      </p>
      <aside className="mt-4 rounded-xl bg-gold-100 p-4 text-left text-sm text-gold-800" aria-label="Informasi syariah">
        <p className="font-medium">Peringatan Syariah</p>
        <p className="mt-1">
          Harga jual dan angsuran bersifat tetap. Tidak ada bunga berbunga (riba).
          Keterlambatan pembayaran akan dikenakan ta&apos;zir (denda sosial) yang disalurkan
          sebagai dana kebajikan.
        </p>
      </aside>
      <Link
        href="/"
        className="mt-6 inline-block w-full rounded-xl bg-primary-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-primary-700"
      >
        Ajukan Lagi
      </Link>
    </article>
  );
}
