import { describe, expect, it } from "vitest";
import {
  createCheckoutOrder,
  createOrderId,
  normalizeCart,
  parseCheckoutOrder,
  validateCart,
} from "./checkout";

const validItem = {
  productId: "windows-11-pro",
  quantity: 2,
  name: "Tampered name",
  slug: "tampered-slug",
  priceUSDT: 0,
  minQuantity: 999,
};

describe("normalizeCart", () => {
  it("uses authoritative product data instead of persisted display fields", () => {
    const result = normalizeCart([validItem]);

    expect(result.issues).toHaveLength(0);
    expect(result.items[0]).toMatchObject({
      productId: "windows-11-pro",
      name: "Windows 11 Pro",
      slug: "windows-11-pro",
      priceUSDT: 2.5,
      minQuantity: 1,
    });
  });

  it.each([
    ["unknown product", { productId: "not-a-product", quantity: 1 }],
    ["non-finite quantity", { productId: "windows-11-pro", quantity: Infinity }],
    ["fractional quantity", { productId: "windows-11-pro", quantity: 1.5 }],
    ["non-positive quantity", { productId: "windows-11-pro", quantity: 0 }],
    ["out of stock", { productId: "windows-10-enterprise-mak", quantity: 1 }],
  ])("rejects %s", (_, item) => {
    expect(normalizeCart([item]).items).toHaveLength(0);
    expect(normalizeCart([item]).issues).toHaveLength(1);
  });
});

describe("validateCart", () => {
  it("rejects malformed cart data before checkout", () => {
    const result = validateCart([{ productId: "windows-11-pro", quantity: Number.MAX_VALUE }]);

    expect(result.ok).toBe(false);
  });

  it("calculates totals from authoritative pricing", () => {
    const result = validateCart([{ productId: "windows-11-pro", quantity: 30 }]);

    expect(result).toEqual({
      ok: true,
      cart: expect.objectContaining({
        totalQty: 30,
        unitPrice: 1.5,
        subtotalUSDT: 45,
      }),
    });
  });
});

describe("createCheckoutOrder", () => {
  it("includes reusable order ID, timestamp, and full message URL", () => {
    const result = validateCart([{ productId: "windows-11-pro", quantity: 2 }]);
    if (!result.ok) throw new Error("Expected valid cart");

    const date = new Date("2026-09-14T12:34:56.000Z");
    const order = createCheckoutOrder(result.cart, date, createOrderId(date, "ABC123DEF456"));

    expect(order.id).toBe("CID-20260914123456-ABC123DEF456");
    expect(order.message).toContain(order.id);
    expect(order.message).toContain(order.timestamp);
    expect(decodeURIComponent(order.url)).toContain(order.message);
  });
});

describe("parseCheckoutOrder", () => {
  const validOrder = {
    id: "CID-20260914123456-ABC123DEF456",
    timestamp: "14/09/2026, 06:34:56",
    message: "Pedido CID-20260914123456-ABC123DEF456",
    url: "https://t.me/rootkit_spoofer?text=Pedido",
  };

  it("restores a valid checkout draft", () => {
    expect(parseCheckoutOrder(validOrder)).toEqual(validOrder);
  });

  it.each([
    ["not an object", "invalid"],
    ["invalid order ID", { ...validOrder, id: "order-1" }],
    ["invalid Telegram URL", { ...validOrder, url: "https://example.com/order" }],
    ["missing message", { ...validOrder, message: "" }],
  ])("rejects %s", (_, value) => {
    expect(parseCheckoutOrder(value)).toBeNull();
  });
});
