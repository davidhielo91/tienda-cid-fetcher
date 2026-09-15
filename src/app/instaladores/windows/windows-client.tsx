"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Monitor, Download, ExternalLink, Search, Info } from "lucide-react";

const isos = [
  { name: "Windows 11", desc: "ISO oficial Microsoft — última versión", link: "https://www.microsoft.com/software-download/windows11" },
  { name: "Windows 10", desc: "ISO oficial Microsoft — última versión", link: "https://www.microsoft.com/software-download/windows10" },
  { name: "Media Creation Tool", desc: "Herramienta oficial para crear USB de instalación", link: "https://www.microsoft.com/software-download/windows10" },
];

export function WindowsClient() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return isos;
    const q = search.toLowerCase();
    return isos.filter((iso) => iso.name.toLowerCase().includes(q) || iso.desc.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Instaladores", href: "/instaladores" }, { label: "Windows" }]} center />
        <h1 className="text-3xl font-bold tracking-tight">Instaladores Windows</h1>
        <p className="text-muted-foreground mt-2">
          Descarga los instaladores oficiales de Windows directamente desde Microsoft ({filtered.length} disponible{filtered.length !== 1 ? "s" : ""}).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="lg:sticky lg:top-24 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
                aria-label="Buscar instaladores Windows"
              />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Versiones
              </p>
              {isos.map((iso) => (
                <a
                  key={iso.name}
                  href={iso.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Monitor className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{iso.name}</span>
                  <Download className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium mb-1 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  Nota
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Los enlaces redirigen a los servidores oficiales de Microsoft. Necesitas una licencia válida para activar Windows.
                </p>
              </div>
            </div>
          </nav>
        </aside>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium">Sin resultados</p>
              <p className="text-sm text-muted-foreground">No encontramos nada para &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((iso) => (
                <a key={iso.name} href={iso.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Monitor className="h-5 w-5 text-primary shrink-0" />
                          {iso.name}
                        </CardTitle>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      </div>
                      <CardDescription className="text-sm mt-1">{iso.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="gap-1">
                        <Download className="h-3 w-3" />
                        ISO
                      </Badge>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
