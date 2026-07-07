import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { checkAuth } from "@/lib/auth";
import StatusActions from "@/components/admin/StatusActions";
import type { SubmissionDetail } from "@/lib/types";

async function getSubmission(id: string): Promise<SubmissionDetail | null> {
  const filePath = path.join(process.cwd(), "data/submissions", `${id}.json`);
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function getImageFiles(id: string, nik: string): Promise<{ ktp: string; selfie: string }> {
  const dir = path.join(process.cwd(), "data/submissions");
  try {
    const files = await readdir(dir);
    const ktp = files.find((f) => f.startsWith(`${id}-ktp`)) || "";
    const selfie = files.find((f) => f.startsWith(`${id}-selfie`)) || "";
    return { ktp, selfie };
  } catch {
    return { ktp: "", selfie: "" };
  }
}

export default async function DetailPage({ params }: { params: { id: string } }) {
  if (!checkAuth()) redirect("/admin/login");
  const data = await getSubmission(params.id);
  if (!data) notFound();

  const images = await getImageFiles(params.id, data.nik);

  return (
    <article className="mx-auto max-w-2xl">
      <nav aria-label="Breadcrumb">
        <Link href="/admin" className="text-sm text-primary-600 hover:underline">&larr; Kembali</Link>
      </nav>
      
      <header className="mb-6 mt-2">
        <h1 className="text-2xl font-semibold text-gray-900">Detail Pengajuan</h1>
      </header>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm" aria-labelledby="data-diri-heading">
        <h2 id="data-diri-heading" className="text-lg font-bold text-gray-800">Data Diri</h2>
        <table className="w-full text-sm">
          <caption className="sr-only">Data diri pemohon</caption>
          <tbody>
            {[
              ["ID", data.id],
              ["Tanggal", new Date(data.submittedAt).toLocaleString("id-ID")],
              ["Nama Lengkap", data.fullName],
              ["NIK", data.nik],
              ["No. HP (WhatsApp)", data.phoneNumber, "phone"],
              ["Alamat", data.address],
              ["Pekerjaan", data.occupation],
              ["Kontak Darurat", `${data.emergencyName} (${data.emergencyRelationship})`],
              ["No. HP Darurat", data.emergencyPhone, "phone"],
              ["Setuju Akad", data.agreedToAkad ? "Ya" : "Tidak"],
            ].map(([label, value, type]) => (
              <tr key={label as string} className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 w-40 text-left">{label as string}</th>
                <td className="py-2 text-gray-900">
                  {type === "phone" && typeof value === "string" ? (
                    <a 
                      href={`https://wa.me/${value.replace(/^0/, '62').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline flex items-center gap-1 w-fit"
                    >
                      {value}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  ) : (
                    value as React.ReactNode
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-b">
              <th scope="row" className="py-2 pr-4 font-medium text-gray-600 w-40 align-top text-left">Status</th>
              <td className="py-2 text-gray-900">
                <StatusActions 
                  id={data.id} 
                  currentStatus={data.status || "pending"} 
                  updatedBy={data.statusUpdatedBy} 
                  updatedAt={data.statusUpdatedAt}
                  currentNote={data.adminNote}
                  showNoteInput={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {data.product && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm" aria-labelledby="produk-heading">
          <h2 id="produk-heading" className="text-lg font-bold text-gray-800">Produk</h2>
          <table className="w-full text-sm">
            <caption className="sr-only">Detail produk</caption>
            <tbody>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 w-40 text-left">Nama Produk</th>
                <td className="py-2 text-gray-900">{String(data.product.title || "-")}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 text-left">Harga</th>
                <td className="py-2 text-gray-900">
                  Rp{Number(data.product.price).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 text-left">Marketplace</th>
                <td className="py-2 text-gray-900">{String(data.product.marketplace || "-")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {data.tenor && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm" aria-labelledby="simulasi-heading">
          <h2 id="simulasi-heading" className="text-lg font-bold text-gray-800">Simulasi Pembiayaan</h2>
          <table className="w-full text-sm">
            <caption className="sr-only">Rincian simulasi pembiayaan</caption>
            <tbody>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 w-40 text-left">Tenor</th>
                <td className="py-2 text-gray-900">{data.tenor} bulan</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 text-left">Angsuran/Bulan</th>
                <td className="py-2 text-gray-900">Rp{data.angsuran?.toLocaleString("id-ID")}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600 text-left">Total Pembayaran</th>
                <td className="py-2 text-gray-900">Rp{data.total?.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {(images.ktp || images.selfie) && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm" aria-labelledby="dokumen-heading">
          <h2 id="dokumen-heading" className="text-lg font-bold text-gray-800">Dokumen</h2>
          <div className="grid grid-cols-2 gap-4">
            {images.ktp && (
              <figure>
                <figcaption className="mb-1 text-sm font-medium text-gray-600">Foto KTP</figcaption>
                <img
                  src={`/api/admin/files/${images.ktp}`}
                  alt="KTP"
                  className="w-full rounded-lg border object-cover"
                />
              </figure>
            )}
            {images.selfie && (
              <figure>
                <figcaption className="mb-1 text-sm font-medium text-gray-600">Swafoto dengan KTP</figcaption>
                <img
                  src={`/api/admin/files/${images.selfie}`}
                  alt="Selfie"
                  className="w-full rounded-lg border object-cover"
                />
              </figure>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
