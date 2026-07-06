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
    <div className="space-y-6 rounded-2xl border border-gray-100 bg-white/90 p-5 sm:p-6 shadow-soft backdrop-blur-md transition-all">
      <div className="flex items-center justify-between">
        <label className="block text-sm sm:text-base font-semibold text-gray-900">
          Pilih Tenor Cicilan
        </label>
        <div className="inline-flex items-center rounded-xl bg-primary-50 px-3 py-2 border border-primary-100 shadow-inner">
          <input
            type="number"
            min={MIN_TENOR}
            max={MAX_TENOR}
            value={tenor}
            onChange={(e) => updateTenor(Number(e.target.value))}
            className="w-10 sm:w-12 bg-transparent text-center text-base sm:text-lg font-bold text-primary-700 focus:outline-none"
          />
          <span className="text-xs sm:text-sm font-semibold text-primary-600 ml-1">bulan</span>
        </div>
      </div>
      <div className="pt-4 pb-2 relative">
        <input
          type="range"
          min={MIN_TENOR}
          max={MAX_TENOR}
          value={tenor}
          onChange={(e) => updateTenor(Number(e.target.value))}
          className="w-full h-3 sm:h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-primary-600 shadow-inner hover:accent-primary-500 active:accent-primary-700 transition-all"
        />
        <div className="flex justify-between mt-3 text-xs font-semibold text-gray-400">
          <span>{MIN_TENOR} bln</span>
          <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{tenor} bln</span>
          <span>{MAX_TENOR} bln</span>
        </div>
      </div>
    </div>
  );
}
