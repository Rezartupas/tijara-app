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
