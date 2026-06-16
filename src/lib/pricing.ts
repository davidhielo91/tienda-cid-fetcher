export const BASE_PRICE_USDT = 1.5;

export const PRICE_TIERS = [
  { min: 1, max: 29, price: 1.5 },
  { min: 30, max: 99, price: 0.99 },
  { min: 100, max: 999, price: 0.75 },
  { min: 1000, max: Infinity, price: 0.35 },
] as const;

export function getPriceForQuantity(qty: number): number {
  for (const tier of PRICE_TIERS) {
    if (qty >= tier.min && qty <= tier.max) {
      return tier.price;
    }
  }
  return BASE_PRICE_USDT;
}

export function getTierLabel(min: number, max: number | typeof Infinity): string {
  if (min === 1) return "1–29 unidades";
  if (max === Infinity) return `${min}+ unidades`;
  return `${min}–${max} unidades`;
}
