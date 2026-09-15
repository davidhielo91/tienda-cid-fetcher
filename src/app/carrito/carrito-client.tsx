"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  RotateCcw,
  Send,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { PRICE_TIERS, getTierLabel, getPriceForQuantity } from "@/lib/pricing";
import {
  createCheckoutOrder,
  CART_STORAGE_KEY,
  CHECKOUT_ORDER_STORAGE_KEY,
  normalizeCart,
  parseCheckoutOrder,
  validateCart,
  type CartItem,
  type CheckoutOrder,
} from "@/lib/checkout";

type CartReadResult = ReturnType<typeof normalizeCart>;
type StorageAction = "read" | "write" | "remove";

function removeCart(): string | null {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return null;
  } catch {
    return "No se pudo limpiar el carrito guardado. Revisa los permisos de almacenamiento e inténtalo de nuevo.";
  }
}

function getCart(): CartReadResult & { storageError?: string } {
  if (typeof window === "undefined") return { items: [], issues: [] };

  let data: string | null;
  try {
    data = localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return {
      items: [],
      issues: [],
      storageError: "No se pudo leer el carrito guardado. Revisa los permisos de almacenamiento e inténtalo de nuevo.",
    };
  }

  if (!data) return { items: [], issues: [] };

  try {
    const raw: unknown = JSON.parse(data);
    return normalizeCart(raw);
  } catch {
    return {
      items: [],
      issues: [{ index: -1, message: "El carrito guardado está dañado y no se pudo leer." }],
    };
  }
}

function saveCart(items: CartItem[], notify = true): string | null {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    if (notify) window.dispatchEvent(new Event("cart-updated"));
    return null;
  } catch {
    return "No se pudo guardar el carrito. Revisa los permisos o el espacio disponible e inténtalo de nuevo.";
  }
}

function getCheckoutDraft(): { order: CheckoutOrder | null; error?: string } {
  try {
    const data = sessionStorage.getItem(CHECKOUT_ORDER_STORAGE_KEY);
    if (!data) return { order: null };

    let order: CheckoutOrder | null = null;
    try {
      order = parseCheckoutOrder(JSON.parse(data));
    } catch {
      order = null;
    }

    if (order) return { order };

    try {
      sessionStorage.removeItem(CHECKOUT_ORDER_STORAGE_KEY);
      return { order: null, error: "Se descartó un borrador de pedido inválido." };
    } catch {
      return {
        order: null,
        error: "No se pudo limpiar un borrador de pedido inválido. Cierra esta pestaña e inténtalo de nuevo.",
      };
    }
  } catch {
    return {
      order: null,
      error: "No se pudo leer el borrador de pedido. Revisa los permisos de almacenamiento e inténtalo de nuevo.",
    };
  }
}

function saveCheckoutDraft(order: CheckoutOrder): string | null {
  try {
    sessionStorage.setItem(CHECKOUT_ORDER_STORAGE_KEY, JSON.stringify(order));
    return null;
  } catch {
    return "No se pudo guardar el borrador de pedido. No recargues la página y reintenta guardar antes de continuar.";
  }
}

