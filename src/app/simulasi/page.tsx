"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import LinkInput from "@/components/LinkInput";
import ProductCard from "@/components/ProductCard";
import SimulationCalculator from "@/components/SimulationCalculator";
import SimulationBreakdown from "@/components/SimulationBreakdown";
import type { Product, SimulationResult } from "@/lib/types";

import ManualProductForm from "@/components/ManualProductForm";

function SimulationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");
  const manual = searchParams.get("manual");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!manual && !!url);
  const [error, setError] = useState("");
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

  useEffect(() => {
    if (!url || manual) {
      setLoading(false);
      return;
    }
    fetch("/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
        } else {
          setError(data.error || "Gagal memuat produk.");
        }
      })
      .catch(() => setError("Gagal menghubungi server."))
      .finally(() => setLoading(false));
  }, [url, manual]);

  const handleSimulationChange = useCallback((result: SimulationResult) => {
    setSimulation(result);
  }, []);

  const handleManualSubmit = (manualProduct: Product) => {
    setProduct(manualProduct);
    setError(""); // Clear error to show simulation
  };

  if (!url && !manual) {
    return (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold">Masukkan Tautan Produk</h2>
        <div className="mt-4 w-full max-w-xl">
          <LinkInput />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 w-full rounded-2xl bg-gray-200"></div>
        <div className="h-64 w-full rounded-2xl bg-gray-200"></div>
        <div className="h-32 w-full rounded-2xl bg-gray-200"></div>
      </div>
    );
  }

  if (error || (manual && !product)) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center w-full">
        <div className="w-full max-w-xl">
          <ManualProductForm onSubmit={handleManualSubmit} initialUrl={url || ""} />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <ProductCard product={product} />
      <SimulationCalculator product={product} onSimulationChange={handleSimulationChange} />
      {simulation && (
        <div className="space-y-6">
          <SimulationBreakdown result={simulation} />
          <button
            onClick={() => {
              sessionStorage.setItem("tijara_product", JSON.stringify(product));
              router.push(`/pengajuan?tenor=${simulation.tenorMonths}&angsuran=${simulation.monthlyInstallment}&total=${simulation.totalPayment}`);
            }}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30"
          >
            <span className="relative z-10">Lanjutkan ke Pengajuan</span>
            <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function SimulasiPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6 animate-pulse">
        <div className="h-40 w-full rounded-2xl bg-gray-200"></div>
        <div className="h-64 w-full rounded-2xl bg-gray-200"></div>
      </div>
    }>
      <SimulationContent />
    </Suspense>
  );
}
