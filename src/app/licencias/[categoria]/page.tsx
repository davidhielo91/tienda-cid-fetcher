import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory, getCategoryLabel } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

const slugToCategory: Record<string, string> = {
  windows: "windows",
  office: "office",
  "windows-server": "windows_server",
  visio: "visio",
  project: "project",
};

export function generateStaticParams() {
  return Object.keys(slugToCategory).map((categoria) => ({ categoria }));
}

interface PageProps {
  params: Promise<{ categoria: string }>;
}

const categoryMap: Record<string, string> = {
  windows: "Windows",
  office: "Office",
  windows_server: "Windows Server",
  visio: "Visio",
  project: "Project",
};

const categoryTitleMap: Record<string, string> = {
  windows: "Licencias Windows Originales",
  office: "Licencias Office 2021/2024 Originales",
  windows_server: "Licencias Windows Server Originales",
  visio: "Licencias Visio Originales",
  project: "Licencias Project Originales",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const key = slugToCategory[categoria];
  const name = categoryMap[key] || categoria;
  const title = categoryTitleMap[key] || `Licencias ${name} Originales`;
  return {
    title: `${title} - Tienda CID Fetcher`,
    description: `Compra licencias originales Microsoft ${name} de activación telefónica. Precios desde $2.50 USDT por unidad, hasta 80% de descuento por volumen. Bot CID Fetcher gratis con 30+ unidades. Entrega inmediata.`,
    alternates: {
      canonical: `https://cidfetcher.de/licencias/${categoria}`,
    },
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params;
  const categoryKey = slugToCategory[categoria];

  if (!categoryKey) {
    notFound();
  }

  const products = getProductsByCategory(categoryKey);
  const categoryName = getCategoryLabel(categoryKey);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Licencias", href: "/licencias" }, { label: categoryName }]} center />
        <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Licencias", href: "/licencias" }, { label: categoryName }]} />
        <Link
          href="/licencias"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver al catálogo
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
        <p className="text-muted-foreground mt-2">
          Licencias originales de {categoryName}
          {products.length > 0 && ` — ${products.length} producto${products.length !== 1 ? "s" : ""} disponible${products.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">
            No hay productos disponibles en esta categoría.
          </p>
          <Link href="/licencias">
            <Button variant="outline">Ver otras categorías</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      {categoryName}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Licencia original de activación telefónica
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-1">
                  {product.stock > 0 ? (
                    <span className="font-bold">
                      ${Number(product.priceUSDT).toFixed(2)} <span className="text-xs text-muted-foreground">USDT</span>
                    </span>
                  ) : (
                    <span className="text-xs text-destructive font-medium">Sin stock</span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
