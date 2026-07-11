import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, HeadphonesIcon, Bot, Download, Gift, ChevronDown, ChevronRight, ShoppingCart, Send } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { PRICE_TIERS, getTierLabel, BASE_PRICE_USDT } from "@/lib/pricing";
import { telegramUrl } from "@/lib/telegram";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Tienda CID Fetcher - Comprar Licencias Originales Microsoft",
  description: "Licencias originales Windows, Office, Server, Visio, Project. Bot CID Fetcher gratis incluido. Activación inmediata. Desde $2.50 USDT — hasta 80% de descuento por volumen.",
};

const faqItems = [
  {
    q: "¿Qué es una licencia de activación telefónica?",
    a: "Son licencias originales de Microsoft con clave de 25 caracteres. Normalmente requieren llamar a Microsoft para activarse — con el Bot CID Fetcher, eso es automático e inmediato.",
    href: "/faq#activacion",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: "Una vez confirmado el pago, la entrega es inmediata. 30+ unidades: el Bot activa solo. 1–29 unidades: te asistimos por Telegram. En ambos casos, menos de 10 minutos.",
    href: "/faq#entregas",
  },
  {
    q: "¿El Bot CID Fetcher tiene costo adicional?",
    a: "No. Con compras de 30 o más unidades el bot es completamente gratis — sin cuotas mensuales, sin costos ocultos. También está disponible por separado si no necesitas licencias.",
    href: "/faq#bot",
  },
];

