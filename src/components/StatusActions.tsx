"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  currentStatus: string;
  updatedBy?: string;
  updatedAt?: string;
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

export default function StatusActions({ id, currentStatus, updatedBy, updatedAt, currentNote, showNoteInput }: Props) {
  const [status, setStatus] = useState(currentStatus || "pending");
  const [lastUpdatedBy, setLastUpdatedBy] = useState(updatedBy || "");
  const [lastUpdatedAt, setLastUpdatedAt] = useState(updatedAt || "");
  const [note, setNote] = useState(currentNote || "");
  const [loading, setLoading] = useState(false);
  
  const [editMode, setEditMode] = useState(false);
  const [editStatus, setEditStatus] = useState(status);
  const [editNote, setEditNote] = useState(note);
  
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: editStatus, note: editNote }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setNote(data.note || "");
        setLastUpdatedBy(data.updatedBy || "");
        setLastUpdatedAt(data.updatedAt || "");
        setEditMode(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatusQuick(newStatus: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setLastUpdatedBy(data.updatedBy || "");
        setLastUpdatedAt(data.updatedAt || "");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (showNoteInput && editMode) {
    return (
      <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
          <select 
            value={editStatus} 
            onChange={e => setEditStatus(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="diterima">Diterima</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Catatan Admin</label>
          <textarea 
            value={editNote}
            onChange={e => setEditNote(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            rows={3}
            placeholder="Tambahkan catatan jika diperlukan..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => {
              setEditMode(false);
              setEditStatus(status);
              setEditNote(note);
            }} 
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Batal
          </button>
          <button 
            onClick={handleSave} 
            className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}>
          {STATUS_LABELS[status] || status}
        </span>
        
        {!showNoteInput && status === "pending" && (
          <div className="flex gap-1">
            <button
              onClick={() => updateStatusQuick("diterima")}
              disabled={loading}
              className="rounded bg-green-500 px-2 py-0.5 text-xs text-white hover:bg-green-600 disabled:opacity-50"
            >
              Terima
            </button>
            <button
              onClick={() => updateStatusQuick("ditolak")}
              disabled={loading}
              className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
            >
              Tolak
            </button>
          </div>
        )}

        {showNoteInput && (
          <button 
            onClick={() => setEditMode(true)}
            className="rounded text-xs text-primary-600 hover:underline"
          >
            Ubah Status/Catatan
          </button>
        )}
      </div>
      
      {showNoteInput && note && (
        <div className="mt-2 rounded-md bg-gray-50 p-2.5 text-sm text-gray-700 border border-gray-100">
          <strong>Catatan:</strong> {note}
        </div>
      )}

      {lastUpdatedBy && (
        <p className="mt-1 text-[10px] text-gray-400">
          Diperbarui oleh {lastUpdatedBy}{lastUpdatedAt ? `, ${new Date(lastUpdatedAt).toLocaleString("id-ID")}` : ""}
        </p>
      )}
    </div>
  );
}
