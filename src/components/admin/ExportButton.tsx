"use client";

import * as XLSX from "xlsx";
import type { Submission } from "@/lib/types";
import { DownloadIcon } from "@/components/ui/Icons";

interface Props {
  data: Submission[];
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
      <DownloadIcon />
      Export Excel
    </button>
  );
}
