# Task 5 Report: Simulation Page — Product Card & Calculator

## What I Implemented

Created 4 files as specified in the task brief:

1. **`src/components/ProductCard.tsx`** — Displays scraped product info (image, title, marketplace, price)
2. **`src/components/SimulationCalculator.tsx`** — Tenor slider + number input (1–24 months), calls `onSimulationChange` with live calculation
3. **`src/components/SimulationBreakdown.tsx`** — Detailed breakdown table showing: Harga Barang, Margin, Total Pembayaran, Angsuran/Bulan
4. **`src/app/simulasi/page.tsx`** — Simulation page with `useSearchParams`, fetches `/api/scrape` on mount, wires ProductCard → SimulationCalculator → SimulationBreakdown → "Ajukan Pembiayaan" button

## What I Tested

- **Tests:** `npm run test` — **7/7 passing** (4 scraper tests + 3 calculator tests)
- **Dev server:** `npm run dev` — starts successfully on `http://localhost:3000`
- **Build:** `npm run build` — fails with pre-existing `globals.css` type declaration error (not caused by this task)

## Files Changed

- Created: `src/components/ProductCard.tsx`
- Created: `src/components/SimulationCalculator.tsx`
- Created: `src/components/SimulationBreakdown.tsx`
- Created: `src/app/simulasi/page.tsx`

## Self-Review Findings

- All 4 files match the brief code exactly
- `"use client"` correctly placed on both `SimulationCalculator` and the page
- `Suspense` boundary properly wraps `useSearchParams` usage
- No lint warnings or type errors in the new files
- The build error (`Cannot find module './globals.css'`) is pre-existing in `layout.tsx` and not introduced by this task

## Issues or Concerns

None. All code matches the spec, tests pass, dev server starts.
