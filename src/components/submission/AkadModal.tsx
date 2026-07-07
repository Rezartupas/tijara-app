"use client";

import Modal from "@/components/ui/Modal";

interface AkadModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function AkadModal({ open, onClose, onAgree }: AkadModalProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Akad Murabahah dan Wakalah bil Ujrah">
      <article className="p-6">
        <h2 className="text-lg font-bold text-gray-900">Akad Murabahah &amp; Wakalah bil Ujrah</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            Dengan mengklik {'\u201C'}Setuju{'\u201D'}, Anda menyatakan telah membaca, memahami, dan menyetujui
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
        <footer className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onAgree}
            className="flex-1 rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Setuju &amp; Lanjutkan
          </button>
        </footer>
      </article>
    </Modal>
  );
}
