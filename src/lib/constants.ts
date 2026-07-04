export const MARGIN_RATE = 0.045; // 4.5% per month flat
export const MAX_TENOR = 24; // months
export const MIN_TENOR = 1; // months
export const ALLOWED_MARKETPLACES = ["shopee.co.id", "tokopedia.com"];

export function isAllowedMarketplace(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_MARKETPLACES.some((domain) => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}
