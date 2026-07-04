# Visual Redesign — Premium Emerald Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Professionalize the UI with a Premium Emerald palette, Inter font, real logo, improved layout, and consistent component styles.

**Architecture:** Pure Tailwind CSS + `next/font` — no runtime libraries. All changes are styling-only, no logic changes.

**Tech Stack:** Next.js 14, Tailwind CSS 3, Inter (Google Fonts)

## Global Constraints

- No new npm dependencies beyond `next/font` (built-in)
- All pages remain responsive mobile-first
- No behavior/logic changes — CSS/Tailwind only per component
- Logo `tijara.png` must be optimized (<200 KB) before copying to `public/`

---

### Task 1: Update Color Palette & Font

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing Tailwind config
- Produces: `primary-{50,100,200,500,600,700}` emerald palette, `gold-{100,500}` accent, `font-sans` pointing to Inter

- [ ] **Step 1: Update `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        gold: {
          100: "#fef3c7",
          500: "#d97706",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Update `globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

(No font import in CSS — Inter loaded via `next/font` in layout.tsx.)

- [ ] **Step 3: Run build to verify no breaking changes**

```bash
npm run build
```

Expected: Compiles successfully, 0 errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "style: update palette to Premium Emerald (primary-600: #059669, gold-500: #d97706)"
```

---

### Task 2: Optimize Logo & Add to Public

**Files:**
- Create: `public/tijara.png` (optimized copy)

- [ ] **Step 1: Optimize logo**

Resize to max 300x80 pixels, compress to <200 KB.

- [ ] **Step 2: Copy to `public/`**

Place optimized version at `public/tijara.png`.

- [ ] **Step 3: Commit**

```bash
git add public/tijara.png
git commit -m "assets: optimize tijara logo for web"
```

---

### Task 3: Restyle Global Layout (Header, Footer, Container)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

```tsx
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
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: global layout — Inter font, real logo, footer, max-w-5xl"
```

---

### Task 4: Restyle Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite landing page**

```tsx
import LinkInput from "@/components/LinkInput";

const STEPS = [
  { icon: "🔗", label: "Salin Tautan", desc: "Salin link produk dari Tokopedia atau Shopee" },
  { icon: "📋", label: "Tempel di Sini", desc: "Tempel tautan di kolom yang tersedia" },
  { icon: "📊", label: "Pilih Tenor", desc: "Pilih tenor cicilan 1—24 bulan" },
  { icon: "✅", label: "Ajukan Pembiayaan", desc: "Isi data diri dan upload dokumen" },
];

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Belanja Sekarang, Bayar Nanti
      </h2>
      <p className="mt-3 max-w-lg text-gray-500">
        Tempelkan tautan produk dari Tokopedia atau Shopee untuk memulai simulasi
        cicilan syariah tanpa riba.
      </p>
      <div className="mt-8 w-full max-w-xl">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <LinkInput />
        </div>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md"
          >
            <span className="text-2xl">{step.icon}</span>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                0{i + 1}
              </span>
              <p className="text-sm font-semibold text-gray-900">{step.label}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "style: landing page hero restyle + improved step cards"