export function CarritoClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [cartIssues, setCartIssues] = useState<string[]>([]);
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutOrder | null>(null);
  const [telegramOpened, setTelegramOpened] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [storageAction, setStorageAction] = useState<StorageAction | null>(null);
  const [checkoutStorageError, setCheckoutStorageError] = useState<string | null>(null);
  const [checkoutDraftRestored, setCheckoutDraftRestored] = useState(false);
  const [orderIdCopied, setOrderIdCopied] = useState(false);
  const checkoutOrderRef = useRef<CheckoutOrder | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let cleanupTimer: number | undefined;

    const loadCart = () => {
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
      const result = getCart();
      setCart(result.items);
      setCartIssues(result.issues.map((issue) => issue.message));
      setStorageError(result.storageError ?? null);
      setStorageAction(result.storageError ? "read" : null);

      if (result.issues.length > 0) {
        cleanupTimer = window.setTimeout(() => {
          const failure = result.items.length > 0
            ? saveCart(result.items, false)
            : removeCart();
          if (failure) {
            setStorageError(failure);
            setStorageAction(result.items.length > 0 ? "write" : "remove");
          } else {
            window.dispatchEvent(new Event("cart-updated"));
          }
        }, 0);
      }
    };

    const handleCartChange = (event: Event) => {
      if (event.type === "storage" && (event as StorageEvent).key !== null && (event as StorageEvent).key !== CART_STORAGE_KEY) {
        return;
      }
      loadCart();
    };

    loadCart();
    const mountedTimer = window.setTimeout(() => setMounted(true), 0);
    window.addEventListener("cart-updated", handleCartChange);
    window.addEventListener("storage", handleCartChange);

    return () => {
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
      window.clearTimeout(mountedTimer);
      window.removeEventListener("cart-updated", handleCartChange);
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  useEffect(() => {
    const draft = getCheckoutDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckoutStorageError(draft.error ?? null);
    if (draft.order) {
      checkoutOrderRef.current = draft.order;
      setCheckoutOrder(draft.order);
      setCheckoutDraftRestored(true);
    }
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.find((cartItem) => cartItem.productId === productId);
    if (!item) return;

    const safeQuantity = Number.isSafeInteger(quantity) ? quantity : item.minQuantity;
    const updated = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(item.stock, Math.max(item.minQuantity, safeQuantity)) }
        : item
    );
    const failure = saveCart(updated);
    if (failure) {
      setStorageError(failure);
      setStorageAction("write");
      return;
    }
    setCart(updated);
    setCartIssues([]);
    setCheckoutError(null);
    setStorageError(null);
    setStorageAction(null);
  };

  const removeItem = (productId: string) => {
    const updated = cart.filter((item) => item.productId !== productId);
    const failure = updated.length === 0 ? removeCart() : saveCart(updated);
    if (failure) {
      setStorageError(failure);
      setStorageAction(updated.length === 0 ? "remove" : "write");
      return;
    }
    setCart(updated);
    setCartIssues([]);
    setCheckoutError(null);
    setStorageError(null);
    setStorageAction(null);
    setConfirmDeleteId(null);
  };

  const retryStorage = () => {
    if (storageAction === "read") {
      window.dispatchEvent(new Event("cart-updated"));
      return;
    }

    const failure = storageAction === "remove" ? removeCart() : saveCart(cart);
    if (failure) {
      setStorageError(failure);
      return;
    }
    setStorageError(null);
    setStorageAction(null);
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unitPrice = getPriceForQuantity(totalQty);
  const subtotalUSDT = unitPrice * totalQty;

  const activeTier = PRICE_TIERS.find((t) => totalQty >= t.min && totalQty <= t.max);

  const openTelegram = (order: CheckoutOrder): boolean => {
    try {
      return window.open(order.url, "_blank", "noopener,noreferrer") !== null;
    } catch {
      return false;
    }
  };

  const telegramCheckout = () => {
    if (checkoutOrderRef.current) return;

    const validation = validateCart(cart);
    if (!validation.ok) {
      setCheckoutError(validation.issues.join(" "));
      return;
    }

    const order = createCheckoutOrder(validation.cart);
    checkoutOrderRef.current = order;
    setCheckoutOrder(order);
    setCheckoutDraftRestored(false);
    setOrderIdCopied(false);
    setCheckoutStorageError(saveCheckoutDraft(order));
    setCheckoutError(null);
    setTelegramOpened(openTelegram(order));
  };

  const retryTelegram = () => {
    if (!checkoutOrder) return;
    setTelegramOpened(openTelegram(checkoutOrder));
  };

  const retryCheckoutDraft = () => {
    if (checkoutOrder) {
      setCheckoutStorageError(saveCheckoutDraft(checkoutOrder));
      return;
    }

    const draft = getCheckoutDraft();
    setCheckoutStorageError(draft.error ?? null);
    if (draft.order) {
      checkoutOrderRef.current = draft.order;
      setCheckoutOrder(draft.order);
      setCheckoutDraftRestored(true);
    }
  };

  const copyOrderId = async () => {
    if (!checkoutOrder) return;

    try {
      await navigator.clipboard.writeText(checkoutOrder.id);
      setOrderIdCopied(true);
      toast.success("ID de pedido copiado");
    } catch {
      setOrderIdCopied(false);
      toast.error("No se pudo copiar el ID. Selecciónalo y cópialo manualmente.");
    }
  };

  if (checkoutOrder) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Send className="size-7 text-primary" aria-hidden="true" />
            </div>
            <p className="mb-2 text-sm font-medium text-primary">Checkout por Telegram</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {telegramOpened ? "Telegram está listo" : checkoutDraftRestored ? "Pedido listo para continuar" : "Abre Telegram para continuar"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {telegramOpened
                ? "Abrimos Telegram con el resumen completo de tu pedido."
                : checkoutDraftRestored
                ? "Restauramos tu pedido pendiente sin generar un nuevo ID."
                : "Tu navegador bloqueó la apertura automática de Telegram. Usa uno de los botones para continuar."}
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-3" aria-label="Pasos para enviar tu pedido">
            <li className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-start gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Pedido preparado</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Resumen e ID listos.</p>
                </div>
              </div>
            </li>
            <li className={`rounded-lg border p-3 ${telegramOpened ? "border-primary/30 bg-primary/5" : "border-warning/40 bg-warning/5"}`}>
              <div className="flex items-start gap-2.5">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${telegramOpened ? "bg-primary text-primary-foreground" : "bg-warning/20 text-foreground"}`}>
                  {telegramOpened ? <Check className="size-4" aria-hidden="true" /> : "2"}
                </span>
                <div>
                  <p className="text-sm font-semibold">{telegramOpened ? "Telegram abierto" : "Abrir Telegram"}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {telegramOpened ? "Mensaje cargado." : "Reintenta si se bloqueó."}
                  </p>
                </div>
              </div>
            </li>
            <li className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-start gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                <div>
                  <p className="text-sm font-semibold">Enviar pedido</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Pulsa Enviar en Telegram.</p>
                </div>
              </div>
            </li>
          </ol>

          <div className="mt-6 rounded-xl border bg-card p-5 shadow-card sm:p-6">
            <div className="rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm" role="note">
              <p className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="size-4 text-warning" aria-hidden="true" />
                Último paso requerido
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Debes pulsar <strong className="text-foreground">Enviar</strong> dentro de Telegram para que recibamos tu pedido.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/50 p-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">ID de pedido</p>
                <code className="mt-1 block break-all font-mono text-sm font-semibold">{checkoutOrder.id}</code>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="min-h-10 gap-2"
                onClick={copyOrderId}
                aria-label={orderIdCopied ? "ID de pedido copiado" : "Copiar ID de pedido"}
              >
                {orderIdCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {orderIdCopied ? "Copiado" : "Copiar ID"}
              </Button>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {orderIdCopied ? "ID de pedido copiado al portapapeles." : ""}
            </p>

            {checkoutStorageError && (
              <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-left text-sm text-destructive" role="alert">
                <p>{checkoutStorageError}</p>
                <Button variant="outline" size="sm" className="mt-3 min-h-10" onClick={retryCheckoutDraft}>
                  Reintentar guardar el pedido
                </Button>
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <Button size="lg" className="w-full gap-2" onClick={retryTelegram}>
                <RotateCcw className="size-4" aria-hidden="true" />
                {telegramOpened ? "Reabrir Telegram con el pedido" : "Reintentar abrir Telegram"}
              </Button>
              <a
                href={checkoutOrder.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Telegram con el pedido (se abre en nueva ventana)"
                className="block"
              >
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <Send className="size-4" aria-hidden="true" />
                  Abrir enlace del pedido
                </Button>
              </a>
              <Link href="/licencias" className="block">
                <Button variant="ghost" size="lg" className="w-full">
                  Seguir comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-muted-foreground">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10">
      {storageError && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="min-w-0 flex-1 leading-relaxed">{storageError}</p>
          <Button variant="outline" size="sm" className="min-h-10 shrink-0" onClick={retryStorage}>
            Reintentar
          </Button>
        </div>
      )}
      {checkoutStorageError && (
        <div className="mb-6 flex flex-wrap items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="min-w-0 flex-1 leading-relaxed">{checkoutStorageError}</p>
          <Button variant="outline" size="sm" className="min-h-10 shrink-0" onClick={retryCheckoutDraft}>
            Reintentar
          </Button>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Carrito de compras</h1>
        <p className="text-muted-foreground mt-2">
          {cart.length === 0
            ? "Tu carrito está vacío"
            : `${cart.length} producto${cart.length !== 1 ? "s" : ""} en tu carrito`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="mx-auto max-w-md py-12 text-center sm:py-16">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-muted/70">
            <ShoppingBag className="size-8 text-muted-foreground/60" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
          {cartIssues.length > 0 && (
            <div className="mt-5 rounded-lg border border-warning/40 bg-warning/5 p-4 text-left text-sm" role="alert">
              <p className="font-medium">No hay productos válidos para continuar.</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {cartIssues.join(" ")} Los productos inválidos se descartaron.
              </p>
            </div>
          )}
          <p className="mt-5 text-muted-foreground">Explora el catálogo para agregar licencias a tu pedido.</p>
          <Link href="/licencias" className="mt-6 inline-block">
            <Button size="lg">Ver catálogo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <h2 className="sr-only">Productos en tu carrito</h2>
          {cartIssues.length > 0 && (
            <div className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/5 p-4 text-sm lg:col-span-3" role="alert">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">Revisa algunos productos del carrito.</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {cartIssues.join(" ")} Los productos válidos se conservaron; los inválidos no se pueden usar.
                </p>
              </div>
              <Link href="/licencias" className="shrink-0">
                <Button variant="outline" size="sm" className="min-h-10">Ver catálogo</Button>
              </Link>
            </div>
          )}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.productId} className="shadow-card transition-[box-shadow,border-color] duration-200 hover:shadow-elevated">
                <CardContent className="p-4 sm:p-5">
                  {confirmDeleteId === item.productId ? (
                    <div className="flex flex-wrap items-center gap-3 py-1">
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                      <p className="min-w-0 flex-1 text-sm">¿Eliminar <strong>{item.name}</strong> del carrito?</p>
                      <div className="flex w-full gap-2 sm:w-auto">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="min-h-10 flex-1 sm:flex-none"
                          onClick={() => removeItem(item.productId)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-10 flex-1 sm:flex-none"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 sm:items-center">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/producto/${item.slug}`}
                          className="block break-words text-sm font-medium hover:text-primary sm:text-base"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <label htmlFor={`qty-${item.productId}`} className="sr-only">Cantidad de {item.name}</label>
                          <Input
                            id={`qty-${item.productId}`}
                            type="number"
                            min={item.minQuantity}
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value) || 1)
                            }
                            className="h-10 w-16 text-center text-sm"
                          />
                          <span className="text-xs text-muted-foreground">× ${unitPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-start gap-2 sm:items-center">
                        <div className="text-right">
                          <div className="text-sm font-semibold sm:text-base">${(unitPrice * item.quantity).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">USDT</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setConfirmDeleteId(item.productId)}
                          className="size-10 text-destructive"
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {totalQty >= 30 && activeTier && (
              <p className="px-1 text-xs font-medium text-success">
                ✓ Precio por volumen activo: ${activeTier.price} USDT/u ({getTierLabel(activeTier.min, activeTier.max)})
              </p>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-card">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Resumen</CardTitle>
                  <span className="text-xs text-muted-foreground">{totalQty} unidades</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-5">
                <div className="space-y-3">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Unidades totales</span>
                    <span className="font-medium">{totalQty}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Precio por unidad</span>
                    <span className="font-medium">${unitPrice.toFixed(2)} USDT</span>
                  </div>
                </div>
                <Separator />
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-sm font-medium">Total USDT</span>
                    <span className="text-2xl font-bold tracking-tight">${subtotalUSDT.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3 rounded-lg bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <div>
                    <p className="mb-1 font-medium text-foreground">Garantía de 7 días</p>
                    <p>Si la licencia no funciona dentro de los 7 días posteriores a la compra, avísanos por Telegram y te la cambiamos sin costo.</p>
                  </div>
                </div>

                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  Al hacer clic te enviaremos un resumen de tu pedido por Telegram.
                  Un agente te responderá para coordinar el pago y la entrega.
                </p>
                {checkoutError && (
                  <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p>{checkoutError}</p>
                      <Button variant="outline" size="sm" className="mt-3 min-h-10" onClick={telegramCheckout}>
                        Reintentar checkout
                      </Button>
                    </div>
                  </div>
                )}
                <Button className="w-full gap-2" size="lg" onClick={telegramCheckout}>
                  <Send className="size-5" aria-hidden="true" />
                  Enviar pedido por Telegram
                </Button>
                <Link href="/licencias" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Seguir comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
