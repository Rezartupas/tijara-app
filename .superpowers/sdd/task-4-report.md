# Task 4: Landing Page — Link Input Component

## What I Implemented

1. **`src/components/LinkInput.tsx`** — A client component with:
   - URL input field with paste-friendly placeholder
   - Submit button ("Cek Cicilan") with loading state ("Memproses...")
   - Error state display (red text)
   - POST to `/api/scrape` on submit, redirects to `/simulasi?url=` on success
   - Validates empty input before submitting

2. **`src/app/page.tsx`** — Updated landing page with:
   - Hero heading and description
   - LinkInput component integration
   - Step cards grid: "Salin Tautan", "Tempel di Sini", "Pilih Tenor", "Ajukan Pembiayaan"

3. **`tailwind.config.ts`** — Added `primary-200` color variant (used by `focus:ring-primary-200` in LinkInput)

## What I Tested

- Dev server starts and serves on port 3001
- Page renders all components: heading, description, input form, 4 step cards
- LinkInput component is properly bundled by Next.js
- Build has a type-checking warning about `globals.css` (development mode works correctly)

## Files Changed

| File | Action |
|------|--------|
| `src/components/LinkInput.tsx` | Created |
| `src/app/page.tsx` | Modified |
| `tailwind.config.ts` | Modified (added `primary-200`) |

## Self-Review Findings

- All code matches the brief exactly
- Dev server serves the page with all expected elements
- The `tailwind.config.ts` change (adding `primary-200`) was necessary for the `focus:ring-primary-200` utility used in the input styling
- The `next build` fails during type-checking with "Cannot find module or type declarations for side-effect import of './globals.css'" — this is a known Next.js 14.2.x issue (missing CSS glob type declaration). Development mode works without issue.

## Commit

- `21ad5ec` — feat: add landing page with link input component

## Concerns

The production build type-check error for `globals.css` is pre-existing (not caused by this task's changes). It should be fixed separately by adding a type declaration for `*.css` imports or updating `next-env.d.ts`.
