"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "Semua Status" },
  { value: "pending", label: "Pending" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

export default function AdminFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const currentStatus = searchParams.get("status") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentDateFrom = searchParams.get("dateFrom") || "";
  const currentDateTo = searchParams.get("dateTo") || "";

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const debouncedSearch = useCallback((value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setParam("search", value);
    }, 300);
  }, [setParam]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <fieldset className="mb-4 flex flex-wrap items-end gap-3">
      <legend className="sr-only">Filter Pengajuan</legend>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
        <select
          value={currentStatus}
          onChange={(e) => setParam("status", e.target.value)}
          aria-label="Filter status"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Cari Nama / NIK</label>
        <input
          type="text"
          ref={searchRef}
          defaultValue={currentSearch}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Ketik nama atau NIK..."
          aria-label="Cari nama atau NIK"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Dari Tanggal</label>
        <input
          type="date"
          value={currentDateFrom}
          onChange={(e) => setParam("dateFrom", e.target.value)}
          aria-label="Dari tanggal"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Sampai Tanggal</label>
        <input
          type="date"
          value={currentDateTo}
          onChange={(e) => setParam("dateTo", e.target.value)}
          aria-label="Sampai tanggal"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
    </fieldset>
  );
}
