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
    <div className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <label className="block text-base font-semibold text-gray-900">
          Pilih Tenor Cicilan
        </label>
        <div className="inline-flex items-center rounded-lg bg-primary-50 px-3 py-1.5 border border-primary-100">
          <input
            type="number"
            min={MIN_TENOR}
            max={MAX_TENOR}
            value={tenor}
            onChange={(e) => updateTenor(Number(e.target.value))}
            className="w-12 bg-transparent text-center font-bold text-primary-700 focus:outline-none"
          />
          <span className="text-sm font-medium text-primary-600 ml-1">bulan</span>
        </div>
      </div>
      <div className="pt-2 pb-1 relative">
        <input
          type="range"
          min={MIN_TENOR}
          max={MAX_TENOR}
          value={tenor}
          onChange={(e) => updateTenor(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-primary-600"
        />
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-400">
          <span>{MIN_TENOR} bln</span>
          <span>{MAX_TENOR} bln</span>
        </div>
      </div>
    </div>
  );
}
