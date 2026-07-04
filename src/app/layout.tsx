import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tijara — Pembiayaan Syariah",
  description: "Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="sticky top-0 border-b bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/tijara.png" alt="Tijara" className="h-8 w-auto" />
              <span className="hidden text-xs text-gray-500 sm:inline">Pembiayaan Syariah</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="bg-primary-700 text-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Tijara. All rights reserved.</p>
            <p className="text-primary-100">Hubungi: wa.me/6281234567890</p>
          </div>
        </footer>
        <WhatsAppButton />
      </body>
    </html>
  );
}
