import { products, type ProductData } from "./data";
import { getPriceForQuantity } from "./pricing";
import { telegramUrl } from "./telegram";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  priceUSDT: number;
  quantity: number;
  minQuantity: number;
  stock: number;
};

export type CartIssue = {
  index: number;
  message: string;
};

export type CartReadResult = {
  items: CartItem[];
  issues: CartIssue[];
};

export type ValidatedCart = {
  items: CartItem[];
  totalQty: number;
  unitPrice: number;
  subtotalUSDT: number;
};

export type CartValidationResult =
  | { ok: true; cart: ValidatedCart }
  | { ok: false; issues: string[] };

export type CheckoutOrder = {
  id: string;
  timestamp: string;
  message: string;
  url: string;
};

export const CART_STORAGE_KEY = "cart";
export const CHECKOUT_ORDER_STORAGE_KEY = "checkout-order-draft";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getProduct(productId: unknown): ProductData | undefined {
  if (typeof productId !== "string") return undefined;
  return products.find((product) => product.id === productId && product.isActive);
}

function normalizeItem(rawItem: unknown, index: number): { item?: CartItem; issue?: CartIssue } {
  if (!isRecord(rawItem)) {
    return { issue: { index, message: "El producto guardado no es válido." } };
  }

  const product = getProduct(rawItem.productId);
  if (!product) {
    return { issue: { index, message: "El producto ya no está disponible." } };
  }

  const quantity = rawItem.quantity;
  if (
    typeof quantity !== "number" ||
    !Number.isFinite(quantity) ||
    !Number.isSafeInteger(quantity) ||
    quantity <= 0
  ) {
    return { issue: { index, message: `Cantidad inválida para ${product.name}.` } };
  }

  if (quantity < product.minQuantity) {
    return { issue: { index, message: `Cantidad mínima no válida para ${product.name}.` } };
  }

  if (quantity > product.stock) {
    return { issue: { index, message: `${product.name} supera el stock disponible.` } };
  }

  return {
    item: {
      id: product.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceUSDT: product.priceUSDT,
      quantity,
      minQuantity: product.minQuantity,
      stock: product.stock,
    },
  };
}

export function normalizeCart(rawCart: unknown): CartReadResult {
  if (!Array.isArray(rawCart)) {
    return {
      items: [],
      issues: [{ index: -1, message: "El carrito guardado no es válido." }],
    };
  }

  const items: CartItem[] = [];
  const issues: CartIssue[] = [];

  rawCart.forEach((rawItem, index) => {
    const result = normalizeItem(rawItem, index);
    if (result.item) items.push(result.item);
    if (result.issue) issues.push(result.issue);
  });

  return { items, issues };
}

export function validateCart(rawCart: unknown): CartValidationResult {
  const normalized = normalizeCart(rawCart);
  if (normalized.issues.length > 0) {
    return { ok: false, issues: normalized.issues.map((issue) => issue.message) };
  }

  if (normalized.items.length === 0) {
    return { ok: false, issues: ["El carrito está vacío."] };
  }

  const totalQty = normalized.items.reduce((sum, item) => sum + item.quantity, 0);
  if (!Number.isSafeInteger(totalQty) || totalQty <= 0) {
    return { ok: false, issues: ["La cantidad total del carrito no es válida."] };
  }

  const unitPrice = getPriceForQuantity(totalQty);
  const subtotalUSDT = unitPrice * totalQty;
  if (
    !Number.isFinite(unitPrice) ||
    unitPrice <= 0 ||
    !Number.isFinite(subtotalUSDT) ||
    subtotalUSDT <= 0
  ) {
    return { ok: false, issues: ["El total del carrito no es válido."] };
  }

  return {
    ok: true,
    cart: { items: normalized.items, totalQty, unitPrice, subtotalUSDT },
  };
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString("es-MX", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function getEntropy(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
    .slice(0, 12)
    .toUpperCase();
}

export function createOrderId(date = new Date(), entropy = getEntropy()): string {
  const datePart = date.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  return `CID-${datePart}-${entropy}`;
}

export function parseCheckoutOrder(value: unknown): CheckoutOrder | null {
  if (!isRecord(value)) return null;

  const { id, timestamp, message, url } = value;
  if (
    typeof id !== "string" ||
    !/^CID-[A-Z0-9-]+$/.test(id) ||
    typeof timestamp !== "string" ||
    timestamp.length === 0 ||
    timestamp.length > 100 ||
    typeof message !== "string" ||
    message.length === 0 ||
    message.length > 10000 ||
    typeof url !== "string"
  ) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" || parsedUrl.hostname !== "t.me") return null;
  } catch {
    return null;
  }

  return { id, timestamp, message, url };
}

export function createCheckoutOrder(
  cart: ValidatedCart,
  date = new Date(),
  orderId = createOrderId(date),
): CheckoutOrder {
  const timestamp = formatTimestamp(date);
  const lines = cart.items.map((item) => {
    const lineTotal = cart.unitPrice * item.quantity;
    return `• ${item.name} x${item.quantity} = $${lineTotal.toFixed(2)} USDT`;
  });

  let message = `🛒 *Nuevo Pedido - Tienda CID Fetcher*\n\n`;
  message += `*ID del pedido:* ${orderId}\n`;
  message += `*Fecha y hora:* ${timestamp}\n\n`;
  message += `*Productos:*\n${lines.join("\n")}\n\n`;
  message += `*Precio por unidad:* $${cart.unitPrice.toFixed(2)} USDT (${cart.totalQty} unidades)\n`;
  message += `*Total: $${cart.subtotalUSDT.toFixed(2)} USDT*`;
  message += `\n\n📍 Vengo de la web y quiero hacer este pedido.`;
  message += `\n\n— Enviado desde la web`;

  return {
    id: orderId,
    timestamp,
    message,
    url: telegramUrl(message),
  };
}
