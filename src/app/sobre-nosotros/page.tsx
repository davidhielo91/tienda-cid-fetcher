import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { telegramUrl } from "@/lib/telegram";
import { Send, Package, Bot, Shield, Zap, Users, HeadphonesIcon, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Tienda CID Fetcher",
  description: "Tienda CID Fetcher: licencias originales Microsoft Windows, Office, Server, Visio y Project. Bot CID Fetcher gratis incluido. Activación inmediata sin llamar a Microsoft. Soporte 24/7.",
  alternates: {
    canonical: "https://cidfetcher.de/sobre-nosotros",
  },
};

const stats = [
  { icon: Package, value: "25", label: "Productos en catálogo" },
  { icon: Users, value: "500+", label: "Clientes satisfechos" },
  { icon: CheckCircle, value: "1000+", label: "Licencias entregadas" },
  { icon: HeadphonesIcon, value: "24/7", label: "Soporte incluido" },
];

const features = [
  {
    icon: Shield,
    title: "Licencias Originales",
    desc: "Todas nuestras licencias son de activación telefónica originales de Microsoft. 100% legales y permanentes.",
  },
  {
    icon: Bot,
    title: "Bot CID Fetcher Gratis",
    desc: "Incluido sin costo con cada compra. Automatiza la activación de tus licencias sin llamar a Microsoft.",
  },
  {
    icon: Zap,
    title: "Activación Inmediata",
    desc: "Olvídate de las llamadas telefónicas y las esperas. Con nuestro bot recibes tu activación al instante.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    desc: "Atención personalizada por Telegram. Resolvemos tus dudas y problemas al instante.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Sobre Nosotros" }]} center />
      <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Sobre Nosotros" }]} />

      <div className="max-w-3xl mx-auto mt-2">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Sobre Tienda CID Fetcher</h1>
          <p className="text-lg text-muted-foreground">
            Somos un equipo enfocado en distribuir licencias de software originales a precios accesibles,
            automatizando todo el proceso para que recibas tu activación al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-xl border bg-card shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground/80 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{f.title}</CardTitle>
                      <p className="text-sm text-muted-foreground/80 mt-1">{f.desc}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center p-8 rounded-xl bg-muted/30 border mb-8">
          <h2 className="text-xl font-bold mb-3">Nuestra Misión</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hacer que la activación de licencias de software sea rápida, sencilla y accesible para todos.
            Eliminamos las llamadas telefónicas a Microsoft y los procesos tediosos para que recibas
            tu licencia en minutos, no en horas.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-3">¿Hablamos?</h2>
          <p className="text-muted-foreground mb-6">
            Escríbenos por Telegram y te atenderemos personalmente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={telegramUrl()} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <Send className="h-4 w-4" />
                Contactar por Telegram
              </Button>
            </a>
            <Link href="/licencias">
              <Button variant="outline">Ver catálogo</Button>
            </Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Sobre Tienda CID Fetcher",
            url: "https://cidfetcher.de/sobre-nosotros",
            description: "Distribuidores de licencias originales Microsoft con activación automática vía Bot CID Fetcher. Más de 500 clientes y 1000+ licencias entregadas.",
            dateModified: "2026-06-16",
            about: {
              "@type": "Organization",
              name: "Tienda CID Fetcher",
              url: "https://cidfetcher.de",
              description: "Tienda online de licencias Microsoft originales para revendedores y técnicos. Bot CID Fetcher gratis con compras de 30+ unidades.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://t.me/rootkit_spoofer",
                availableLanguage: "Spanish",
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Sobre Tienda CID Fetcher — licencias Microsoft con activación automática",
            description: "Conoce a Tienda CID Fetcher: distribuidores de licencias originales Microsoft con Bot CID Fetcher incluido gratis.",
            url: "https://cidfetcher.de/sobre-nosotros",
            datePublished: "2025-01-01",
            dateModified: "2026-06-16",
            publisher: {
              "@type": "Organization",
              name: "Tienda CID Fetcher",
              url: "https://cidfetcher.de",
            },
          }),
        }}
      />
    </div>
  );
}
