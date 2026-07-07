import Link from "next/link";
import { BuildingIcon, EyeIcon, BoltIcon, CheckIcon, WhatsAppIcon, EmailIcon, ArrowLeftIcon } from "@/components/ui/Icons";

export default function TentangKamiPage() {
  return (
    <article className="mx-auto max-w-4xl animate-fade-in-up pb-12">
      {/* Hero Section */}
      <header className="text-center mb-16 mt-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-4">
          Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Tijara</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Membangun Ekonomi Umat melalui pembiayaan syariah yang transparan, mudah, dan bebas riba.
        </p>
      </header>

      <div className="space-y-12">
        {/* Profil Perusahaan */}
        <section className="relative rounded-3xl border border-gray-100 bg-white/80 p-8 sm:p-12 shadow-soft backdrop-blur-sm overflow-hidden group hover:shadow-glow transition-all duration-300" aria-labelledby="profil-heading">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary-100/50 blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
          <h2 id="profil-heading" className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-xl text-primary-600" aria-hidden="true">
              <BuildingIcon />
            </div>
            Profil Perusahaan
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed relative z-10">
            <p>
              Tijara adalah platform pembiayaan syariah berbasis link e-commerce yang dikelola oleh
              <strong className="text-gray-900"> PT. Tumbuh Bangun Sejahtera</strong>. Kami hadir untuk memberikan solusi
              pembiayaan yang sesuai dengan prinsip syariah bagi masyarakat Indonesia yang ingin
              berbelanja kebutuhan secara cicil tanpa riba.
            </p>
            <p>
              Dengan menggunakan akad <span className="font-semibold text-primary-700">Murabahah</span> dan <span className="font-semibold text-primary-700">Wakalah bil Ujrah</span>, kami memastikan setiap
              transaksi yang dilakukan melalui platform Tijara secara ketat mematuhi ketentuan syariah
              Islam.
            </p>
          </div>
        </section>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <section className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm group hover:-translate-y-1 hover:shadow-glow transition-all duration-300" aria-labelledby="visi-heading">
            <h2 id="visi-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-600" aria-hidden="true">
                <EyeIcon />
              </div>
              Visi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Menjadi platform pembiayaan syariah terkemuka di Indonesia yang memudahkan setiap
              orang untuk mendapatkan barang kebutuhan dengan cara yang berkah dan adil.
            </p>
          </section>

          {/* Misi */}
          <section className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm group hover:-translate-y-1 hover:shadow-glow transition-all duration-300" aria-labelledby="misi-heading">
            <h2 id="misi-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600" aria-hidden="true">
                <BoltIcon />
              </div>
              Misi Kami
            </h2>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-emerald-500 shrink-0" />
                Menyediakan akses pembiayaan syariah yang mudah, cepat, dan transparan.
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-emerald-500 shrink-0" />
                Mengedukasi masyarakat tentang manfaat ekonomi syariah.
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-emerald-500 shrink-0" />
                Menjaga kepatuhan syariah dalam setiap produk dan layanan.
              </li>
            </ul>
          </section>
        </div>

        {/* Kontak */}
        <section className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-12 shadow-soft text-center" aria-labelledby="kontak-heading">
          <h2 id="kontak-heading" className="text-2xl font-bold text-gray-900 mb-8">Hubungi Kami</h2>
          <address className="flex flex-col sm:flex-row items-center justify-center gap-6 not-italic">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 w-full sm:w-auto px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-green-300 transition-all group"
            >
              <div className="p-2 bg-green-100 rounded-full text-green-600 group-hover:scale-110 transition-transform" aria-hidden="true">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 font-medium">WhatsApp</div>
                <div className="text-gray-900 font-bold">0812-3456-7890</div>
              </div>
            </a>

            <a 
              href="mailto:hello@tijara.id" 
              className="flex items-center gap-3 w-full sm:w-auto px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform" aria-hidden="true">
                <EmailIcon />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 font-medium">Email</div>
                <div className="text-gray-900 font-bold">hello@tijara.id</div>
              </div>
            </a>
          </address>
        </section>
      </div>
      
      {/* Footer Navigation Action */}
      <nav className="mt-16 flex justify-center" aria-label="Kembali ke beranda">
        <Link
          href="/"
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          <ArrowLeftIcon className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="relative z-10">Kembali ke Beranda</span>
        </Link>
      </nav>
    </article>
  );
}
