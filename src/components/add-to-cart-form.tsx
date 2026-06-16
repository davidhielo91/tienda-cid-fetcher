"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";

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

  const addToCart = () => {
    if (added) return;
    try {
      const existing = localStorage.getItem("cart");
      const cart = existing ? JSON.parse(existing) : [];

      const existingIndex = cart.findIndex(
        (item: { productId: string }) => item.productId === productId
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
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

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch {
      localStorage.removeItem("cart");
    }
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
