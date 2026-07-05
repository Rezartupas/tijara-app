import { NextRequest, NextResponse } from "next/server";
import { scrapeProduct } from "@/lib/scraper";
import { isAllowedMarketplace, ALLOWED_MARKETPLACES } from "@/lib/constants";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
    }

    if (!isAllowedMarketplace(url)) {
      return NextResponse.json(
        { error: `Marketplace tidak didukung. Gunakan tautan dari ${ALLOWED_MARKETPLACES.join(", ")}.` },
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
