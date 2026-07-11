import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PRICE_TIERS, getTierLabel, BASE_PRICE_USDT } from "@/lib/pricing";
import { telegramUrl } from "@/lib/telegram";
import {
  Bot,
  Zap,
  Globe,
  BarChart3,
  HeadphonesIcon,
  CheckCircle2,
  ShoppingCart,
  Send,
  Gift,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bot CID Fetcher - Automatiza tu Activación - Tienda CID Fetcher",
  description: "Bot CID Fetcher: automatiza la activación de licencias Microsoft. Incluido gratis con compras de 30+ unidades. Consulta individual desde $0.50 USDT.",
  alternates: {
    canonical: "https://cidfetcher.de/bot-cid-fetcher",
  },
};

const tier1 = PRICE_TIERS[0];
const tier2 = PRICE_TIERS[1];
const savings2 = Math.round((1 - tier2.price / BASE_PRICE_USDT) * 100);

const licenciaPlanes = [
  {
    name: "1 a 29 unidades",
    subtitle: "Soporte manual incluido",
    icon: ShoppingCart,
    price: `$${tier1.price}`,
    priceLabel: "USDT por unidad",
    savings: null,
    features: [
      "Activación asistida por Telegram (manual)",
      "Tú envías los números y nosotros activamos",
      "Soporte 24/7 vía Telegram",
      "Sin mínimo de compra",
    ],
    cta: "Comprar ahora",
    href: "/licencias",
    highlight: false,
  },
  {
    name: "30 unidades o más",
    subtitle: "Bot CID Fetcher gratis",
    icon: Rocket,
    price: `Desde $${tier2.price}`,
    priceLabel: "USDT por unidad",
    savings: savings2,
    features: [
      "Bot CID Fetcher incluido completamente gratis",
      "Acceso al grupo de Telegram con el bot",
      "Consultas ilimitadas sin costo adicional",
      "Soporte prioritario 24/7",
    ],
    cta: "Comprar licencias",
    href: "/licencias",
    highlight: true,
  },
];

const botPlanes = [
  {
    name: "Bot Propio",
    subtitle: "Para tu grupo de Telegram",
    icon: Bot,
    badge: "Recomendado",
    badgeVariant: "secondary" as const,
    price: "45 USDT",
    priceLabel: "Pago único",
    highlight: true,
    features: [
      "Bot instalado en tu propio grupo de Telegram",
      "5 USDT de saldo inicial (~100 consultas)",
      "Recargas disponibles ($10, $20, $50)",
      "Administras tú los usuarios",
      "$0.05 USDT por consulta con recarga",
    ],
    extra: "Recargas: $10 = 200 consultas · $20 = 400 consultas · $50 = 1000 consultas",
    cta: "Comprar Bot",
  },
  {
    name: "Por Consulta",
    subtitle: "Sin compromiso",
    icon: Zap,
    badge: "Pago por uso",
    badgeVariant: "outline" as const,
    price: "$0.50",
    priceLabel: "USDT por consulta",
    highlight: false,
    features: [
      "Sin registro ni contrato",
      "Paga solo cuando lo necesites",
      "Sin mínimo de compra",
      "Vía Telegram, respuesta rápida",
      "5+ consultas: $0.30 USDT c/u",
    ],
    extra: null,
    cta: "Solicitar consulta",
  },
];

const botFeatures = [
  {
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    stat: "< 30 segundos",
    title: "Activación automática",
    desc: "Obtén el CID al instante sin intervención manual. Sin esperas, sin llamadas a Microsoft.",
  },
  {
    icon: BarChart3,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    stat: "Paralelo",
    title: "Lotes sin límite",
    desc: "Procesa múltiples activaciones en paralelo — ideal para revendedores con alto volumen.",
  },
  {
    icon: Globe,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    stat: "Sin cortes",
    title: "Estable y sin bloqueos",
    desc: "Rotación de proxies integrada. El bot mantiene conexión estable sin interrupciones.",
  },
  {
    icon: Bot,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    stat: "Desde Telegram",
    title: "Control en tiempo real",
    desc: "Monitorea cada activación directo en Telegram, sin instalar nada adicional.",
  },
];

const telegramContactUrl = telegramUrl("🔥 Quiero el Bot CID Fetcher. Vengo de la web. ¿Qué opción me recomiendas?");

