import { MARGIN_RATE } from "./constants";
import type { Product, SimulationResult } from "./types";

export function calculateSimulation(product: Product, tenorMonths: number): SimulationResult {
  const totalMargin = Math.round(product.price * MARGIN_RATE * tenorMonths);
  const totalPayment = product.price + totalMargin;
  const monthlyInstallment = Math.round(totalPayment / tenorMonths);

  return {
    product,
    tenorMonths,
    totalMargin,
    monthlyInstallment,
    totalPayment,
  };
}
