"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function AkadModal({ open, onClose, onAgree }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900">Akad Murabahah & Wakalah bil Ujrah</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Dengan mengklik "Setuju", Anda menyatakan telah membaca, memahami, dan menyetujui
            seluruh ketentuan akad berikut:
          </p>
          <p>
            <strong>Wakalah bil Ujrah:</strong> Anda memberikan kuasa kepada Tijara untuk mewakili
            Anda dalam memilih, memeriksa, dan memastikan spesifikasi barang yang dibeli dari
            marketplace e-commerce.
          </p>
          <p>
            <strong>Murabahah:</strong> Tijara membeli barang secara tunai dari merchant dan
            menjualnya kepada Anda sebesar harga perolehan ditambah margin keuntungan (ribhun)
            sebesar 4,5% per bulan yang disepakati di awal. Harga jual dan angsuran bersifat tetap
            (fixed) selama masa akad.
          </p>
          <p>
            Anda setuju untuk membayar angsuran tepat waktu setiap bulan. Keterlambatan yang
            disengaja akan dikenakan ta&apos;zir (denda sosial) yang disalurkan sebagai dana
            kebajikan, bukan pendapatan perusahaan.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onAgree}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Setuju & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