export default function BotCIDFetcherPage() {
  return (
    <div>
      {/* Breadcrumbs — fuera del hero para correcta orientación */}
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Bot CID Fetcher" }]} />
        <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Bot CID Fetcher" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-[0.04]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-5 text-sm px-4 py-1.5 gap-1.5">
              <Gift className="h-4 w-4" />
              Incluido gratis con 30+ licencias
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Bot CID Fetcher
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Activa licencias Microsoft sin llamar — en segundos
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Compra 30+ licencias y el bot activa todo al instante, sin intervención manual.
              ¿Solo necesitas el bot? Desde <strong>$0.50 USDT</strong> por consulta o bot propio por <strong>$45 USDT</strong>.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 md:gap-8 mb-10 max-w-sm md:max-w-none mx-auto">
              {[
                { value: "Gratis", label: "con 30+ licencias" },
                { value: "$0.50", label: "USDT / consulta" },
                { value: "$45", label: "pago único" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={telegramContactUrl} target="_blank" rel="noopener noreferrer" aria-label="Hablar por Telegram (se abre en nueva ventana)">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-lg shadow-primary/20">
                  <Send className="h-5 w-5" />
                  Hablar por Telegram
                </Button>
              </a>
              <Link href="/licencias">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8">
                  <ShoppingCart className="h-5 w-5" />
                  Ver licencias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Licencias — Paso 1 */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Paso 1</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Elige tu plan de licencias</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              El Bot CID Fetcher se incluye gratis a partir de 30 unidades — sin costo adicional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {licenciaPlanes.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-card overflow-hidden flex flex-col transition-[transform,box-shadow] duration-300 ${
                  plan.highlight
                    ? "shadow-xl ring-2 ring-primary/30 hover:shadow-2xl hover:-translate-y-1"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Banner superior — mismo alto en ambas tarjetas para alinear contenido */}
                {plan.highlight ? (
                  <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-2 tracking-wide">
                    MÁS POPULAR — BOT GRATIS INCLUIDO
                  </div>
                ) : (
                  <div className="py-2 bg-transparent" aria-hidden="true" />
                )}

                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${plan.highlight ? "bg-primary/10" : "bg-muted"}`}>
                      <plan.icon className={`h-5 w-5 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.priceLabel}</span>
                    </div>
                    {plan.savings && (
                      <span className="inline-block mt-1.5 text-xs font-semibold text-success bg-success/10 px-2.5 py-0.5 rounded-full">
                        -{plan.savings}% desde 30 unidades
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-success" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href}>
                    <Button className="w-full gap-2" variant={plan.highlight ? "default" : "outline"}>
                      <ShoppingCart className="h-4 w-4" />
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de precios por volumen */}
          <div className="max-w-md mx-auto mt-10 rounded-xl border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
              Precios por volumen
            </p>
            <div className="divide-y">
              {PRICE_TIERS.map((tier) => (
                <div key={tier.min} className="flex justify-between items-center text-sm py-2.5">
                  <span className="text-muted-foreground">{getTierLabel(tier.min, tier.max)}</span>
                  <span className="font-semibold">${tier.price} USDT</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Bot planes — Paso 2 */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Paso 2</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Solo el Bot CID Fetcher</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ¿No necesitas licencias? Adquiere el bot por separado o paga por consulta sin compromiso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {botPlanes.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border bg-card overflow-hidden flex flex-col transition-[transform,box-shadow] duration-300 ${
                  plan.highlight
                    ? "shadow-xl ring-2 ring-primary/30 hover:shadow-2xl hover:-translate-y-1"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {plan.highlight ? (
                  <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-2 tracking-wide">
                    RECOMENDADO
                  </div>
                ) : (
                  <div className="py-2 bg-transparent" aria-hidden="true" />
                )}

                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <Badge variant={plan.badgeVariant} className="mb-2 text-xs">{plan.badge}</Badge>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${plan.highlight ? "bg-primary/10" : "bg-muted"}`}>
                      <plan.icon className={`h-5 w-5 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.priceLabel}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-success" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.extra && (
                    <div className="bg-muted/60 rounded-lg p-3 mb-6 text-xs text-muted-foreground leading-relaxed">
                      {plan.extra}
                    </div>
                  )}

                  <a
                    href={telegramContactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                    aria-label={`${plan.cta} por Telegram (se abre en nueva ventana)`}
                  >
                    <Button className="w-full gap-2" variant={plan.highlight ? "default" : "outline"}>
                      <Send className="h-4 w-4" />
                      {plan.cta}
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-10 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-bold mb-3">Lo que el bot hace por ti</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Todas las funciones incluidas en cualquier plan — gratis o de pago
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {botFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border bg-card p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold text-primary mb-1">{f.stat}</p>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Tienes dudas antes de comprar?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Escríbenos por Telegram. Te decimos exactamente qué opción conviene según tu volumen — sin rodeos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={telegramContactUrl} target="_blank" rel="noopener noreferrer" aria-label="Hablar por Telegram (se abre en nueva ventana)" className="block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 shadow-lg shadow-primary/20">
                  <Send className="h-5 w-5" />
                  Hablar por Telegram
                </Button>
              </a>
              <Link href="/contacto" className="block w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <HeadphonesIcon className="h-5 w-5" />
                  Otras formas de contacto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Bot CID Fetcher",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Telegram",
            description: "Bot de activación automática de licencias Microsoft vía Telegram. Obtiene el CID sin llamar a Microsoft. Incluido gratis con compras de 30+ unidades.",
            url: "https://cidfetcher.de/bot-cid-fetcher",
            offers: [
              {
                "@type": "Offer",
                name: "Incluido gratis con 30+ licencias",
                price: "0",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Bot propio en tu grupo",
                price: "45",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Por consulta individual",
                price: "0.50",
                priceCurrency: "USD",
              },
            ],
            provider: {
              "@type": "Organization",
              name: "Tienda CID Fetcher",
              url: "https://cidfetcher.de",
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
            headline: "Bot CID Fetcher — activa licencias Microsoft sin llamar",
            description: "Automatiza la activación de licencias Microsoft con el Bot CID Fetcher. Incluido gratis con compras de 30+ unidades en Tienda CID Fetcher.",
            url: "https://cidfetcher.de/bot-cid-fetcher",
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
