import axios from "axios";
import * as cheerio from "cheerio";
import type { Product } from "./types";
import { isAllowedMarketplace } from "./constants";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
];

function randomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function detectMarketplace(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("shopee.co.id")) return "shopee.co.id";
    if (hostname.includes("tokopedia.com")) return "tokopedia.com";
    if (hostname.includes("lazada.co.id")) return "lazada.co.id";
    if (hostname.includes("blibli.com")) return "blibli.com";
  } catch {}
  return "unknown";
}

function extractJsonLdProduct($: cheerio.CheerioAPI): Record<string, any> | null {
  const scripts: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const content = $(el).html();
    if (content) scripts.push(content);
  });
  for (const script of scripts) {
    try {
      const data = JSON.parse(script);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        const product = item["@type"] === "Product" ? item : item["@graph"]?.find((g: any) => g["@type"] === "Product");
        if (product) return product;
      }
    } catch {}
  }
  return null;
}

function extractMetaContent($: cheerio.CheerioAPI, ...selectors: string[]): string {
  for (const sel of selectors) {
    const val = $(sel).attr("content");
    if (val) return val;
  }
  return "";
}

function parsePriceFromText(text: string): number {
  const match = text.match(/Rp\s?([\d.,]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/[.,]/g, ""), 10);
}

export async function scrapeProduct(url: string): Promise<Product> {
  if (!isAllowedMarketplace(url)) throw new Error("Marketplace tidak didukung.");
  const marketplace = detectMarketplace(url);

  let html: string;
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": randomUA() },
      timeout: 25000,
    });
    html = data;
  } catch (err: any) {
    if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
      throw new Error("Waktu permintaan habis. Server marketplace terlalu lambat, coba lagi.");
    }
    throw new Error("Gagal mengakses halaman produk. Periksa kembali tautan Anda.");
  }

  const $ = cheerio.load(html);
  const jsonLd = extractJsonLdProduct($);

  let title = "";
  let price = 0;
  let image = "";
  let description = "";

  // Try JSON-LD first (most reliable)
  if (jsonLd) {
    title = jsonLd.name || "";
    price = jsonLd.offers?.price ? Math.round(Number(jsonLd.offers.price)) : 0;
    image = Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image || "";
    description = jsonLd.description || "";
  }

  // Fallback: marketplace-specific parsing
  if (!title) {
    if (marketplace === "tokopedia.com") {
      title = extractMetaContent($, 'meta[property="og:title"]') || $("title").text();
      const priceText = extractMetaContent($, 'meta[property="product:price:amount"]');
      price = priceText ? parseInt(priceText.replace(/\D/g, ""), 10) : 0;
      image = extractMetaContent($, 'meta[property="og:image"]');
      description = extractMetaContent($, 'meta[property="og:description"]', 'meta[name="description"]');
    } else if (marketplace === "shopee.co.id") {
      // Shopee SSR rarely has OG meta — use title tag + body scan
      const rawTitle = $("title").text();
      title = rawTitle.split("|")[0]?.trim() || rawTitle;
      const bodyText = $("body").text();
      price = parsePriceFromText(bodyText);
      image = extractMetaContent($, 'meta[property="og:image"]', 'meta[name="twitter:image"]');
      description = extractMetaContent($, 'meta[property="og:description"]', 'meta[name="description"]') || rawTitle;
    } else if (marketplace === "lazada.co.id") {
      title = extractMetaContent($, 'meta[property="og:title"]') || $("title").text();
      const bodyText = $("body").text();
      price = parsePriceFromText(bodyText);
      image = extractMetaContent($, 'meta[property="og:image"]', 'meta[name="twitter:image"]');
      description = extractMetaContent($, 'meta[property="og:description"]', 'meta[name="description"]');
    } else if (marketplace === "blibli.com") {
      title = extractMetaContent($, 'meta[property="og:title"]') || $("title").text();
      const bodyText = $("body").text();
      price = parsePriceFromText(bodyText);
      image = extractMetaContent($, 'meta[property="og:image"]', 'meta[name="twitter:image"]');
      description = extractMetaContent($, 'meta[property="og:description"]', 'meta[name="description"]');
    }
  }

  // Final fallback: try to find price and image from any source
  if (title && !price) {
    const bodyText = $("body").text();
    price = parsePriceFromText(bodyText);
  }
  if (title && !image) {
    image = extractMetaContent($, 'meta[property="og:image"]', 'meta[name="twitter:image"]', 'link[rel="image_src"]');
  }

  if (!title) throw new Error("Gagal membaca data produk dari tautan tersebut.");

  return {
    title: title.trim().substring(0, 200),
    price,
    image,
    description: description.trim().substring(0, 500),
    url,
    marketplace,
  };
}
