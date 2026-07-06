"use client";

import { useState, FormEvent } from "react";
import type { Product } from "@/lib/types";

interface Props {
  onSubmit: (product: Product) => void;
  initialUrl?: string;
}

const MARKETPLACES = [
  "Tokopedia",
  "Shopee",
  "Lazada",
  "Blibli",
  "Lainnya",
];

export default function ManualProductForm({ onSubmit, initialUrl = "" }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [marketplace, setMarketplace] = useState(MARKETPLACES[0]);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !price || !marketplace) {
      setError("Silakan lengkapi semua data wajib.");
      return;
    }

    const numericPrice = parseInt(price.replace(/\D/g, ""), 10);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Harga tidak valid.");
      return;
    }

    onSubmit({
      title: title.trim(),
      price: numericPrice,
      image: "", // Empty fallback image
      description: "", // Added empty description to satisfy Product type
      marketplace,
      url: url.trim(),
    });
  }

  // Handle formatted currency input
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setPrice("");
      return;
    }
    const formatted = parseInt(rawValue, 10).toLocaleString("id-ID");
    setPrice(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5 rounded-3xl border border-gray-100 bg-white/80 p-6 sm:p-8 shadow-soft backdrop-blur-sm mx-auto max-w-xl">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Masukkan Detail Produk Manual</h3>
        <p className="text-sm text-gray-500 mt-1">Kami gagal mendapatkan data otomatis. Silakan masukkan secara manual.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
          Nama Produk <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Misal: iPhone 13 Pro Max 128GB"
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
          Harga Produk (Rp) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 font-medium">
            Rp
          </div>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="15.000.000"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
          Marketplace <span className="text-red-500">*</span>
        </label>
        <select
          value={marketplace}
          onChange={(e) => setMarketplace(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
        >
          {MARKETPLACES.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">
          Tautan Produk (Opsional)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600 animate-fade-in-up text-left">{error}</p>}

      <button
        type="submit"
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30 mt-2"
      >
        <span className="relative z-10">Lanjutkan Simulasi</span>
        <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </button>
    </form>
  );
}
