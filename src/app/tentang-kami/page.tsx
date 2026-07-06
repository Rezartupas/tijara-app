import Link from "next/link";

export default function TentangKamiPage() {
  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up pb-12">
      {/* Hero Section */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-4">
          Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Tijara</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Membangun Ekonomi Umat melalui pembiayaan syariah yang transparan, mudah, dan bebas riba.
        </p>
      </div>

      <div className="space-y-12">
        {/* Profil Perusahaan */}
        <section className="relative rounded-3xl border border-gray-100 bg-white/80 p-8 sm:p-12 shadow-soft backdrop-blur-sm overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary-100/50 blur-3xl opacity-50 pointer-events-none"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-xl text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              Visi Kami
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Menjadi platform pembiayaan syariah terkemuka di Indonesia yang memudahkan setiap
              orang untuk mendapatkan barang kebutuhan dengan cara yang berkah dan adil.
            </p>
          </div>

          {/* Misi */}
          <div className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-soft backdrop-blur-sm group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              Misi Kami
            </h3>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Menyediakan akses pembiayaan syariah yang mudah, cepat, dan transparan.
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Mengedukasi masyarakat tentang manfaat ekonomi syariah.
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Menjaga kepatuhan syariah dalam setiap produk dan layanan.
              </li>
            </ul>
          </div>
        </section>

        {/* Kontak */}
        <section className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-8 sm:p-12 shadow-soft text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Hubungi Kami</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 w-full sm:w-auto px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-green-300 transition-all group"
            >
              <div className="p-2 bg-green-100 rounded-full text-green-600 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 font-medium">Email</div>
                <div className="text-gray-900 font-bold">hello@tijara.id</div>
              </div>
            </a>
          </div>
        </section>
      </div>
      
      {/* Footer Navigation Action */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/"
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-bold text-white shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          <svg className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
          <span className="relative z-10">Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
