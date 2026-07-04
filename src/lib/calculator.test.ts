import { describe, it, expect } from "vitest";
import { calculateSimulation } from "./calculator";

const mockProduct = {
  title: "Test Product",
  price: 1000000,
  image: "/test.jpg",
  description: "A test product",
  url: "https://tokopedia.com/test",
  marketplace: "tokopedia.com",
};

describe("calculateSimulation", () => {
  it("calculates margin correctly for 12 months", () => {
    const result = calculateSimulation(mockProduct, 12);
    expect(result.totalMargin).toBe(540000); // 1,000,000 * 0.045 * 12
    expect(result.totalPayment).toBe(1540000);
    expect(result.monthlyInstallment).toBe(128333); // 1540000 / 12, rounded
  });

  it("calculates margin correctly for 1 month", () => {
    const result = calculateSimulation(mockProduct, 1);
    expect(result.totalMargin).toBe(45000);
    expect(result.totalPayment).toBe(1045000);
    expect(result.monthlyInstallment).toBe(1045000);
  });

  it("calculates margin correctly for 24 months", () => {
    const result = calculateSimulation(mockProduct, 24);
    expect(result.totalMargin).toBe(1080000);
    expect(result.totalPayment).toBe(2080000);
    expect(result.monthlyInstallment).toBe(86667); // 2080000 / 24, rounded
  });
});
