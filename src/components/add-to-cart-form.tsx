"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { CART_STORAGE_KEY, normalizeCart, type CartItem } from "@/lib/checkout";

interface AddToCartFormProps {
  productId: string;
  productSlug: string;
  name: string;
  priceUSDT: number;
  minQuantity: number;
}

export function AddToCartForm({
  productId,
  productSlug,
  name,
  priceUSDT,
  minQuantity,
}: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(minQuantity);
  const [added, setAdded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  const addToCart = () => {
    if (added) return;
    let existing: string | null;
    try {
      existing = localStorage.getItem(CART_STORAGE_KEY);
    } catch {
      setStorageError("No se pudo leer el carrito. Revisa los permisos de almacenamiento e inténtalo de nuevo.");
      return;
    }

    let normalized;
    try {
      normalized = normalizeCart(existing ? JSON.parse(existing) : []);
    } catch {
      setStorageError("El carrito guardado está dañado. Abre el carrito para revisar los datos antes de agregar productos.");
      return;
    }

    if (normalized.issues.length > 0) {
      setStorageError(`${normalized.issues.map((issue) => issue.message).join(" ")} Abre el carrito para revisar los datos.`);
      return;
    }

    const cart: Array<Partial<CartItem> & { productId: string; quantity: number }> = normalized.items.map((item) => ({ ...item }));
    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex >= 0) {
      const currentItem = cart[existingIndex];
      const nextQuantity = currentItem.quantity + quantity;
      if (currentItem.stock !== undefined && nextQuantity > currentItem.stock) {
        setStorageError(`La cantidad solicitada supera el stock disponible para ${name}.`);
        return;
      }
      currentItem.quantity = nextQuantity;
    } else {
      cart.push({
        id: typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        productId,
        slug: productSlug,
        name,
        priceUSDT,
        quantity,
        minQuantity,
      });
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      setStorageError("No se pudo guardar el carrito. Revisa los permisos o el espacio disponible e inténtalo de nuevo.");
      return;
    }

    setStorageError(null);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="quantity-input" className="text-sm font-medium mb-2 block">
          Cantidad
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(minQuantity, quantity - 1))}
            aria-label="Disminuir cantidad"
            className="h-9 w-9"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity-input"
            type="number"
            min={minQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(minQuantity, parseInt(e.target.value) || minQuantity))}
            className="h-9 w-16 text-center"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Aumentar cantidad"
            className="h-9 w-9"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button type="button" className="w-full" onClick={addToCart} disabled={added}>
        {added ? (
          <>✓ Agregado</>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al carrito
          </>
        )}
      </Button>
      {storageError && (
        <div className="space-y-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          <p>{storageError}</p>
          <Link href="/carrito" className="block">
            <Button variant="outline" className="w-full" size="sm">
              Abrir carrito
            </Button>
          </Link>
        </div>
      )}
      {added && (
        <Link href="/carrito" className="block">
          <Button variant="outline" className="w-full" size="sm">
            Ver carrito
          </Button>
        </Link>
      )}
    </div>
  );
}
