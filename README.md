# Tijara — Platform Pembiayaan Syariah

Platform pembiayaan syariah berbasis link e-commerce. Pengguna cukup menempelkan tautan produk
dari Tokopedia atau Shopee untuk mendapatkan simulasi cicilan dengan akad Murabahah & Wakalah
bil Ujrah.

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Cheerio + axios (scraping)
- **Testing:** Vitest

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |

## Akad Scheme

- **Murabahah:** Jual beli dengan margin keuntungan 4,5% per bulan (flat)
- **Wakalah bil Ujrah:** Perwakilan untuk pengadaan barang dari marketplace
