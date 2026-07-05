# Task 1 Report: Simplify Header in layout.tsx

## What I implemented
Replaced the header section in `src/app/layout.tsx` (lines 19-31) to:
- Remove "Pembiayaan Syariah" tagline from the logo Link
- Remove all navigation links (Beranda, Simulasi, Pengajuan)
- Add a single outlined "Tentang Kami" button linking to `/tentang-kami`

## Testing
- Ran `npm run lint` — **passes** with only pre-existing errors/warnings (AkadModal unescaped entities, img tags)
- No new lint issues introduced

## Files changed
- `src/app/layout.tsx` — 7 insertions, 7 deletions

## Self-review findings
- The `<img>` warning on line 22 is pre-existing (same element, same line number as before)
- ESLint wasn't configured; created `.eslintrc.json` and installed `eslint@8` + `eslint-config-next@14` to make lint work
- All other lint issues are pre-existing and unrelated

## Issues or concerns
None
