### Task 2: Types, Constants & Calculator Logic

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/calculator.ts`
- Create: `src/lib/calculator.test.ts` (vitest)
- Modify: `package.json` (add vitest script)

**Interfaces:**
- Consumes: nothing
- Produces: `Product`, `SimulationResult`, `KYCData` types; `MARGIN_RATE`, `MAX_TENOR` constants; `calculateSimulation(product, tenorMonths): SimulationResult` function

- [ ] **Step 1: Install vitest for testing**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Write types**

Create `src/lib/types.ts`:

```typescript
export interface Product {
  title: string;
  price: number;
  image: string;
  description: string;
  url: string;
  marketplace: string;
}

export interface SimulationResult {
  product: Product;
  tenorMonths: number;
  totalMargin: number;
  monthlyInstallment: number;
  totalPayment: number;
}

export interface KYCData {
  fullName: string;
  nik: string;
  address: string;
  occupation: string;
  emergencyContact: string;
  ktpPhoto: File | null;
  selfiePhoto: File | null;
  agreedToAkad: boolean;
}
```

- [ ] **Step 3: Write constants**

Create `src/lib/constants.ts`:

```typescript
export const MARGIN_RATE = 0.045; // 4.5% per month flat
export const MAX_TENOR = 24; // months
export const MIN_TENOR = 1; // months
export const ALLOWED_MARKETPLACES = ["shopee.co.id", "tokopedia.com"];
```

- [ ] **Step 4: Write calculator function**

Create `src/lib/calculator.ts`:

```typescript
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
```

- [ ] **Step 5: Write calculator test**

Create `src/lib/calculator.test.ts`:

```typescript
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
```

- [ ] **Step 6: Add test script to package.json**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 7: Run tests to verify**

```bash
npm test
```
Expected: 3 passing tests.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add types, constants, and flat-margin calculator with tests"
```

---
