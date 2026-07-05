import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tijara — Pembiayaan Syariah",
  description: "Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah.",
  icons: { icon: "/images/tijara-favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.className}>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <img src="/images/tijara.png" alt="Tijara" className="h-8 w-auto" />
            </Link>
            <Link
              href="/tentang-kami"
              className="rounded-lg border border-primary-600 px-4 py-1.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
            >
              Tentang Kami
            </Link>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="bg-primary-700 text-white">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3">
            <div>
              <img src="/images/tijara.png" alt="Tijara" className="mb-3 h-8 w-auto brightness-0 invert" />
              <p className="text-sm text-primary-100">
                Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">Navigasi</h3>
              <ul className="space-y-2 text-sm text-primary-100">
                <li><Link href="/" className="transition-colors hover:text-white">Beranda</Link></li>
                <li><Link href="/simulasi" className="transition-colors hover:text-white">Simulasi</Link></li>
                <li><Link href="/pengajuan" className="transition-colors hover:text-white">Pengajuan</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">Kontak</h3>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    WhatsApp: 0812-3456-7890
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@tijara.id" className="transition-colors hover:text-white">
                    Email: hello@tijara.id
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-600">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-4 py-4 text-sm text-primary-200 sm:flex-row">
              <p>&copy; {new Date().getFullYear()} Tijara. All rights reserved.</p>
              <p>Pembiayaan Syariah Tanpa Riba</p>
            </div>
          </div>
        </footer>
        <WhatsAppButton />
      </body>
    </html>
  );
}
