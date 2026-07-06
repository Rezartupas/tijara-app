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
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <label htmlFor="link-input" className="block text-sm font-semibold text-gray-700">
        Tautan Produk E-commerce
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        </div>
        <input
          id="link-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://tokopedia.com/..., shopee.co.id..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-4 text-sm text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
        />
      </div>
      {error && <p className="text-sm font-medium text-red-600 animate-fade-in-up">{error}</p>}
      
      <div className="space-y-3">
        <button
          type="submit"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          <span className="relative z-10">Mulai Simulasi Cicilan</span>
          <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push("/simulasi?manual=true")}
            className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
          >
            Atau masukkan detail produk secara manual
          </button>
        </div>
      </div>
    </form>
  );
}
