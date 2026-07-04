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
