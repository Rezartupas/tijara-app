# Task 6 Report: KYC Form Page — Multi-Step Form with Akad Modal

## What was implemented

- **`src/components/AkadModal.tsx`** — Digital akad agreement modal with Murabahah & Wakalah bil Ujrah terms. Renders as overlay with "Batal" and "Setuju & Lanjutkan" buttons.
- **`src/components/KYCForm.tsx`** — Multi-step form (2 steps: Data Diri → Upload Dokumen). Uses `react-hook-form` + Zod validation. Submits via `POST /api/submission` with FormData. Opens AkadModal on final submit.
- **`src/app/pengajuan/page.tsx`** — Page component rendering KYCForm inside a constrained layout.
- **`src/app/api/submission/route.ts`** — POST endpoint accepting FormData, saves JSON submission + uploaded images (KTP/selfie) to `data/submissions/`.
- **`dependencies`** — Installed: `react-hook-form`, `@hookform/resolvers`, `zod`
- **`.gitignore`** — Added `data/` to prevent committing submission files.

## Test results

```
✓ src/lib/scraper.test.ts (4 tests) 4ms
✓ src/lib/calculator.test.ts (3 tests) 6ms

Test Files  2 passed (2)
     Tests  7 passed (7)
```

All 7 existing tests pass. No regressions.

## Dev server verification

`npm run dev` starts successfully (ready in ~4s). Pre-existing build error (`./globals.css` type import) is unrelated to this task.

## Files changed

| File | Action |
|---|---|
| `src/components/AkadModal.tsx` | Created |
| `src/components/KYCForm.tsx` | Created |
| `src/app/pengajuan/page.tsx` | Created |
| `src/app/api/submission/route.ts` | Created |
| `package.json` | Modified (dependencies added) |
| `package-lock.json` | Modified |
| `.gitignore` | Modified (added `data/`) |

## Self-review findings

1. **All files match the brief exactly** — code verified line-by-line against task brief.
2. **No TypeScript errors** in the new files (pre-existing globals.css build error unrelated).
3. `agreed` state variable in KYCForm is declared but never read — this comes from the brief's exact code, not a bug.
4. `values` variable in `handleAgree` is captured from `trigger()` but form data is populated via direct DOM access — follows the brief's exact pattern.
5. **Concern**: The login/middleware and `pengajuan/success` page have not been implemented yet — the form redirects to `/pengajuan/success` which will 404 until created.

## Commit

```
8eef301 feat: add KYC multi-step form with Akad modal and submission API
```
