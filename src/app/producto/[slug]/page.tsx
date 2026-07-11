import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProductsByCategory, getCategoryLabel } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { CheckCircle2, Send } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PRICE_TIERS, getTierLabel, getPriceForQuantity, BASE_PRICE_USDT } from "@/lib/pricing";
import { telegramUrl } from "@/lib/telegram";
import { CopyLinkButton } from "@/components/copy-link-button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} - Tienda CID Fetcher`,
    description: product.shortDesc || `Licencia original ${product.name}. Activación telefónica. Precios por volumen.`,
    alternates: {
      canonical: `https://cidfetcher.de/producto/${product.slug}`,
    },
  };
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const catLabel = getCategoryLabel(product.category);
  const catSlug = product.category.replace(/_/g, "-");

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Licencias", href: "/licencias" }, { label: catLabel, href: catSlug ? `/licencias/${catSlug}` : undefined }, { label: product.name }]} />
      <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Licencias", href: "/licencias" }, { label: catLabel, href: catSlug ? `/licencias/${catSlug}` : undefined }, { label: product.name }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDesc || (product.description ? product.description.slice(0, 200) : ""),
            sku: product.id,
            category: "Software",
            brand: { "@type": "Brand", name: "Microsoft" },
            ...(product.imageUrl ? { image: `https://cidfetcher.de${product.imageUrl}` } : {}),
            offers: {
              "@type": "AggregateOffer",
              lowPrice: PRICE_TIERS[PRICE_TIERS.length - 1].price.toFixed(2),
              highPrice: BASE_PRICE_USDT.toFixed(2),
              priceCurrency: "USD",
              offerCount: PRICE_TIERS.length,
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `https://cidfetcher.de/producto/${product.slug}`,
              seller: { "@type": "Organization", name: "Tienda CID Fetcher" },
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{catLabel}</Badge>
              <Badge variant="outline">
                {product.activationType === "digital"
                  ? "Digital"
                  : product.activationType === "physical"
                  ? "Física"
                  : "Suscripción"}
              </Badge>
            </div>
            {product.imageUrl && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted mb-6">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            {product.shortDesc && (
              <p className="text-muted-foreground mt-2 text-lg">{product.shortDesc}</p>
            )}
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Descripción</h2>
            <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
          </div>

          {product.features.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Características</h2>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Compartir</h2>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(`https://cidfetcher.de/producto/${product.slug}`)}&text=${encodeURIComponent(`${product.name} - Licencia original Microsoft`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
                aria-label="Compartir en Telegram (se abre en nueva ventana)"
              >
                <Send className="h-3.5 w-3.5" />
                Telegram
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - $${Number(product.priceUSDT).toFixed(2)} USDT | Tienda CID Fetcher: https://cidfetcher.de/producto/${product.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
                aria-label="Compartir en WhatsApp (se abre en nueva ventana)"
              >
                Compartir en WhatsApp
              </a>
              <CopyLinkButton url={`https://cidfetcher.de/producto/${product.slug}`} />
            </div>
          </div>
        </div>

        <div>
          {product.stock > 0 ? (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Precio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">
                    ${Number(product.priceUSDT).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">USDT</span>
                </div>

                <div className="bg-muted rounded-lg p-4 text-sm space-y-2">
                  <p className="font-medium mb-2">Precios por volumen</p>
                  {PRICE_TIERS.map((tier) => (
                    <div key={tier.min} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{getTierLabel(tier.min, tier.max)}</span>
                      <span className="font-semibold">${tier.price} USDT</span>
                    </div>
                  ))}
                </div>

                <Separator />

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Cantidad mínima: {product.minQuantity}</p>
                    <p className="text-xs text-muted-foreground">Precios por volumen aplicados automáticamente al agregar al carrito.</p>
                    <p className="text-success font-medium">Stock: Disponible</p>
                  </div>

                <AddToCartForm
                  productId={product.id}
                  productSlug={product.slug}
                  name={product.name}
                  priceUSDT={Number(product.priceUSDT)}
                  minQuantity={product.minQuantity}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Producto no disponible</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Este producto no tiene stock disponible actualmente.
                </p>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm font-medium mb-2">¿Te interesa este producto?</p>
                  <a
                    href={telegramUrl("Hola, me interesa un producto que está sin stock en la web. ¿Me pueden informar?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar disponibilidad por Telegram (se abre en nueva ventana)"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      Consultar disponibilidad
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <Link key={rp.id} href={`/producto/${rp.slug}`}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-semibold">{rp.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-1">
                    {rp.stock > 0 ? (
                      <span className="font-bold">
                        ${Number(rp.priceUSDT).toFixed(2)} <span className="text-xs text-muted-foreground">USDT</span>
                      </span>
                    ) : (
                      <span className="text-xs text-destructive">Sin stock</span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
