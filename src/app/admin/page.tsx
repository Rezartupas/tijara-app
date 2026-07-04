import Link from "next/link";
import { readdir, readFile } from "fs/promises";
import path from "path";

interface Submission {
  id: string;
  fullName: string;
  nik: string;
  submittedAt: string;
  address?: string;
  occupation?: string;
  tenor?: number;
  angsuran?: number;
  total?: number;
}

async function getSubmissions(): Promise<Submission[]> {
  const dir = path.join(process.cwd(), "data/submissions");
  try {
    const files = await readdir(dir);
    const jsonFiles = files.filter((f) => f.endsWith(".json")).sort().reverse();
    const submissions: Submission[] = [];
    for (const file of jsonFiles) {
      const content = await readFile(path.join(dir, file), "utf-8");
      submissions.push(JSON.parse(content));
    }
    return submissions;
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Admin — Data Pengajuan</h1>
      {submissions.length === 0 ? (
        <p className="text-gray-500">Belum ada pengajuan.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">Tanggal</th>
                <th className="px-4 py-3 font-medium text-gray-700">Nama</th>
                <th className="px-4 py-3 font-medium text-gray-700">NIK</th>
                <th className="px-4 py-3 font-medium text-gray-700">Tenor</th>
                <th className="px-4 py-3 font-medium text-gray-700">Angsuran</th>
                <th className="px-4 py-3 font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {submissions.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(s.submittedAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium">{s.fullName}</td>
                  <td className="px-4 py-3 text-gray-600">{s.nik}</td>
                  <td className="px-4 py-3">{s.tenor ? `${s.tenor} bulan` : "-"}</td>
                  <td className="px-4 py-3">{s.angsuran ? `Rp${s.angsuran.toLocaleString("id-ID")}` : "-"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/${s.id}`} className="text-primary-600 hover:underline">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-xs text-gray-400">
        Total: {submissions.length} pengajuan
      </p>
    </div>
  );
}
