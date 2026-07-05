export const MARGIN_RATE = 0.045;
export const MAX_TENOR = 24;
export const MIN_TENOR = 1;
export const ALLOWED_MARKETPLACES = [
  "shopee.co.id",
  "tokopedia.com",
  "lazada.co.id",
  "blibli.com",
];

export function isAllowedMarketplace(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_MARKETPLACES.some((domain) => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}
