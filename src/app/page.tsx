import LinkInput from "@/components/LinkInput";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="mt-8 text-3xl font-semibold text-gray-900">
        Belanja Sekarang, Bayar Nanti
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        Tempelkan tautan produk dari Tokopedia atau Shopee untuk memulai simulasi
        cicilan syariah tanpa riba.
      </p>
      <div className="mt-8 w-full max-w-xl">
        <LinkInput />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {["Salin Tautan", "Tempel di Sini", "Pilih Tenor", "Ajukan Pembiayaan"].map((step, i) => (
          <div key={step} className="rounded-lg bg-white p-4 shadow-sm">
            <span className="text-lg font-bold text-primary-500">0{i + 1}</span>
            <p className="mt-1 text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
