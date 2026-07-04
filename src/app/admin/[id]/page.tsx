import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { checkAuth } from "@/lib/auth";
import StatusActions from "@/components/StatusActions";

interface DetailData {
  id: string;
  fullName: string;
  nik: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  submittedAt: string;
  agreedToAkad: boolean;
  product?: Record<string, unknown>;
  tenor?: number;
  angsuran?: number;
  total?: number;
  status?: string;
  statusUpdatedBy?: string;
  statusUpdatedAt?: string;
}

async function getSubmission(id: string): Promise<DetailData | null> {
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
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-primary-600 hover:underline">&larr; Kembali</Link>
      <h1 className="mb-6 mt-2 text-2xl font-semibold text-gray-900">Detail Pengajuan</h1>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Data Diri</h2>
        <table className="w-full text-sm">
          <tbody>
            {[
              ["ID", data.id],
              ["Tanggal", new Date(data.submittedAt).toLocaleString("id-ID")],
              ["Nama Lengkap", data.fullName],
              ["NIK", data.nik],
              ["No. HP (WhatsApp)", data.phoneNumber],
              ["Alamat", data.address],
              ["Pekerjaan", data.occupation],
              ["Kontak Darurat", `${data.emergencyName} (${data.emergencyRelationship})`],
              ["No. HP Darurat", data.emergencyPhone],
              ["Setuju Akad", data.agreedToAkad ? "Ya" : "Tidak"],
            ].map(([label, value]) => (
              <tr key={label} className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600 w-40">{label}</td>
                <td className="py-2 text-gray-900">{value}</td>
              </tr>
            ))}
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium text-gray-600 w-40">Status</td>
              <td className="py-2 text-gray-900">
                <StatusActions id={data.id} currentStatus={data.status || "pending"} updatedBy={data.statusUpdatedBy} updatedAt={data.statusUpdatedAt} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {data.product && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800">Produk</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600 w-40">Nama Produk</td>
                <td className="py-2 text-gray-900">{String(data.product.title || "-")}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600">Harga</td>
                <td className="py-2 text-gray-900">
                  Rp{Number(data.product.price).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600">Marketplace</td>
                <td className="py-2 text-gray-900">{String(data.product.marketplace || "-")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {data.tenor && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800">Simulasi Pembiayaan</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600 w-40">Tenor</td>
                <td className="py-2 text-gray-900">{data.tenor} bulan</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600">Angsuran/Bulan</td>
                <td className="py-2 text-gray-900">Rp{data.angsuran?.toLocaleString("id-ID")}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium text-gray-600">Total Pembayaran</td>
                <td className="py-2 text-gray-900">Rp{data.total?.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {(images.ktp || images.selfie) && (
        <section className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800">Dokumen</h2>
          <div className="grid grid-cols-2 gap-4">
            {images.ktp && (
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">Foto KTP</p>
                <img
                  src={`/api/admin/files/${images.ktp}`}
                  alt="KTP"
                  className="w-full rounded-lg border object-cover"
                />
              </div>
            )}
            {images.selfie && (
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">Swafoto dengan KTP</p>
                <img
                  src={`/api/admin/files/${images.selfie}`}
                  alt="Selfie"
                  className="w-full rounded-lg border object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
