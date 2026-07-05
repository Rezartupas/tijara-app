# Header Simplification & Halaman Tentang Kami — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify header and create a /tentang-kami page

**Architecture:** Modifikasi langsung pada layout.tsx untuk header, dan halaman statis baru di app router Next.js.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript

## Global Constraints

- Ikuti pattern kode yang sudah ada (Tailwind utility classes, Link dari `next/link`)
- Tidak perlu menambah dependencies baru
- Halaman tentang kami template standar yang siap diedit user
- Gunakan warna yang sudah ada: `primary-600` untuk border/hover, `gray-*` untuk teks

---

### Task 1: Update Header di layout.tsx

**Files:**
- Modify: `src/app/layout.tsx:19-31`

**Interfaces:**
- Consumes: —
- Produces: Header baru dengan tombol "Tentang Kami"

- [ ] **Step 1: Edit header — hapus tagline & nav, tambah tombol Tentang Kami**

Ubah bagian header (lines 19-31) dari:

```tsx
        <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <img src="/images/tijara.png" alt="Tijara" className="h-8 w-auto" />
              <span className="hidden text-xs text-gray-500 sm:inline">Pembiayaan Syariah</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-600 transition-colors hover:text-primary-600">Beranda</Link>
              <Link href="/simulasi" className="text-gray-600 transition-colors hover:text-primary-600">Simulasi</Link>
              <Link href="/pengajuan" className="text-gray-600 transition-colors hover:text-primary-600">Pengajuan</Link>
            </nav>
          </div>
        </header>
```

Menjadi:

```tsx
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
```

- [ ] **Step 2: Verifikasi tidak ada broken link atau syntax error**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "refactor(header): simplify — remove tagline, nav, add Tentang Kami button"
```

---

### Task 2: Buat Halaman /tentang-kami

**Files:**
- Create: `src/app/tentang-kami/page.tsx`

**Interfaces:**
- Consumes: —
- Produces: Halaman statis `/tentang-kami`

- [ ] **Step 1: Buat file halaman tentang kami**

Create `src/app/tentang-kami/page.tsx`:

```tsx
import Link from "next/link";

export default function TentangKamiPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Tentang Kami
      </h1>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profil Perusahaan</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            Tijara adalah platform pembiayaan syariah berbasis link e-commerce yang dikelola oleh
            <strong> PT. Tumbuh Bangun Sejahtera</strong>. Kami hadir untuk memberikan solusi
            pembiayaan yang sesuai dengan prinsip syariah bagi masyarakat Indonesia yang ingin
            berbelanja kebutuhan secara cicil tanpa riba.
          </p>
          <p className="mt-3 leading-relaxed text-gray-600">
            Dengan menggunakan akad Murabahah dan Wakalah bil Ujrah, kami memastikan setiap
            transaksi yang dilakukan melalui platform Tijara sesuai dengan ketentuan syariah
            Islam.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Visi & Misi</h2>
          <h3 className="mt-4 font-medium text-gray-900">Visi</h3>
          <p className="mt-1 leading-relaxed text-gray-600">
            Menjadi platform pembiayaan syariah terkemuka di Indonesia yang memudahkan setiap
            orang untuk mendapatkan barang kebutuhan dengan cara yang berkah.
          </p>
          <h3 className="mt-4 font-medium text-gray-900">Misi</h3>
          <ul className="mt-1 list-inside list-disc space-y-1 text-gray-600">
            <li>Menyediakan akses pembiayaan syariah yang mudah, cepat, dan transparan.</li>
            <li>Mengedukasi masyarakat tentang manfaat ekonomi syariah.</li>
            <li>Menjaga kepatuhan syariah dalam setiap produk dan layanan.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">Kontak</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <span className="font-medium text-gray-900">WhatsApp:</span>{" "}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                0812-3456-7890
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              <a href="mailto:hello@tijara.id" className="text-primary-600 hover:underline">
                hello@tijara.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifikasi build tidak error**

Run: `npm run build`
Expected: Build sukses tanpa error

- [ ] **Step 3: Commit**

```bash
git add src/app/tentang-kami/page.tsx
git commit -m "feat: add about us page (tentang-kami) with company profile"
```
