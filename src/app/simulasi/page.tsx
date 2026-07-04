"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import LinkInput from "@/components/LinkInput";
import ProductCard from "@/components/ProductCard";
import SimulationCalculator from "@/components/SimulationCalculator";
import SimulationBreakdown from "@/components/SimulationBreakdown";
import type { Product, SimulationResult } from "@/lib/types";

function SimulationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

  useEffect(() => {
    if (!url) {
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
  }, [url]);

  const handleSimulationChange = useCallback((result: SimulationResult) => {
    setSimulation(result);
  }, []);

  if (!url) {
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
    return <p className="text-center text-gray-500">Memuat data produk...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!product) return null;

  return (
    <div className="space-y-6">
      <ProductCard product={product} />
      <SimulationCalculator product={product} onSimulationChange={handleSimulationChange} />
      {simulation && (
        <>
          <SimulationBreakdown result={simulation} />
          <button
            onClick={() => {
              sessionStorage.setItem("tijara_product", JSON.stringify(product));
              router.push(`/pengajuan?tenor=${simulation.tenorMonths}&angsuran=${simulation.monthlyInstallment}&total=${simulation.totalPayment}`);
            }}
            className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white shadow transition hover:bg-primary-700"
          >
            Ajukan Pembiayaan
          </button>
        </>
      )}
    </div>
  );
}

export default function SimulasiPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Memuat...</p>}>
      <SimulationContent />
    </Suspense>
  );
}
