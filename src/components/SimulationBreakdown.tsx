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
