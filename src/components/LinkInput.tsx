"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LinkInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Silakan masukkan tautan produk.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memproses tautan.");
        return;
      }

      router.push(`/simulasi?url=${encodeURIComponent(url.trim())}`);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
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
        placeholder="https://tokopedia.com/... atau https://shopee.co.id/..."
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        disabled={loading}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Cek Cicilan"}
      </button>
    </form>
  );
}
