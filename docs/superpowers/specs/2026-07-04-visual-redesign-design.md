# Visual Redesign — Tijara Platform

**Date:** 2026-07-04
**Status:** Approved

## Brand Identity

- **Palette:**
  - primary-50: #ecfdf5, primary-100: #d1fae5, primary-200: #a7f3d0
  - primary-500: #10b981, primary-600: #059669, primary-700: #047857
  - gold-500: #d97706, gold-100: #fef3c7
- **Font:** Inter (Google Fonts) via 
ext/font — all text
- **Logo:** 	ijara.png optimized for web, placed in header left

## Layout Global

- **Container width:** max-w-5xl (up from max-w-4xl)
- **Header:** Logo + "Pembiayaan Syariah" tagline, g-white shadow-sm sticky top-0
- **Footer (new):** g-primary-700 text-white, contact info (WA/email), copyright
- **Card convention:** ounded-xl border bg-white p-6 shadow-sm + hover:shadow-md transition
- **Input convention:** ounded-xl border-gray-300 px-4 py-3 focus:border-primary-600 focus:ring-2 focus:ring-primary-200
- **Button primary:** ounded-xl bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-50
- **Button secondary:** ounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50

## Pages

### Landing Page (/)
- Hero heading: large bold "Belanja Sekarang, Bayar Nanti"
- Subtext explaining the service
- LinkInput in prominent white card
- Step cards (4): icon/emoji, numbered step g-primary-100 text-primary-700 font-bold, label

### Simulation Page (/simulasi)
- ProductCard, SimulationCalculator, SimulationBreakdown — all ounded-xl border bg-white p-4 shadow-sm
- Slider accent: ccent-primary-600
- CTA button: full-width, rounded-xl, primary-600

### KYC Page (/pengajuan)
- Step indicator (Langkah 1/2) with dots: active = g-primary-600, inactive = g-gray-300
- Form in white card
- AkadModal: minor restyle, consistent buttons

### Success Page (/pengajuan/success)
- Check icon bg: g-primary-100
- Warning box: g-gold-100 text-gold-800

### Admin Login (/admin/login)
- Card login ounded-xl border bg-white p-6 shadow-sm

### Admin Table (/admin)
- Filter bar: rounded-xl inputs/selects
- Table header: g-primary-100 text-primary-800 font-semibold
- Status badges: existing (yellow/green/red)

### Admin Detail (/admin/[id])
- All sections in white cards

### WA Button (global)
- Fixed ottom-6 right-6, g-green-500 icon
- Modal dialog in white card with textarea

## Files Changed

| File | Change |
|---|---|
| 	ailwind.config.ts | Update primary palette, gold colors |
| src/app/globals.css | Import Inter font, base utilities |
| src/app/layout.tsx | Header with real logo, footer, WA button |
| src/app/page.tsx | Hero restyle, step cards, max-w-5xl |
| src/app/pengajuan/page.tsx | Card wrapper, progress indicator |
| src/components/KYCForm.tsx | Step indicator dots |
| src/components/AkadModal.tsx | Consistent button styles |
| src/components/SimulationBreakdown.tsx | Consistent card style |
| src/components/ProductCard.tsx | Consistent card style |
| src/components/LinkInput.tsx | Restyle card wrapper |
| src/app/admin/page.tsx | Filter/tabel consistent styles |
| 	ijara.png | Optimized for web |
