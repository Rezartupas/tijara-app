import LinkInput from "@/components/submission/LinkInput";

const STEPS = [
  { icon: "🔗", label: "Salin Tautan", desc: "Salin link produk dari Tokopedia atau Shopee" },
  { icon: "📋", label: "Tempel di Sini", desc: "Tempel tautan di kolom yang tersedia" },
  { icon: "📊", label: "Pilih Tenor", desc: "Pilih tenor cicilan 1—24 bulan" },
  { icon: "✅", label: "Ajukan Pembiayaan", desc: "Isi data diri dan upload dokumen" },
];

export default function HomePage() {
  return (
    <article className="flex flex-col items-center text-center animate-fade-in-up py-4 sm:py-10">
      <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full bg-primary-50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-600/20 shadow-sm animate-slide-up">
        ✨ Platform Pembiayaan Syariah Terpercaya
      </div>
      <h1 className="mt-2 sm:mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-primary-800 via-primary-500 to-primary-600 bg-clip-text text-transparent pb-2 font-heading leading-tight px-2">
        Belanja Sekarang,<br className="hidden sm:block"/>Bayar Nanti Tanpa Riba
      </h1>
      <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-gray-600 leading-relaxed px-4">
        Tempelkan tautan produk dari Tokopedia, Shopee, Lazada, atau Blibli untuk memulai simulasi cicilan syariah Anda dengan instan.
      </p>
      
      <div className="mt-8 sm:mt-12 w-full max-w-2xl px-2 sm:px-0">
        <div className="glass-card rounded-3xl p-5 sm:p-8 animate-scale-in" style={{ animationDelay: "150ms" }}>
          <LinkInput />
        </div>
      </div>
      
      <section className="mt-12 sm:mt-20 w-full" aria-label="Cara kerja Tijara">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-800 mb-6 sm:mb-10">Cara Kerja Tijara</h2>
        <ol className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-4 px-2 sm:px-0 list-none">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className="group relative rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft animate-slide-up tap-active"
              style={{ animationDelay: `${(i * 100) + 200}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              <div className="relative flex items-start sm:block gap-4 sm:gap-0">
                <span className="shrink-0 inline-flex items-center justify-center rounded-xl bg-gray-50 p-3 sm:p-4 text-2xl shadow-sm ring-1 ring-gray-100 transition-transform group-hover:scale-110 group-hover:bg-white group-hover:ring-primary-100" aria-hidden="true">{step.icon}</span>
                <div className="mt-1 sm:mt-5">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary-100 text-[10px] sm:text-xs font-bold text-primary-700 shadow-inner" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">{step.label}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
