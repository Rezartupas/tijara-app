"use client";

import * as XLSX from "xlsx";

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
  adminNote?: string;
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

export default function ExportButton({ data }: Props) {
  function handleExport() {
    const formattedData = data.map((r) => ({
      "ID": r.id,
      "Tanggal": r.submittedAt ? new Date(r.submittedAt).toLocaleString("id-ID") : "",
      "Nama Lengkap": r.fullName,
      "NIK": r.nik,
      "No. HP": r.phoneNumber || "",
      "Alamat": r.address || "",
      "Pekerjaan": r.occupation || "",
      "Kontak Darurat": r.emergencyName || "",
      "Hubungan": r.emergencyRelationship || "",
      "No. HP Darurat": r.emergencyPhone || "",
      "Produk": r.product?.title || "",
      "Harga": r.product?.price != null ? r.product.price : "",
      "Marketplace": r.product?.marketplace || "",
      "Tenor": r.tenor ?? "",
      "Angsuran": r.angsuran ?? "",
      "Total": r.total ?? "",
      "Status": r.status || "pending",
      "Catatan Admin": r.adminNote || "",
      "Diupdate Oleh": r.statusUpdatedBy || "",
      "Tgl Update": r.statusUpdatedAt ? new Date(r.statusUpdatedAt).toLocaleString("id-ID") : "",
      "Setuju Akad": r.agreedToAkad ? "Ya" : "Tidak",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 15 }, // ID
      { wch: 20 }, // Tanggal
      { wch: 25 }, // Nama Lengkap
      { wch: 20 }, // NIK
      { wch: 15 }, // No. HP
      { wch: 40 }, // Alamat
      { wch: 20 }, // Pekerjaan
      { wch: 20 }, // Kontak Darurat
      { wch: 15 }, // Hubungan
      { wch: 15 }, // No. HP Darurat
      { wch: 25 }, // Produk
      { wch: 15 }, // Harga
      { wch: 15 }, // Marketplace
      { wch: 10 }, // Tenor
      { wch: 15 }, // Angsuran
      { wch: 15 }, // Total
      { wch: 15 }, // Status
      { wch: 40 }, // Catatan Admin
      { wch: 20 }, // Diupdate Oleh
      { wch: 20 }, // Tgl Update
      { wch: 12 }, // Setuju Akad
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pengajuan");

    XLSX.writeFile(workbook, `data-pengajuan-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export Excel
    </button>
  );
}
