### Task 8: End-to-End Integration Test & README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write README with setup instructions**

Edit `README.md`:

```markdown
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
```

- [ ] **Step 2: Run full build one final time**

```bash
npm run build
npm test
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: add README with setup instructions"
```

---

## Self-Review

### 1. Spec Coverage

| PRD Requirement | Task |
|---|---|
| URL validation (REQ-F-001) | Task 3 — `isAllowedMarketplace()` |
| Scraping/extraction (REQ-F-002) | Task 3 — `scrapeProduct()` |
| Free tenor selection (REQ-F-004) | Task 5 — slider + number input (1–24 months) |
| Margin calculation flat 4.5%/month (REQ-F-005) | Task 2 — `calculateSimulation()` |
| Transparent real-time display (REQ-F-006) | Task 5 — SimulationBreakdown live updates |
| KYC — personal data | Task 6 — KYCForm step 0 |
| KYC — document upload | Task 6 — KYCForm step 1 |
| KYC — digital akad approval | Task 6 — AkadModal |
| Next.js + Tailwind tech stack | Task 1 |
| 4-step user journey | Task 4 (step cards), Task 5, Task 6, Task 7 |

### 2. Placeholder Scan

No placeholders found. All step code is complete and concrete.

### 3. Type Consistency

- `Product`, `SimulationResult`, `KYCData` defined in Task 2, used consistently in Tasks 3, 5, 6.
- `calculateSimulation()` signature matches usage in Task 5.
- `MARGIN_RATE`, `MAX_TENOR` constants used consistently across Tasks 2, 5, 6.
- `POST /api/scrape` returns `{ product }` — consumed in Tasks 4, 5.
- `POST /api/submission` returns `{ success, id }` — consumed in Task 6.
