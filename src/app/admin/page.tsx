import Link from "next/link";
import { redirect } from "next/navigation";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { checkAuth } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import StatusActions from "@/components/StatusActions";
import AdminFilters from "@/components/AdminFilters";
import ExportButton from "@/components/ExportButton";

interface Submission {
  id: string;
  fullName: string;
  nik: string;
  phoneNumber?: string;
  address?: string;
  occupation?: string;
  emergencyName?: string;
  emergencyRelationship?: string;
  emergencyPhone?: string;
  submittedAt: string;
  status?: string;
  statusUpdatedBy?: string;
  statusUpdatedAt?: string;
  tenor?: number;
  angsuran?: number;
  total?: number;
  agreedToAkad?: boolean;
  product?: { title?: string; price?: number; marketplace?: string };
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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; dateFrom?: string; dateTo?: string };
}) {
  if (!checkAuth()) redirect("/admin/login");
  const allSubmissions = await getSubmissions();

  const filtered = allSubmissions.filter((s) => {
    const status = searchParams.status;
    if (status && s.status !== status) return false;

    const search = searchParams.search?.toLowerCase().trim();
    if (search) {
      const name = (s.fullName || "").toLowerCase();
      const nik = (s.nik || "").toLowerCase();
      if (!name.includes(search) && !nik.includes(search)) return false;
    }

    const dateFrom = searchParams.dateFrom;
    if (dateFrom) {
      const t = new Date(s.submittedAt);
      t.setHours(0, 0, 0, 0);
      const from = new Date(dateFrom + "T00:00:00");
      if (t < from) return false;
    }

    const dateTo = searchParams.dateTo;
    if (dateTo) {
      const t = new Date(s.submittedAt);
      t.setHours(23, 59, 59, 999);
      const to = new Date(dateTo + "T23:59:59");
      if (t > to) return false;
    }

    return true;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Admin — Data Pengajuan</h1>
        <ExportButton data={filtered} />
      </div>

      <AdminFilters />

      <p className="mb-3 text-sm text-gray-500">
        Menampilkan {filtered.length} dari {allSubmissions.length} pengajuan
      </p>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Tidak ada pengajuan yang sesuai filter.</p>
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
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((s) => (
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
                    <StatusActions
                      id={s.id}
                      currentStatus={s.status || "pending"}
                      updatedBy={s.statusUpdatedBy}
                      updatedAt={s.statusUpdatedAt}
                    />
                  </td>
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
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">Total: {allSubmissions.length} pengajuan</p>
        <LogoutButton />
      </div>
    </div>
  );
}
