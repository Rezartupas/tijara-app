"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ALLOWED_MARKETPLACES } from "@/lib/constants";
import { LinkIcon, ArrowRightIcon } from "@/components/ui/Icons";

function isValidProductUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return ALLOWED_MARKETPLACES.some((d) => parsed.hostname.includes(d));
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
    <form onSubmit={handleSubmit} className="w-full space-y-5 sm:space-y-6" role="search">
      <label htmlFor="link-input" className="block text-sm sm:text-base font-semibold text-gray-700">
        Tautan Produk E-commerce
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5 pointer-events-none">
          <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </div>
        <input
          id="link-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://tokopedia.com/..."
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/80 pl-12 sm:pl-14 pr-4 py-4 sm:py-5 text-sm sm:text-base text-gray-900 shadow-inner transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
        />
      </div>
      {error && <p className="text-sm font-medium text-red-600 animate-fade-in-up" role="alert">{error}</p>}
      
      <div className="space-y-4 pt-2">
        <button
          type="submit"
          className="tap-active group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_auto] px-8 py-4 sm:py-5 font-bold text-white shadow-premium transition-all hover:bg-[center_right_1rem] hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          <span className="relative z-10 text-base sm:text-lg">Mulai Simulasi Cicilan</span>
          <ArrowRightIcon className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push("/simulasi?manual=true")}
            className="tap-active text-xs sm:text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors p-2"
          >
            Atau masukkan detail produk secara manual
          </button>
        </div>
      </div>
    </form>
  );
}
