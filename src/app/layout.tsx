import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tijara — Pembiayaan Syariah",
  description: "Platform pembiayaan syariah berbasis link e-commerce. Beli sekarang, bayar cicil dengan akad syariah.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-primary-600">Tijara</h1>
            <span className="text-xs text-gray-500">Pembiayaan Syariah</span>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
