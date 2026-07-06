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
      <body className="flex min-h-screen flex-col text-gray-900 antialiased">
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="transition-transform hover:scale-105 hover:opacity-90">
              <img src="/images/tijara.png" alt="Tijara" className="h-8 w-auto" />
            </Link>
            <Link
              href="/tentang-kami"
              className="rounded-full border border-primary-600 px-5 py-2 text-sm font-medium text-primary-600 transition-all hover:bg-primary-600 hover:text-white hover:shadow-glow"
            >
              Tentang Kami
            </Link>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="bg-gradient-to-br from-primary-800 to-primary-900 text-white shadow-inner mt-auto">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <img src="/images/tijara.png" alt="Tijara" className="mb-4 h-10 w-auto brightness-0 invert opacity-90 transition-opacity hover:opacity-100" />
              <p className="max-w-md text-sm leading-relaxed text-primary-100/80">
                Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah tanpa riba.
              </p>
            </div>
          </div>
          <div className="border-t border-primary-700/50 bg-black/10">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-4 py-6 text-sm text-primary-200/70 sm:flex-row">
              <p>&copy; {new Date().getFullYear()} Tijara. All rights reserved.</p>
              <p className="mt-2 sm:mt-0 font-medium tracking-wide">Membangun Ekonomi Umat</p>
            </div>
          </div>
        </footer>
        <WhatsAppButton />
      </body>
    </html>
  );
}
