import LinkInput from "@/components/LinkInput";

const STEPS = [
  { icon: "🔗", label: "Salin Tautan", desc: "Salin link produk dari Tokopedia atau Shopee" },
  { icon: "📋", label: "Tempel di Sini", desc: "Tempel tautan di kolom yang tersedia" },
  { icon: "📊", label: "Pilih Tenor", desc: "Pilih tenor cicilan 1—24 bulan" },
  { icon: "✅", label: "Ajukan Pembiayaan", desc: "Isi data diri dan upload dokumen" },
];

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center animate-fade-in-up py-10">
      <div className="mb-4 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
        ✨ Platform Pembiayaan Syariah Terpercaya
      </div>
      <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent pb-2">
        Belanja Sekarang,<br/>Bayar Nanti Tanpa Riba
      </h2>
      <p className="mt-4 max-w-xl text-lg text-gray-600 leading-relaxed">
        Tempelkan tautan produk dari Tokopedia, Shopee, Lazada, atau Blibli untuk memulai simulasi cicilan syariah Anda dengan cepat.
      </p>
      <div className="mt-10 w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm transition-all hover:shadow-glow">
          <LinkInput />
        </div>
      </div>
      <div className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="group relative rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-soft"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <span className="inline-block rounded-xl bg-gray-50 p-3 text-2xl shadow-sm ring-1 ring-gray-100 transition-transform group-hover:scale-110 group-hover:bg-white group-hover:ring-primary-100">{step.icon}</span>
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 shadow-inner">
                  {i + 1}
                </span>
                <p className="text-base font-semibold text-gray-900">{step.label}</p>
              </div>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
