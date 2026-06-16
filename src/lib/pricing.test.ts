import { describe, it, expect } from "vitest";
import { getPriceForQuantity, getTierLabel, BASE_PRICE_USDT, PRICE_TIERS } from "./pricing";

describe("getPriceForQuantity", () => {
  it("returns $1.50 for 1 unit", () => {
    expect(getPriceForQuantity(1)).toBe(1.5);
  });

  it("returns $1.50 for 29 units (tier boundary)", () => {
    expect(getPriceForQuantity(29)).toBe(1.5);
  });

  it("returns $0.99 for 30 units (volume tier start)", () => {
    expect(getPriceForQuantity(30)).toBe(0.99);
  });

  it("returns $0.99 for 99 units (tier boundary)", () => {
    expect(getPriceForQuantity(99)).toBe(0.99);
  });

  it("returns $0.75 for 100 units", () => {
    expect(getPriceForQuantity(100)).toBe(0.75);
  });

  it("returns $0.75 for 999 units (tier boundary)", () => {
    expect(getPriceForQuantity(999)).toBe(0.75);
  });

  it("returns $0.35 for 1000 units", () => {
    expect(getPriceForQuantity(1000)).toBe(0.35);
  });

  it("returns $0.35 for large quantities", () => {
    expect(getPriceForQuantity(50000)).toBe(0.35);
  });

  it("falls back to BASE_PRICE_USDT for 0 quantity", () => {
    expect(getPriceForQuantity(0)).toBe(BASE_PRICE_USDT);
  });
});

describe("getTierLabel", () => {
  it("labels the first tier as 1–29 unidades", () => {
    expect(getTierLabel(1, 29)).toBe("1–29 unidades");
  });

  it("labels mid tiers with range", () => {
    expect(getTierLabel(30, 99)).toBe("30–99 unidades");
    expect(getTierLabel(100, 999)).toBe("100–999 unidades");
  });

  it("labels the last tier with + suffix", () => {
    expect(getTierLabel(1000, Infinity)).toBe("1000+ unidades");
  });
});

describe("PRICE_TIERS integrity", () => {
  it("tiers are sorted ascending by min", () => {
    const mins = PRICE_TIERS.map((t) => t.min);
    expect(mins).toEqual([...mins].sort((a, b) => a - b));
  });

  it("each tier max is greater than min", () => {
    for (const tier of PRICE_TIERS) {
      expect(tier.max).toBeGreaterThan(tier.min);
    }
  });

  it("prices decrease as quantity increases", () => {
    const prices = PRICE_TIERS.map((t) => t.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThan(prices[i - 1]);
    }
  });

  it("BASE_PRICE_USDT matches first tier price", () => {
    expect(BASE_PRICE_USDT).toBe(PRICE_TIERS[0].price);
  });
});
