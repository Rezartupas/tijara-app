### Task 3: Scraper Engine & API Route

**Files:**
- Create: `src/lib/scraper.ts`
- Create: `src/lib/scraper.test.ts`
- Create: `src/app/api/scrape/route.ts`
- Modify: `src/lib/constants.ts` (add URL validation helper)

**Interfaces:**
- Consumes: `Product` type, `ALLOWED_MARKETPLACES`, `Product` type
- Produces: `parseMarketplaceUrl(url): { domain, isValid }`; `scrapeProduct(url): Promise<Product>`; `POST /api/scrape` endpoint

- [ ] **Step 1: Install scraper dependencies**

```bash
npm install cheerio axios
npm install -D @types/cheerio
```

- [ ] **Step 2: Add URL validation to constants**

Edit `src/lib/constants.ts` — add:

```typescript
export function isAllowedMarketplace(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_MARKETPLACES.some((domain) => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}
```

- [ ] **Step 3: Write scraper engine**

Create `src/lib/scraper.ts`:

```typescript
import axios from "axios";
import * as cheerio from "cheerio";
import type { Product } from "./types";

function detectMarketplace(url: string): string {
  if (url.includes("shopee.co.id")) return "shopee.co.id";
  if (url.includes("tokopedia.com")) return "tokopedia.com";
  return "unknown";
}

export async function scrapeProduct(url: string): Promise<Product> {
  const marketplace = detectMarketplace(url);
  const { data: html } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    timeout: 10000,
  });
  const $ = cheerio.load(html);

  let title = "";
  let price = 0;
  let image = "";
  let description = "";

  if (marketplace === "tokopedia.com") {
    title = $('meta[property="og:title"]').attr("content") || $("title").text();
    const priceText = $('meta[property="product:price:amount"]').attr("content") || "0";
    price = parseInt(priceText.replace(/\D/g, ""), 10);
    image = $('meta[property="og:image"]').attr("content") || "";
    description = $('meta[property="og:description"]').attr("content") || "";
  } else if (marketplace === "shopee.co.id") {
    title = $('meta[property="og:title"]').attr("content") || $("title").text();
    const priceText = $('meta[property="og:description"]').attr("content") || "0";
    const priceMatch = priceText.match(/Rp\s?([\d.,]+)/);
    price = priceMatch ? parseInt(priceMatch[1].replace(/[.,]/g, ""), 10) : 0;
    image = $('meta[property="og:image"]').attr("content") || "";
    description = priceText;
  }

  if (!title) throw new Error("Gagal membaca data produk dari tautan tersebut.");

  return {
    title: title.trim(),
    price,
    image,
    description: description.trim(),
    url,
    marketplace,
  };
}
```

- [ ] **Step 4: Write scraper test (unit test without real HTTP)**

Create `src/lib/scraper.test.ts`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { isAllowedMarketplace } from "./constants";

describe("isAllowedMarketplace", () => {
  it("accepts tokopedia.com URLs", () => {
    expect(isAllowedMarketplace("https://tokopedia.com/product/123")).toBe(true);
  });

  it("accepts shopee.co.id URLs", () => {
    expect(isAllowedMarketplace("https://shopee.co.id/product/123")).toBe(true);
  });

  it("rejects unknown marketplace URLs", () => {
    expect(isAllowedMarketplace("https://blibli.com/product/123")).toBe(false);
  });

  it("rejects invalid URLs", () => {
    expect(isAllowedMarketplace("not-a-url")).toBe(false);
  });
});
```

- [ ] **Step 5: Write API route**

Create `src/app/api/scrape/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { scrapeProduct } from "@/lib/scraper";
import { isAllowedMarketplace } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
    }

    if (!isAllowedMarketplace(url)) {
      return NextResponse.json(
        { error: "Marketplace tidak didukung. Gunakan tautan dari Tokopedia atau Shopee." },
        { status: 400 }
      );
    }

    const product = await scrapeProduct(url);
    return NextResponse.json({ product });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal memproses tautan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: 4+ passing tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add scraper engine with Tokopedia/Shopee support and API route"
```

---
