"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag, ArrowLeft, Send, AlertTriangle } from "lucide-react";
import { PRICE_TIERS, getTierLabel, getPriceForQuantity } from "@/lib/pricing";
import { telegramUrl } from "@/lib/telegram";

interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  priceUSDT: number;
  quantity: number;
  minQuantity: number;
}

function isValidCartItem(x: unknown): x is CartItem {
  return (
    typeof x === "object" && x !== null &&
    typeof (x as CartItem).productId === "string" &&
    typeof (x as CartItem).quantity === "number" &&
    typeof (x as CartItem).priceUSDT === "number" &&
    !isNaN((x as CartItem).quantity) &&
    !isNaN((x as CartItem).priceUSDT)
  );
}

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart");
    if (!data) return [];
    const raw: unknown = JSON.parse(data);
    return Array.isArray(raw) ? raw.filter(isValidCartItem) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  } catch {
    // QuotaExceededError or restricted context — UI stays consistent
  }
}

export function CarritoClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(getCart());
    setMounted(true);
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(item.minQuantity || 1, quantity) }
        : item
    );
    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (productId: string) => {
    const updated = cart.filter((item) => item.productId !== productId);
    setCart(updated);
    saveCart(updated);
    setConfirmDeleteId(null);
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unitPrice = getPriceForQuantity(totalQty);
  const subtotalUSDT = unitPrice * totalQty;

  const activeTier = PRICE_TIERS.find((t) => totalQty >= t.min && totalQty <= t.max);

  const telegramCheckout = () => {
    const lines = cart.map((item) => {
      const lineTotal = unitPrice * item.quantity;
      return `• ${item.name} x${item.quantity} = $${lineTotal.toFixed(2)} USDT`;
    });

    let msg = `🛒 *Nuevo Pedido - Tienda CID Fetcher*\n\n`;
    msg += `*Productos:*\n${lines.join("\n")}\n\n`;
    msg += `*Precio por unidad:* $${unitPrice.toFixed(2)} USDT (${totalQty} unidades)\n`;
    msg += `*Total: $${subtotalUSDT.toFixed(2)} USDT*`;
    msg += `\n\n📍 Vengo de la web y quiero hacer este pedido.`;
    msg += `\n\n— Enviado desde la web`;

    window.open(telegramUrl(msg), "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Send className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">¡Tu pedido está listo para enviar!</h1>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Abrimos <strong>Telegram</strong> con el resumen de tu pedido ya cargado.
            </p>
            <p className="text-sm">
              Solo falta que hagas clic en <strong>Enviar</strong> dentro de Telegram para que lo recibamos.
            </p>
            <p className="text-sm">
              Si Telegram no se abrió automáticamente, usá el botón de abajo.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <a
              href={telegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir a Telegram (se abre en nueva ventana)"
            >
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Abrir Telegram
              </Button>
            </a>
            <Link href="/licencias">
              <Button variant="outline" className="w-full">
                Seguir comprando
              </Button>
            </Link>
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Carrito de Compras</h1>
        <p className="text-muted-foreground mt-2">
          {cart.length === 0
            ? "Tu carrito está vacío"
            : `${cart.length} producto${cart.length !== 1 ? "s" : ""} en tu carrito`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground mb-6">Agrega productos desde nuestro catálogo</p>
          <Link href="/licencias">
            <Button>Ver Catálogo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="sr-only">Productos en tu carrito</h2>
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-4">
                  {confirmDeleteId === item.productId ? (
                    <div className="flex items-center gap-3 py-1">
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                      <p className="text-sm flex-1">¿Eliminar <strong>{item.name}</strong> del carrito?</p>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeItem(item.productId)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/producto/${item.slug}`}
                          className="font-medium hover:text-primary truncate block text-sm sm:text-base"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1.5">
                          <label htmlFor={`qty-${item.productId}`} className="sr-only">Cantidad de {item.name}</label>
                          <Input
                            id={`qty-${item.productId}`}
                            type="number"
                            min={item.minQuantity || 1}
                            max={9999}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value) || 1)
                            }
                            className="h-8 w-14 text-center text-xs"
                          />
                          <span className="text-xs text-muted-foreground">× ${unitPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold text-sm sm:text-base">${(unitPrice * item.quantity).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">USDT</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDeleteId(item.productId)}
                        className="text-destructive shrink-0"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {totalQty >= 30 && activeTier && (
              <p className="text-xs text-success font-medium px-1">
                ✓ Precio por volumen activo: ${activeTier.price} USDT/u ({getTierLabel(activeTier.min, activeTier.max)})
              </p>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Unidades totales</span>
                  <span className="font-medium">{totalQty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio por unidad</span>
                  <span className="font-medium">${unitPrice.toFixed(2)} USDT</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total USDT</span>
                  <span>${subtotalUSDT.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground mb-1">Garantía de 7 días</p>
                  <p>Si la licencia no funciona dentro de los 7 días posteriores a la compra, avísanos por Telegram y te la cambiamos sin costo.</p>
                </div>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Al hacer clic te enviaremos un resumen de tu pedido por Telegram.
                  Un agente te responderá para coordinar el pago y la entrega.
                </p>
                <Button className="w-full gap-2" size="lg" onClick={telegramCheckout}>
                  <Send className="h-5 w-5" />
                  Pagar por Telegram
                </Button>
                <Link href="/licencias">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Seguir Comprando
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
