"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  currentStatus: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  diterima: "bg-green-100 text-green-800",
  ditolak: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  diterima: "Diterima",
  ditolak: "Ditolak",
};

export default function StatusActions({ id, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus || "pending");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}>
        {STATUS_LABELS[status] || status}
      </span>
      {status === "pending" && (
        <div className="flex gap-1">
          <button
            onClick={() => updateStatus("diterima")}
            disabled={loading}
            className="rounded bg-green-500 px-2 py-0.5 text-xs text-white hover:bg-green-600 disabled:opacity-50"
          >
            Terima
          </button>
          <button
            onClick={() => updateStatus("ditolak")}
            disabled={loading}
            className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
          >
            Tolak
          </button>
        </div>
      )}
    </div>
  );
}
