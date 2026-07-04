### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx` (placeholder)
- Modify: None

**Interfaces:**
- Consumes: nothing
- Produces: working Next.js dev server with Tailwind, basic root layout with Indonesian-language header

- [ ] **Step 1: Initialize Next.js project with TypeScript and Tailwind**

```bash
# From tijara-app root
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

If the directory is non-empty, use `--force` or initialize manually:

```bash
npm init -y
npm install next@14 react react-dom
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Configure tailwind.config.ts**

Edit `tailwind.config.ts`:

```typescript
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
        primary: { 50: "#f0fdf4", 500: "#22c55e", 600: "#16a34a", 700: "#15803d" },
        gold: { 500: "#eab308", 600: "#ca8a04" },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Write root layout with Indonesian metadata**

Edit `src/app/layout.tsx`:

```typescript
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
```

- [ ] **Step 4: Write global CSS with Tailwind directives**

Edit `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: Write placeholder landing page**

Edit `src/app/page.tsx`:

```typescript
export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold">Belanja Sekarang, Bayar Nanti</h2>
      <p className="mt-2 text-gray-600">
        Tempelkan tautan produk marketplace untuk mulai simulasi cicilan syariah.
      </p>
    </section>
  );
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Open browser to `http://localhost:3000` — confirm page renders with header "Tijara" and subtitle.

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and root layout"
```

---
