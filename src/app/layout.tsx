import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: '--font-inter',
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  display: "swap",
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Tijara — Pembiayaan Syariah",
  description: "Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah.",
  icons: { icon: "/images/tijara-favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} font-sans`}>
      <body className="flex min-h-screen flex-col antialiased bg-gray-50">
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-lg transition-all duration-300">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
            <Link href="/" className="tap-active transition-transform hover:scale-105 hover:opacity-90">
              <img src="/images/tijara.png" alt="Tijara" className="h-7 sm:h-8 w-auto" />
            </Link>
            <Link
              href="/tentang-kami"
              className="tap-active rounded-full bg-primary-50 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-primary-700 transition-all hover:bg-primary-600 hover:text-white shadow-sm"
            >
              Tentang Kami
            </Link>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6 sm:py-10">{children}</main>
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
