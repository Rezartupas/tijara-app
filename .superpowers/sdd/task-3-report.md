# Task 3 Report: Scraper Engine & API Route

## What I Implemented

1. **URL validation helper** (`src/lib/constants.ts`): Added `isAllowedMarketplace()` function that validates URLs against `ALLOWED_MARKETPLACES`.
2. **Scraper engine** (`src/lib/scraper.ts`): Cheerio-based scraper with `scrapeProduct()` that extracts title, price, image, description from Tokopedia and Shopee product pages using Open Graph meta tags.
3. **API route** (`src/app/api/scrape/route.ts`): `POST /api/scrape` endpoint that validates input, checks marketplace support, calls scraper, and returns `{ product }` or error responses.
4. **Unit tests** (`src/lib/scraper.test.ts`): Tests for `isAllowedMarketplace`.

## What I Tested & Test Results

- **4 tests for `isAllowedMarketplace`** — all passing
- **3 pre-existing calculator tests** — still passing
- **Total: 7/7 passing**

## TDD Evidence

### RED Phase
- **Command:** `npm test` (before implementing `isAllowedMarketplace`)
- **Failing output:** 4/4 failed — `TypeError: isAllowedMarketplace is not a function`
- **Why expected:** The test imports `isAllowedMarketplace` from `./constants` which did not export it yet.

### GREEN Phase
- **Command:** `npm test` (after implementing `isAllowedMarketplace`)
- **Passing output:** 4/4 passing in `scraper.test.ts`, 3/3 in `calculator.test.ts` — 7/7 total

## Files Changed

| File | Action |
|------|--------|
| `src/lib/constants.ts` | Modified: added `isAllowedMarketplace()` |
| `src/lib/scraper.ts` | Created |
| `src/lib/scraper.test.ts` | Created |
| `src/app/api/scrape/route.ts` | Created |
| `package.json` | Modified: added `cheerio`, `axios` deps |
| `package-lock.json` | Modified: dep update |

## Self-Review Findings

- **Error messages are in Indonesian** — consistent with existing codebase convention (calculator.ts uses Indonesian comments/messages).
- **No scraper integration tests** — the scraper makes real HTTP calls; only the URL validation helper is unit-tested. This is appropriate for unit tests; integration/end-to-end tests could be added later with mocked HTTP.
- **Type safety** — `NextRequest`/`NextResponse` types used as expected for Next.js App Router.
- **Edge case handling** — invalid JSON body, non-string URL, unsupported marketplace, and scraper failures all produce proper error responses.
- **Import path uses `@/` alias** — consistent with Next.js conventions.

## Issues or Concerns

None.
