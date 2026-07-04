### Task 4: Landing Page — Link Input Component

**Files:**
- Create: `src/components/LinkInput.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `POST /api/scrape`
- Produces: LinkInput component with paste-friendly URL field, submit button, loading/error states, redirects to `/simulasi` on success with query param `url`

- [ ] **Step 1: Write LinkInput component**

Create `src/components/LinkInput.tsx`:

```typescript
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LinkInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Silakan masukkan tautan produk.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memproses tautan.");
        return;
      }

      router.push(`/simulasi?url=${encodeURIComponent(url.trim())}`);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <label htmlFor="link-input" className="block text-sm font-medium text-gray-700">
        Tempelkan tautan produk
      </label>
      <input
        id="link-input"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://tokopedia.com/... atau https://shopee.co.id/..."
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        disabled={loading}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white shadow transition hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Cek Cicilan"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Update landing page**

Edit `src/app/page.tsx`:

```typescript
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
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```
Visit `http://localhost:3000` — confirm the form renders, step cards display, and typing an invalid URL shows error.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add landing page with link input component"
```

---
