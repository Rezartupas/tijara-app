"use client";

interface Row {
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

interface Props {
  data: Row[];
}

function escapeCSV(value: unknown): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
    return `"${str.replace(/"/g, "\"\"")}"`;
  }
  return str;
}

export default function ExportButton({ data }: Props) {
  function handleExport() {
    const headers = [
      "ID", "Tanggal", "Nama Lengkap", "NIK", "No. HP",
      "Alamat", "Pekerjaan", "Kontak Darurat", "Hubungan", "No. HP Darurat",
      "Produk", "Harga", "Marketplace",
      "Tenor", "Angsuran", "Total",
      "Status", "Diupdate Oleh", "Tgl Update", "Setuju Akad",
    ];

    const rows = data.map((r) => [
      r.id,
      r.submittedAt ? new Date(r.submittedAt).toLocaleString("id-ID") : "",
      r.fullName,
      r.nik,
      r.phoneNumber || "",
      r.address || "",
      r.occupation || "",
      r.emergencyName || "",
      r.emergencyRelationship || "",
      r.emergencyPhone || "",
      r.product?.title || "",
      r.product?.price != null ? r.product.price : "",
      r.product?.marketplace || "",
      r.tenor ?? "",
      r.angsuran ?? "",
      r.total ?? "",
      r.status || "pending",
      r.statusUpdatedBy || "",
      r.statusUpdatedAt ? new Date(r.statusUpdatedAt).toLocaleString("id-ID") : "",
      r.agreedToAkad ? "Ya" : "Tidak",
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-pengajuan-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
    >
      Export CSV
    </button>
  );
}
