"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FileText, Download, ExternalLink, Languages, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

type Installer = { name: string; desc: string; link: string; format?: string };
type Version = { version: string; items: Installer[] };

const esInstallers: Version[] = [
  { version: "Office 365", items: [{ name: "Office 365 ProPlus", desc: "ISO de instalación (no incluye licencia) — Descarga gratuita Microsoft", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/O365ProPlusRetail.img" }] },
  { version: "Office 2013", items: [
    { name: "Home & Business", desc: "Office 2013 Home & Business", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/es-es/HomeBusinessRetail.img" },
    { name: "Professional", desc: "Office 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/es-es/ProfessionalRetail.img" },
    { name: "Project Pro", desc: "Project 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/es-es/ProjectProRetail.img" },
    { name: "Visio Pro", desc: "Visio 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/es-es/VisioProRetail.img" },
  ]},
  { version: "Office 2016", items: [
    { name: "Home & Business", desc: "Office 2016 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/HomeBusinessRetail.img" },
    { name: "ProPlus", desc: "Office 2016 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProPlusRetail.img" },
    { name: "Project Pro", desc: "Project 2016 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProjectProRetail.img" },
    { name: "Visio Pro", desc: "Visio 2016 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/VisioProRetail.img" },
  ]},
  { version: "Office 2019", items: [
    { name: "Access", desc: "Access 2019", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/Access2019Retail.img" },
    { name: "Home & Business", desc: "Office 2019 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/HomeBusiness2019Retail.img" },
    { name: "ProPlus", desc: "Office 2019 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProPlus2019Retail.img" },
    { name: "Project Pro", desc: "Project 2019 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProjectPro2019Retail.img" },
    { name: "Visio Pro", desc: "Visio 2019 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/VisioPro2019Retail.img" },
  ]},
  { version: "Office 2021", items: [
    { name: "Home & Business", desc: "Office 2021 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/HomeBusiness2021Retail.img" },
    { name: "ProPlus", desc: "Office 2021 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProPlus2021Retail.img" },
    { name: "Project Pro", desc: "Project 2021 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/ProjectPro2021Retail.img" },
    { name: "Visio Pro", desc: "Visio 2021 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-es/VisioPro2021Retail.img" },
  ]},
  { version: "Office 2024", items: [
    { name: "ProPlus", desc: "Office 2024 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-ES/ProPlus2024Retail.img" },
    { name: "Project Pro", desc: "Project 2024 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-ES/ProjectPro2024Retail.img" },
    { name: "Visio Pro", desc: "Visio 2024 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/es-ES/VisioPro2024Retail.img" },
  ]},
  { version: "Office 2024 LTSC", items: [
    { name: "Office 2024 LTSC", desc: "Office 2024 LTSC Professional Plus x64 — Google Drive", link: "https://drive.google.com/file/d/1UvYCEMyhtNm07Lu8_ghvsxDQEW-82pIK/view?usp=sharing", format: ".zip" },
    { name: "Project Pro 2024 LTSC", desc: "Project Professional 2024 LTSC x64 — Google Drive", link: "https://drive.google.com/file/d/1KcIu3miWT_0CNlmCoQIIZvTNEoIO7lXI/view?usp=sharing", format: ".zip" },
    { name: "Visio Pro 2024 LTSC", desc: "Visio Professional 2024 LTSC x64 — Google Drive", link: "https://drive.google.com/file/d/1Lk0dQYAVQbFS51AssQntt1Pz_968j6AG/view?usp=sharing", format: ".zip" },
  ]},
];

const enInstallers: Version[] = [
  { version: "Office 365", items: [{ name: "Office 365 ProPlus", desc: "Installation ISO (license not included) — Free Microsoft download", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/O365ProPlusRetail.img" }] },
  { version: "Office 2013", items: [
    { name: "Home & Business", desc: "Office 2013 Home & Business", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/en-us/HomeBusinessRetail.img" },
    { name: "Professional", desc: "Office 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/en-us/ProfessionalRetail.img" },
    { name: "Project Pro", desc: "Project 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/en-us/ProjectProRetail.img" },
    { name: "Visio Pro", desc: "Visio 2013 Professional", link: "https://officecdn.microsoft.com/db/39168D7E-077B-48E7-872C-B232C3E72675/media/en-us/VisioProRetail.img" },
  ]},
  { version: "Office 2016", items: [
    { name: "Home & Business", desc: "Office 2016 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/HomeBusinessRetail.img" },
    { name: "ProPlus", desc: "Office 2016 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProPlusRetail.img" },
    { name: "Project Pro", desc: "Project 2016 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProjectProRetail.img" },
    { name: "Visio Pro", desc: "Visio 2016 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/VisioProRetail.img" },
  ]},
  { version: "Office 2019", items: [
    { name: "Access", desc: "Access 2019", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/Access2019Retail.img" },
    { name: "Home & Business", desc: "Office 2019 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/HomeBusiness2019Retail.img" },
    { name: "ProPlus", desc: "Office 2019 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProPlus2019Retail.img" },
    { name: "Project Pro", desc: "Project 2019 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProjectPro2019Retail.img" },
    { name: "Visio Pro", desc: "Visio 2019 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/VisioPro2019Retail.img" },
  ]},
  { version: "Office 2021", items: [
    { name: "Home & Business", desc: "Office 2021 Home & Business", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/HomeBusiness2021Retail.img" },
    { name: "ProPlus", desc: "Office 2021 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProPlus2021Retail.img" },
    { name: "Project Pro", desc: "Project 2021 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/ProjectPro2021Retail.img" },
    { name: "Visio Pro", desc: "Visio 2021 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-us/VisioPro2021Retail.img" },
  ]},
  { version: "Office 2024", items: [
    { name: "ProPlus", desc: "Office 2024 Professional Plus", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/ProPlus2024Retail.img" },
    { name: "Project Pro", desc: "Project 2024 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/ProjectPro2024Retail.img" },
    { name: "Visio Pro", desc: "Visio 2024 Professional", link: "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/VisioPro2024Retail.img" },
  ]},
  { version: "Office 2024 LTSC", items: [
    { name: "Office 2024 LTSC", desc: "Office 2024 LTSC Professional Plus x64 — Google Drive", link: "https://drive.google.com/file/d/1UvYCEMyhtNm07Lu8_ghvsxDQEW-82pIK/view?usp=sharing", format: ".zip" },
    { name: "Project Pro 2024 LTSC", desc: "Project Professional 2024 LTSC x64 — Google Drive", link: "https://drive.google.com/file/d/1KcIu3miWT_0CNlmCoQIIZvTNEoIO7lXI/view?usp=sharing", format: ".zip" },
    { name: "Visio Pro 2024 LTSC", desc: "Visio Professional 2024 LTSC x64 — Google Drive", link: "https://drive.google.com/file/d/1Lk0dQYAVQbFS51AssQntt1Pz_968j6AG/view?usp=sharing", format: ".zip" },
  ]},
];

export function OfficeClient() {
  const [lang, setLang] = useState("es");
  const [search, setSearch] = useState("");
  const [activeVersion, setActiveVersion] = useState<string | null>(null);

  const currentInstallers = lang === "es" ? esInstallers : enInstallers;
  const totalItems = currentInstallers.reduce((sum, v) => sum + v.items.length, 0);

  const filtered = useMemo(() => {
    if (!search.trim()) return currentInstallers;
    const q = search.toLowerCase();
    return currentInstallers
      .map((v) => ({
        ...v,
        items: v.items.filter(
          (item) => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
        ),
      }))
      .filter((v) => v.items.length > 0);
  }, [currentInstallers, search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Instaladores", href: "/instaladores" }, { label: "Office" }]} center />
        <h1 className="text-3xl font-bold tracking-tight">Instaladores Office</h1>
        <p className="text-muted-foreground mt-2">
          Descarga los instaladores oficiales de Microsoft Office ({totalItems} disponible{totalItems !== 1 ? "s" : ""}).
        </p>
      </div>

      <div className="flex mb-8">
        <Tabs value={lang} onValueChange={(v) => { setLang(v); setActiveVersion(null); }}>
          <TabsList>
            <TabsTrigger value="es" className="gap-2"><Languages className="h-4 w-4" /> Español</TabsTrigger>
            <TabsTrigger value="en" className="gap-2"><Languages className="h-4 w-4" /> English</TabsTrigger>
          </TabsList>
          <TabsContent value="es" />
          <TabsContent value="en" />
        </Tabs>
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
                aria-label="Buscar instaladores Office"
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Versiones ({totalItems})
              </p>
              {currentInstallers.map((v) => {
                const isActive = activeVersion === v.version;
                return (
                  <button
                    key={v.version}
                    type="button"
                    onClick={() => {
                      setActiveVersion(isActive ? null : v.version);
                      const el = document.getElementById(`v-${v.version}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-left transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{v.version}</span>
                    <Badge variant="secondary" className="shrink-0 text-xs px-1.5 py-0 h-5">
                      {v.items.length}
                    </Badge>
                    <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? "text-primary" : "text-muted-foreground/50"}`} />
                  </button>
                );
              })}
            </div>
            <div className="pt-4 border-t">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Archivos .img: haz doble clic para montarlos en Windows 8/10/11, o usa Rufus/7-Zip.
                </p>
              </div>
            </div>
          </nav>
        </aside>

        <div className="lg:col-span-3 space-y-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium mb-1">Sin resultados</p>
              <p className="text-sm text-muted-foreground">No encontramos nada para &quot;{search}&quot;</p>
            </div>
          ) : (
            filtered.map((version) => (
              <section key={version.version} id={`v-${version.version}`} className="scroll-mt-24">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {version.version}
                  <Badge variant="secondary" className="text-xs ml-1">{version.items.length}</Badge>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {version.items.map((item) => (
                    <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
                      <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between gap-1">
                            <CardTitle className="text-sm font-semibold">{item.name}</CardTitle>
                            <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-1">
                          <CardDescription className="text-xs">{item.desc}</CardDescription>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs gap-1">
                              <Download className="h-3 w-3" /> {item.format ?? ".img"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </section>
            ))
          )}
          <section className="p-6 rounded-xl bg-muted/30 border">
            <h3 className="font-semibold text-lg mb-2">Nota importante</h3>
            <p className="text-sm text-muted-foreground">
              La mayoría de los enlaces redirigen a los servidores oficiales de Microsoft CDN. Los instaladores de la categoría <strong>Office 2024 LTSC</strong> se alojan en Google Drive (.zip, x64). No almacenamos ni distribuimos archivos ISO propios. Necesitas una licencia válida para activar el software después de la instalación.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
