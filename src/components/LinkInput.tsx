"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const ALLOWED_DOMAINS = ["tokopedia.com", "shopee.co.id", "lazada.co.id", "blibli.com"];

function isValidProductUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return ALLOWED_DOMAINS.some((d) => parsed.hostname.includes(d));
  } catch {
    return false;
  }
}

export default function LinkInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Silakan masukkan tautan produk.");
      return;
    }

    if (!isValidProductUrl(url.trim())) {
      setError("Marketplace tidak didukung. Gunakan tautan dari Tokopedia, Shopee, Lazada, atau Blibli.");
      return;
    }

    router.push(`/simulasi?url=${encodeURIComponent(url.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <label htmlFor="link-input" className="block text-sm font-medium text-gray-700">
        Tempelkan tautan produk
      </label>
      <input
        id="link-input"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://tokopedia.com/..., shopee.co.id, lazada.co.id, atau blibli.com"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-xl bg-primary-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-primary-700"
      >
        Cek Cicilan
      </button>
    </form>
  );
}
