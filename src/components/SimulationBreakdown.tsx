import type { SimulationResult } from "@/lib/types";
import { MARGIN_RATE } from "@/lib/constants";

export default function SimulationBreakdown({ result }: { result: SimulationResult }) {
  return (
    <div className="overflow-hidden rounded-2xl glass-card transition-all">
      <div className="border-b border-gray-100 bg-gray-50/80 px-5 sm:px-6 py-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 font-heading text-lg">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Rincian Pembiayaan
        </h3>
      </div>
      <div className="p-5 sm:p-6">
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500">Harga Barang</span>
            <span className="font-semibold text-gray-900">Rp{result.product.price.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1">
              <span>Margin Pembiayaan</span>
              <span className="text-[10px] sm:text-xs text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md font-semibold inline-block w-fit">
                {MARGIN_RATE * 100}% × {result.tenorMonths} bln
              </span>
            </div>
            <span className="font-semibold text-gray-900">Rp{result.totalMargin.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center pt-2 pb-2">
            <span className="text-gray-600 font-semibold">Total Kewajiban</span>
            <span className="text-lg font-bold text-gray-900">Rp{result.totalPayment.toLocaleString("id-ID")}</span>
          </div>
        </div>
        
        <div className="mt-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 p-5 shadow-premium text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-semibold text-primary-50">Angsuran per Bulan</span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rp{result.monthlyInstallment.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