```

---

### Task 5: Restyle Component Cards (ProductCard, SimulationBreakdown, AkadModal)

**Files:**
- Modify: `src/components/ProductCard.tsx`
- Modify: `src/components/SimulationBreakdown.tsx`
- Modify: `src/components/AkadModal.tsx`

- [ ] **Step 1: Update `ProductCard.tsx`**

Change container to `rounded-xl border bg-white p-4 shadow-sm`, image to `rounded-lg`.

```tsx
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{product.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{product.marketplace}</p>
        <p className="mt-1 text-lg font-bold text-primary-600">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `SimulationBreakdown.tsx`**

Change container from `rounded-lg border bg-white p-4 shadow-sm` to `rounded-xl border bg-white p-6 shadow-sm`.

- [ ] **Step 3: Update `AkadModal.tsx`**

Change container `rounded-lg` to `rounded-xl`. Update primary button: `bg-primary-600 hover:bg-primary-700`. Secondary button: `border-gray-300 hover:bg-gray-50`.

- [ ] **Step 4: Run build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductCard.tsx src/components/SimulationBreakdown.tsx src/components/AkadModal.tsx
git commit -m "style: consistent rounded-xl card/button styles across components"
```

---

### Task 6: KYC Form — Step Indicator

**Files:**
- Modify: `src/components/KYCForm.tsx`

- [ ] **Step 1: Add step indicator dots at top of form**

Insert before the `{step === 0 ? ...}` conditional:

```tsx
<div className="mb-6 flex items-center justify-center gap-2">
  <span className={`h-2.5 w-2.5 rounded-full ${step === 0 ? "bg-primary-600" : "bg-gray-300"}`} />
  <span className="h-px w-8 bg-gray-300" />
  <span className={`h-2.5 w-2.5 rounded-full ${step === 1 ? "bg-primary-600" : "bg-gray-300"}`} />
</div>
<p className="mb-4 text-center text-xs text-gray-500">
  Langkah {step + 1} dari 2
</p>
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/KYCForm.tsx
git commit -m "style: add step indicator dots to KYC form"
```

---

### Task 7: Admin & Internal Pages Restyle

**Files:**
- Modify: `src/app/admin/page.tsx`
- Modify: `src/app/admin/[id]/page.tsx`
- Modify: `src/app/admin/login/page.tsx`
- Modify: `src/app/pengajuan/page.tsx`
- Modify: `src/app/pengajuan/success/page.tsx`

- [ ] **Step 1: Admin table header** — change `bg-gray-100` to `bg-primary-100`, text to `text-primary-800`

In `src/app/admin/page.tsx`:
```tsx
<thead className="bg-primary-100">
  <tr>
    <th className="px-4 py-3 font-semibold text-primary-800">Tanggal</th>
    ...
  </tr>
</thead>
```

- [ ] **Step 2: Admin login card** — update to `rounded-xl border bg-white p-6 shadow-sm`

In `src/app/admin/login/page.tsx`, change `rounded-lg` to `rounded-xl`.

- [ ] **Step 3: Admin detail page** — ensure all section cards use `rounded-xl border bg-white p-6`

- [ ] **Step 4: Pengajuan page** — wrap KYCForm in card

In `src/app/pengajuan/page.tsx`:
```tsx
<div className="mx-auto max-w-lg">
  <h1 className="mb-6 text-2xl font-semibold text-gray-900">Pengajuan Pembiayaan</h1>
  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <Suspense fallback={<p className="text-center text-gray-500">Memuat...</p>}>
      <KYCForm />
    </Suspense>
  </div>
</div>
```

- [ ] **Step 5: Success page** — update icon to `bg-primary-100 text-primary-600`, warning to `bg-gold-100 text-gold-800`

- [ ] **Step 6: Run build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/app/admin/ src/app/pengajuan/
git commit -m "style: admin tables, login, detail, kyc wrapper, success page — consistent palette"
```

---

### Task 8: Final Polish — QA

**Files:**
- All modified files

- [ ] **Step 1: Run tests**

```bash
npm test
```

Expected: 7/7 pass.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: 0 errors.

- [ ] **Step 3: Manual review checklist**

- [ ] Landing page hero looks correct
- [ ] Logo appears in header
- [ ] Footer visible at bottom
- [ ] Step cards have proper spacing
- [ ] KYC step indicator shows correctly
- [ ] Simulation page cards match new style
- [ ] Admin table uses primary-100 header
- [ ] Success page uses gold warning box
- [ ] All buttons use `rounded-xl` and `primary-600` bg
- [ ] Everything responsive on mobile

- [ ] **Step 4: Final commit if needed**

```bash
git add -A
git commit -m "chore: visual redesign QA"
```
