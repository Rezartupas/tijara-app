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
