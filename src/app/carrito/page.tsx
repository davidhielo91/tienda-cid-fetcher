import type { Metadata } from "next";
import { CarritoClient } from "./carrito-client";

export const metadata: Metadata = {
  title: "Carrito - Tienda CID Fetcher",
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return <CarritoClient />;
}
