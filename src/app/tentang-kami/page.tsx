import Link from "next/link";

export default function TentangKamiPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Tentang Kami
      </h1>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profil Perusahaan</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            Tijara adalah platform pembiayaan syariah berbasis link e-commerce yang dikelola oleh
            <strong> PT. Tumbuh Bangun Sejahtera</strong>. Kami hadir untuk memberikan solusi
            pembiayaan yang sesuai dengan prinsip syariah bagi masyarakat Indonesia yang ingin
            berbelanja kebutuhan secara cicil tanpa riba.
          </p>
          <p className="mt-3 leading-relaxed text-gray-600">
            Dengan menggunakan akad Murabahah dan Wakalah bil Ujrah, kami memastikan setiap
            transaksi yang dilakukan melalui platform Tijara sesuai dengan ketentuan syariah
            Islam.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Visi & Misi</h2>
          <h3 className="mt-4 font-medium text-gray-900">Visi</h3>
          <p className="mt-1 leading-relaxed text-gray-600">
            Menjadi platform pembiayaan syariah terkemuka di Indonesia yang memudahkan setiap
            orang untuk mendapatkan barang kebutuhan dengan cara yang berkah.
          </p>
          <h3 className="mt-4 font-medium text-gray-900">Misi</h3>
          <ul className="mt-1 list-inside list-disc space-y-1 text-gray-600">
            <li>Menyediakan akses pembiayaan syariah yang mudah, cepat, dan transparan.</li>
            <li>Mengedukasi masyarakat tentang manfaat ekonomi syariah.</li>
            <li>Menjaga kepatuhan syariah dalam setiap produk dan layanan.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Kontak</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <span className="font-medium text-gray-900">WhatsApp:</span>{" "}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                0812-3456-7890
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              <a href="mailto:hello@tijara.id" className="text-primary-600 hover:underline">
                hello@tijara.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
