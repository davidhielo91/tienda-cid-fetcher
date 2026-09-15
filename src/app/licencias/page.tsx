import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/data";
import { LicenciasClient } from "./licencias-client";

export const metadata: Metadata = {
  title: "Catálogo de Licencias Microsoft Originales - Tienda CID Fetcher",
  description: "Licencias originales Microsoft: Windows, Office 2021/2024, Windows Server, Visio y Project. Desde $2.50 USDT con hasta 80% de descuento por volumen. Bot CID Fetcher gratis incluido. Entrega inmediata.",
  alternates: {
    canonical: "https://cidfetcher.de/licencias",
  },
};

const activeProducts = products.filter((p) => p.isActive && p.stock > 0);

export default function LicenciasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Catálogo de Licencias Microsoft",
            description: "Licencias originales Microsoft de activación telefónica",
            url: "https://cidfetcher.de/licencias",
            numberOfItems: activeProducts.length,
            itemListElement: activeProducts.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://cidfetcher.de/producto/${p.slug}`,
              name: p.name,
            })),
          }),
        }}
      />
      <Suspense>
        <LicenciasClient />
      </Suspense>
    </>
  );
}