const steps = [
  {
    icon: ShoppingCart,
    title: "Elige tus licencias",
    desc: "Navega el catálogo y agrega lo que necesitas. Windows, Office, Server y más — todos al mismo precio, sin importar el producto.",
  },
  {
    icon: Send,
    title: "Paga sin complicaciones",
    desc: "Tu carrito llega a Telegram. Paga en USDT (Binance) o MXN (transferencia/OXXO). Sin registros, sin sorpresas.",
  },
  {
    icon: Bot,
    title: "Activa sin llamar a Microsoft",
    desc: "30+ unidades: el Bot CID Fetcher activa todo al instante y solo. Menos de 30: te asistimos en Telegram. Listo en minutos.",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-[0.07]" />
        <div className="absolute inset-0 bg-glow-top" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-12 -right-24 w-80 h-80 rounded-full bg-accent-foreground/5 blur-3xl" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 gap-1.5 whitespace-normal sm:whitespace-nowrap max-w-[280px] sm:max-w-none">
                <Gift className="h-4 w-4 shrink-0" />
                Bot CID Fetcher gratis con compras de 30+ unidades
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-light tracking-tight mb-6 text-balance">
                Licencias Microsoft{" "}
                <span className="font-bold text-primary">para Revendedores</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Windows, Office, Server, Visio y Project — 100% originales. Desde <strong>$2.50 USDT</strong> por unidad, con descuentos por volumen hasta el 80%. El Bot CID Fetcher activa todo por ti, sin llamar a Microsoft.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/licencias">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all">
                    Ver licencias y precios
                  </Button>
                </Link>
                <a href={telegramUrl("¡Hola! Vengo de la web de Tienda CID Fetcher y quiero información sobre licencias.")} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 gap-2">
                    <Send className="h-4 w-4" />
                    Hablar con un asesor
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-muted/40 relative overflow-hidden">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Más unidades, menor precio por unidad</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                El precio baja automáticamente según cuántas unidades compras — aplica a cualquier combinación de productos.
              </p>
            </div>
            <div className="max-w-lg mx-auto rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th scope="col" className="text-left p-3 md:p-4 font-medium">Cantidad</th>
                    <th scope="col" className="text-right p-3 md:p-4 font-medium">Precio por unidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PRICE_TIERS.map((tier) => (
                    <tr key={tier.min} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 md:p-4">{getTierLabel(tier.min, tier.max)}</td>
                      <td className="p-3 md:p-4 text-right font-semibold">
                        ${tier.price} USDT
                        {tier.min > 1 && (
                          <span className="text-xs text-success font-medium ml-1">
                            -{Math.round((1 - tier.price / BASE_PRICE_USDT) * 100)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <Link href="/bot-cid-fetcher">
                <Button variant="link" className="gap-1">
                  Ver precios con totales incluyendo Bot <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <Separator className="max-w-[100px]" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Shield, title: "Licencias Originales", desc: "Número de serie de 25 dígitos, activación verificada por Microsoft. No son copias ni licencias de segunda mano." },
                { icon: Zap, title: "Tu clave en minutos", desc: "Desde que confirmas el pago hasta que tienes la clave lista: menos de 10 minutos." },
                { icon: HeadphonesIcon, title: "Soporte Real 24/7", desc: "Una persona real en Telegram, no un bot de respuestas. Respondemos en menos de 1 hora." },
                { icon: Bot, title: "Bot CID Fetcher Gratis", desc: "Activa en segundos sin llamar a Microsoft. Incluido sin costo con compras de 30+ unidades." },
              ].map((item) => (
                <div key={item.title} className="relative p-5 md:p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Productos más comprados</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Las licencias que eligen revendedores y técnicos en sistemas
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <FadeIn key={product.id} delay={100 + i * 50}>
                <Link href={`/producto/${product.slug}`}>
                  <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
                        <Badge variant="secondary" className="shrink-0 text-xs">{product.category}</Badge>
                      </div>
                      <CardDescription className="text-xs mt-0.5">Licencia original de activación telefónica</CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-1">
                      {product.stock > 0 ? (
                        <span className="font-bold">${Number(product.priceUSDT).toFixed(2)} <span className="text-xs text-muted-foreground">USDT</span></span>
                      ) : (
                        <span className="text-xs text-destructive font-medium">Sin stock</span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-10">
            <FadeIn delay={400}>
              <Link href="/licencias">
                <Button variant="outline" size="lg">Ver Todos los Productos</Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn delay={300}>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Lo que nos preguntan antes de comprar</h2>
              <div className="space-y-0 divide-y rounded-xl border">
                {faqItems.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex items-start gap-3 cursor-pointer px-5 py-4 text-sm font-medium list-none [&::-webkit-details-marker]:hover:bg-muted/50 transition-colors">
                      <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" />
                      <span>{item.q}</span>
                    </summary>
                    <div className="px-5 pb-4 pl-11 text-sm text-muted-foreground/80 whitespace-pre-line leading-relaxed">
                      {item.a}
                      <Link href={item.href} className="block mt-2 text-primary text-xs font-medium hover:underline">
                        Leer más →
                      </Link>
                    </div>
                  </details>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/faq">
                  <Button variant="link" className="gap-1">
                    Ver todas las preguntas frecuentes <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-dot opacity-[0.05]" />
        <div className="absolute inset-0 bg-glow-top opacity-60" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn delay={300}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">El bot que activa por ti — gratis con tu compra</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Olvídate de llamar a Microsoft. Con compras de 30+ unidades, el Bot CID Fetcher activa tus licencias al instante — sin costo adicional, sin límite de activaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bot-cid-fetcher">
                  <Button size="lg" className="gap-2 text-base px-8 shadow-lg shadow-primary/20">
                    <Bot className="h-5 w-5" />
                    Ver cómo funciona el Bot
                  </Button>
                </Link>
                <Link href="/licencias">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                    <Download className="h-5 w-5" />
                    Ver licencias disponibles
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo comprar licencias Microsoft en Tienda CID Fetcher",
            description: "Compra licencias originales Microsoft con activación automática en menos de 10 minutos.",
            totalTime: "PT10M",
            step: steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.desc,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Licencias Microsoft para Revendedores - Tienda CID Fetcher",
            url: "https://cidfetcher.de",
            dateModified: "2026-06-16",
            speakable: {
              "@type": "SpeakableSpecification",
              xpath: [
                "/html/body//h1",
                "/html/body//details/summary/span",
              ],
            },
          }),
        }}
      />
    </div>
  );
}
