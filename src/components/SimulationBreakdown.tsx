import type { SimulationResult } from "@/lib/types";
import { MARGIN_RATE } from "@/lib/constants";

export default function SimulationBreakdown({ result }: { result: SimulationResult }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
      <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Rincian Pembiayaan
        </h3>
      </div>
      <div className="p-6">
        <table className="w-full text-sm">
          <tbody className="space-y-4">
            <tr className="border-b border-gray-100 last:border-0">
              <td className="py-3 text-gray-500">Harga Barang</td>
              <td className="py-3 text-right font-semibold text-gray-900">
                Rp{result.product.price.toLocaleString("id-ID")}
              </td>
            </tr>
            <tr className="border-b border-gray-100 last:border-0">
              <td className="py-3 text-gray-500">Margin Pembiayaan <span className="text-xs text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded ml-1">{MARGIN_RATE * 100}% × {result.tenorMonths} bln</span></td>
              <td className="py-3 text-right font-semibold text-gray-900">
                Rp{result.totalMargin.toLocaleString("id-ID")}
              </td>
            </tr>
            <tr className="border-b border-gray-100 last:border-0">
              <td className="py-4 text-gray-600 font-semibold">Total Kewajiban</td>
              <td className="py-4 text-right text-lg font-bold text-gray-900">
                Rp{result.totalPayment.toLocaleString("id-ID")}
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 border border-primary-100/50">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">Angsuran per Bulan</span>
            <span className="text-2xl font-extrabold text-primary-600">
              Rp{result.monthlyInstallment.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
