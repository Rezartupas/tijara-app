### Task 5: Simulation Page — Product Card & Calculator

**Files:**
- Create: `src/app/simulasi/page.tsx`
- Create: `src/components/ProductCard.tsx`
- Create: `src/components/SimulationCalculator.tsx`
- Create: `src/components/SimulationBreakdown.tsx`

**Interfaces:**
- Consumes: `Product`, `SimulationResult`, `calculateSimulation()`, `POST /api/scrape`, `MARGIN_RATE`, `MAX_TENOR`
- Produces: Full simulation page with product card, tenor slider, live calculation breakdown, "Ajukan Pembiayaan" button that navigates to `/pengajuan`

- [ ] **Step 1: Write ProductCard component**

Create `src/components/ProductCard.tsx`:

```typescript
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        className="h-24 w-24 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{product.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{product.marketplace}</p>
        <p className="mt-1 text-lg font-bold text-primary-600">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write SimulationCalculator component**

Create `src/components/SimulationCalculator.tsx`:

```typescript
"use client";

import { useState, useCallback } from "react";
import { MARGIN_RATE, MAX_TENOR, MIN_TENOR } from "@/lib/constants";
import type { Product, SimulationResult } from "@/lib/types";

interface Props {
  product: Product;
  onSimulationChange: (result: SimulationResult) => void;
}

export default function SimulationCalculator({ product, onSimulationChange }: Props) {
  const [tenor, setTenor] = useState(12);

  const updateTenor = useCallback(
    (months: number) => {
      const clamped = Math.max(MIN_TENOR, Math.min(MAX_TENOR, months));
      setTenor(clamped);
      const totalMargin = Math.round(product.price * MARGIN_RATE * clamped);
      const totalPayment = product.price + totalMargin;
      const monthlyInstallment = Math.round(totalPayment / clamped);
      onSimulationChange({ product, tenorMonths: clamped, totalMargin, monthlyInstallment, totalPayment });
    },
    [product, onSimulationChange]
  );

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
      <label className="block text-sm font-medium text-gray-700">
        Pilih Tenor Cicilan
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={MIN_TENOR}
          max={MAX_TENOR}
          value={tenor}
          onChange={(e) => updateTenor(Number(e.target.value))}
          className="flex-1 accent-primary-600"
        />
        <input
          type="number"
          min={MIN_TENOR}
          max={MAX_TENOR}
          value={tenor}
          onChange={(e) => updateTenor(Number(e.target.value))}
          className="w-16 rounded border px-2 py-1 text-center text-sm"
        />
        <span className="text-sm text-gray-500">bulan</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write SimulationBreakdown component**

Create `src/components/SimulationBreakdown.tsx`:

```typescript
import type { SimulationResult } from "@/lib/types";
import { MARGIN_RATE } from "@/lib/constants";

export default function SimulationBreakdown({ result }: { result: SimulationResult }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold text-gray-900">Rincian Pembiayaan</h3>
      <table className="w-full text-sm">
        <tbody className="space-y-2">
          <tr className="border-b">
            <td className="py-2 text-gray-600">Harga Barang</td>
            <td className="py-2 text-right font-medium">
              Rp{result.product.price.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-gray-600">Margin ({MARGIN_RATE * 100}% × {result.tenorMonths} bln)</td>
            <td className="py-2 text-right font-medium">
              Rp{result.totalMargin.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="border-b border-gray-300 font-semibold">
            <td className="py-2 text-gray-800">Total Pembayaran</td>
            <td className="py-2 text-right text-lg text-primary-600">
              Rp{result.totalPayment.toLocaleString("id-ID")}
            </td>
          </tr>
          <tr className="text-lg font-bold">
            <td className="py-2 text-gray-900">Angsuran / Bulan</td>
            <td className="py-2 text-right text-primary-600">
              Rp{result.monthlyInstallment.toLocaleString("id-ID")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Write simulation page**

Create `src/app/simulasi/page.tsx`:

```typescript
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
            onClick={() => router.push(`/pengajuan?product=${encodeURIComponent(JSON.stringify(product))}&tenor=${simulation.tenorMonths}&angsuran=${simulation.monthlyInstallment}&total=${simulation.totalPayment}`)}
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
```

- [ ] **Step 5: Verify dev server**

```bash
npm run dev
```
Visit `/simulasi?url=https://tokopedia.com/product/123` — confirm the flow works end-to-end (product card, slider, breakdown visible).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add simulation page with product card, tenor slider, and live breakdown"
```

---
