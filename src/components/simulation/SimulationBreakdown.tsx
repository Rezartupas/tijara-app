import type { SimulationResult } from "@/lib/types";
import { MARGIN_RATE } from "@/lib/constants";
import { ChartIcon } from "@/components/ui/Icons";

export default function SimulationBreakdown({ result }: { result: SimulationResult }) {
  return (
    <section className="overflow-hidden rounded-2xl glass-card transition-all" aria-label="Rincian pembiayaan">
      <header className="border-b border-gray-100 bg-gray-50/80 px-5 sm:px-6 py-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 font-heading text-lg">
          <ChartIcon className="w-5 h-5 text-primary-500" />
          Rincian Pembiayaan
        </h3>
      </header>
      <div className="p-5 sm:p-6">
        <dl className="space-y-4 text-sm sm:text-base">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <dt className="text-gray-500">Harga Barang</dt>
            <dd className="font-semibold text-gray-900">Rp{result.product.price.toLocaleString("id-ID")}</dd>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <dt className="text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1">
              <span>Margin Pembiayaan</span>
              <span className="text-[10px] sm:text-xs text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md font-semibold inline-block w-fit">
                {MARGIN_RATE * 100}% × {result.tenorMonths} bln
              </span>
            </dt>
            <dd className="font-semibold text-gray-900">Rp{result.totalMargin.toLocaleString("id-ID")}</dd>
          </div>
          <div className="flex justify-between items-center pt-2 pb-2">
            <dt className="text-gray-600 font-semibold">Total Kewajiban</dt>
            <dd className="text-lg font-bold text-gray-900">Rp{result.totalPayment.toLocaleString("id-ID")}</dd>
          </div>
        </dl>
        
        <div className="mt-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 p-5 shadow-premium text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl" aria-hidden="true" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-semibold text-primary-50">Angsuran per Bulan</span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rp{result.monthlyInstallment.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
