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
