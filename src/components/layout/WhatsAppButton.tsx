"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icons";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (pathname && pathname.startsWith("/admin")) return null;

  function handleSend() {
    if (!message.trim()) return;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message.trim())}`;
    window.open(url, "_blank");
    setOpen(false);
    setMessage("");
  }

  return (
    <aside aria-label="WhatsApp chat">
      <button
        onClick={() => setOpen(true)}
        className="animate-gentle-bounce fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 active:scale-95"
        aria-label="Hubungi via WhatsApp"
      >
        <WhatsAppIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Hubungi Kami</h3>
            <p className="mb-3 text-sm text-gray-500">
              Tulis pesan Anda, kami akan balas melalui WhatsApp.
            </p>
            <textarea
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan di sini..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { setOpen(false); setMessage(""); }}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex-1 rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
              >
                Kirim ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
