import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Monitor, FileText, ChevronRight, Download, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Instaladores Oficiales Microsoft - Tienda CID Fetcher",
  description: "Descarga instaladores oficiales de Microsoft Windows y Office directamente desde el CDN de Microsoft. ISOs originales para Windows 10, Windows 11 y Office desde 2013 hasta 2024.",
  alternates: {
    canonical: "https://cidfetcher.de/instaladores",
  },
};

const categories = [
  {
    icon: Monitor,
    title: "Windows",
    desc: "Instaladores oficiales de Windows 11 y Windows 10. ISOs directas desde los servidores de Microsoft.",
    count: 3,
    href: "/instaladores/windows",
    badge: "ISO",
  },
  {
    icon: FileText,
    title: "Office",
    desc: "Instaladores de Microsoft Office desde 2013 hasta 2024. Incluye Project y Visio. En español e inglés.",
    count: 21,
    href: "/instaladores/office",
    badge: ".img",
  },
];

export default function InstaladoresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Instaladores" }]} center />
        <h1 className="text-3xl font-bold tracking-tight">Instaladores Oficiales Microsoft</h1>
        <p className="text-muted-foreground mt-2">
          Elige el instalador que necesitas. Todos los enlaces redirigen a los servidores oficiales de Microsoft.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="lg:sticky lg:top-24 space-y-3">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Categorías
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <cat.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{cat.title}</span>
                  <Badge variant="secondary" className="shrink-0 text-xs px-1.5 py-0 h-5">
                    {cat.count}
                  </Badge>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium mb-1 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  Nota
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Archivos .img: haz doble clic para montarlos en Windows 8/10/11, o usa Rufus/7-Zip.
                </p>
              </div>
            </div>
          </nav>
        </aside>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href}>
                <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <cat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{cat.title}</CardTitle>
                        <CardDescription className="mt-1">{cat.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Download className="h-3 w-3" />
                        {cat.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{cat.count} disponible{cat.count !== 1 ? "s" : ""}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <section className="mt-8 p-6 rounded-xl bg-muted/30 border">
            <h3 className="font-semibold text-lg mb-2">Nota importante</h3>
            <p className="text-sm text-muted-foreground">
              Los enlaces redirigen a los servidores oficiales de Microsoft CDN. No almacenamos ni distribuimos archivos ISO. Necesitas una licencia válida para activar el software después de la instalación.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
