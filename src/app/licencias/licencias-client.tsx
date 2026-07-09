"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProductsByCategory, getCategoryLabel } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Monitor, FileText, Server, Layers, GitBranch, Package, Search, ChevronRight } from "lucide-react";

const categoryConfig: Record<string, { icon: typeof Monitor; label: string; slug: string }> = {
  windows: { icon: Monitor, label: "Windows", slug: "windows" },
  office: { icon: FileText, label: "Office", slug: "office" },
  windows_server: { icon: Server, label: "Windows Server", slug: "windows-server" },
  visio: { icon: Layers, label: "Visio", slug: "visio" },
  project: { icon: GitBranch, label: "Project", slug: "project" },
};

const categoryKeys = ["windows", "office", "windows_server", "visio", "project"];

export function LicenciasClient() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const allProducts = useMemo(() => getProductsByCategory(), []);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        getCategoryLabel(p.category).toLowerCase().includes(q)
    );
  }, [allProducts, searchQuery]);

  const grouped: Record<string, typeof filtered> = {};
  for (const product of filtered) {
    const key = product.category;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(product);
  }

  const totalProducts = allProducts.length;
  const resultCount = filtered.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Catálogo de Licencias" }]} center />
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Licencias Microsoft</h1>
        <p className="text-muted-foreground mt-2">
          {searchQuery.trim()
            ? `${resultCount} resultado${resultCount !== 1 ? "s" : ""} para "${searchQuery}"`
            : `Todas nuestras licencias originales de software Microsoft (${totalProducts})`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="lg:sticky lg:top-24 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
                aria-label="Buscar en el catálogo"
              />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Categorías
              </p>
              {categoryKeys.map((key) => {
                const cfg = categoryConfig[key];
                const Icon = cfg.icon;
                const count = grouped[key]?.length ?? 0;
                const isActive = pathname === `/licencias/${cfg.slug}`;
                return (
                  <Link
                    key={key}
                    href={`/licencias/${cfg.slug}`}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{cfg.label}</span>
                    <Badge variant={isActive ? "default" : "secondary"} className="shrink-0 text-xs px-1.5 py-0 h-5">
                      {count}
                    </Badge>
                    <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? "text-primary" : "text-muted-foreground/50"}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t">
              <Link
                href="/licencias"
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/licencias"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Package className="h-4 w-4 shrink-0" />
                <span>Todos los productos</span>
                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5">
                  {totalProducts}
                </Badge>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium mb-1">Precio base</p>
                <p className="text-sm font-bold">$2.50 USDT</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                  Descuentos desde 30 unidades. Bot CID Fetcher gratis incluido.
                </p>
              </div>
            </div>
          </nav>
        </aside>

        <div className="lg:col-span-3 space-y-12">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium mb-1">Sin resultados</p>
              <p className="text-sm text-muted-foreground mb-4">
                No encontramos productos para &quot;{searchQuery}&quot;
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Limpiar búsqueda
              </Button>
            </div>
          ) : (
            Object.entries(grouped).map(([categoryKey, products]) => {
              const cfg = categoryConfig[categoryKey];
              const Icon = cfg?.icon || Package;
              const label = getCategoryLabel(categoryKey);
              const slug = categoryKey.replace(/_/g, "-");
              return (
                <section key={categoryKey}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">{label}</h2>
                      <Badge variant="secondary" className="text-xs ml-1">
                        {products.length}
                      </Badge>
                    </div>
                    <Link href={`/licencias/${slug}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Ver todo <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <Link key={product.id} href={`/producto/${product.slug}`}>
                        <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                          <CardHeader className="p-4 pb-2">
                            {product.imageUrl && (
                              <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-3 -mt-1">
                                <Image src={product.imageUrl} alt={product.name} width={400} height={225} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            )}
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
                              <Badge variant="secondary" className="shrink-0">{label}</Badge>
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
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
