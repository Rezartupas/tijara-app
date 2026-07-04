import LinkInput from "@/components/LinkInput";

const STEPS = [
  { icon: "🔗", label: "Salin Tautan", desc: "Salin link produk dari Tokopedia atau Shopee" },
  { icon: "📋", label: "Tempel di Sini", desc: "Tempel tautan di kolom yang tersedia" },
  { icon: "📊", label: "Pilih Tenor", desc: "Pilih tenor cicilan 1—24 bulan" },
  { icon: "✅", label: "Ajukan Pembiayaan", desc: "Isi data diri dan upload dokumen" },
];

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Belanja Sekarang, Bayar Nanti
      </h2>
      <p className="mt-3 max-w-lg text-gray-500">
        Tempelkan tautan produk dari Tokopedia atau Shopee untuk memulai simulasi
        cicilan syariah tanpa riba.
      </p>
      <div className="mt-8 w-full max-w-xl">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <LinkInput />
        </div>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md"
          >
            <span className="text-2xl">{step.icon}</span>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                0{i + 1}
              </span>
              <p className="text-sm font-semibold text-gray-900">{step.label}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
