import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { telegramUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { PRICE_TIERS, getTierLabel } from "@/lib/pricing";
import { Send, ChevronDown, Package, CreditCard, Bot, Shield, Clock, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Tienda CID Fetcher",
  description: "Resuelve todas tus dudas sobre licencias Microsoft originales, activación telefónica, Bot CID Fetcher, métodos de pago USDT y MXN, garantía de 7 días y precios por volumen.",
  alternates: {
    canonical: "https://cidfetcher.de/faq",
  },
};

const pricingText = PRICE_TIERS.map((t) => `• ${getTierLabel(t.min, t.max)}: $${t.price} USDT c/u`).join("\n");

const sections = [
  {
    id: "productos",
    icon: Package,
    label: "Productos y Licencias",
    items: [
      {
        q: "¿Qué tipo de licencias venden?",
        a: "Vendemos licencias originales de Microsoft: Windows 11, Windows 10, Office 2021/2024, Windows Server, Visio y Project. Todas son licencias de activación telefónica originales.",
      },
      {
        q: "¿Las licencias son originales?",
        a: "Sí, 100% originales. Son licencias de activación telefónica de Microsoft, con soporte multi-idioma y actualizaciones incluidas.",
      },
      {
        q: "¿Cuánto tiempo dura la licencia?",
        a: "Son licencias perpetuas. La activación es permanente y no expira.",
      },
      {
        q: "Si compro 1–29 unidades, ¿tengo acceso al Bot CID Fetcher?",
        a: "No. El Bot CID Fetcher está incluido gratis a partir de 30 unidades. Para compras de 1 a 29 unidades, la activación es asistida por Telegram: tú nos envías foto de los números de la licencia y nosotros realizamos la activación por ti. El proceso sigue siendo rápido, solo que no es automático.",
      },
    ],
  },
  {
    id: "pagos",
    icon: CreditCard,
    label: "Pagos",
    items: [
      {
        q: "¿Cómo puedo pagar?",
        a: "Dependiendo de tu ubicación:\n\n🌎 **Fuera de México** — Pago en USDT por Binance (transferencia directa).\n\n🇲🇽 **Clientes de México** — También aceptamos:\n• Transferencia Banamex\n• Transferencia Banorte\n• Transferencia Albo\n• Depósito en efectivo en OXXO\n\nLos precios están en USDT pero podemos cotizarte el equivalente en MXN al tipo de cambio del día. Escríbenos por Telegram para coordinar el pago.",
      },
      {
        q: "¿Hay precio por volumen?",
        a: `Sí. Mientras más licencias compras, más ahorras. Los precios son:\n\n${pricingText}\n\nLos descuentos se aplican automáticamente según la cantidad.`,
      },
      {
        q: "¿Puedo pagar en MXN?",
        a: "Sí. Aceptamos MXN por transferencia Banamex, Banorte, Albo o depósito en OXXO. El equivalente en pesos se calcula al tipo de cambio del día. Escríbenos por Telegram para coordinar. Para pagos fuera de México, aceptamos USDT por Binance.",
      },
    ],
  },
  {
    id: "bot",
    icon: Bot,
    label: "Bot CID Fetcher",
    items: [
      {
        q: "¿Qué es el Bot CID Fetcher?",
        a: "Es una herramienta automatizada que obtiene los datos de activación de tus licencias al instante, sin necesidad de llamar a Microsoft. Está incluido GRATIS con cada compra a partir de 30 unidades.",
      },
      {
        q: "¿El bot tiene costo adicional?",
        a: "No. El Bot CID Fetcher es completamente gratis con la compra de tus licencias a partir de 30 unidades. No hay cuotas mensuales ni costos ocultos.",
      },
      {
        q: "¿Cómo accedo al bot?",
        a: `Una vez que realizas tu compra, te agregamos a nuestro grupo de Telegram donde está disponible el bot. También puedes adquirir una versión del bot para tu propio grupo (consulta precios por Telegram).`,
      },
      {
        q: "¿Puedo usar el bot sin comprar licencias?",
        a: "Sí, ofrecemos consultas individuales a $0.50 USDT por consulta, o puedes adquirir el bot para tu propio grupo por $45 USDT con saldo incluido.",
      },
    ],
  },
  {
    id: "activacion",
    icon: Shield,
    label: "Activación",
    items: [
      {
        q: "¿Qué significa 'activación telefónica'?",
        a: "Son licencias que originalmente se activan llamando a Microsoft. Nosotros agilizamos ese proceso: si compras 30+ unidades el Bot CID Fetcher lo hace automático. Si son 1–29, te asistimos por Telegram de forma manual. En ambos casos recibes tu activación sin llamar a Microsoft.",
      },
      {
        q: "¿Cuánto tarda la activación?",
        a: "Con nuestro Bot CID Fetcher el proceso es inmediato. Sin el bot, el proceso tradicional puede tardar de 10 a 30 minutos por llamada telefónica con Microsoft.",
      },
      {
        q: "¿Necesito llamar a Microsoft?",
        a: "No. Para eso está nuestro Bot CID Fetcher: automatizamos todo el proceso para que no tengas que llamar. Recibes tu activación directo por Telegram.",
      },
      {
        q: "¿Qué recibo después de comprar?",
        a: "Recibirás una clave de producto de 25 caracteres con formato XXXXX-XXXXX-XXXXX-XXXXX-XXXXX. La clave requiere activación: si compras 30+ unidades el Bot CID Fetcher la activa al instante sin llamar a Microsoft. Si son 1–29, te asistimos por Telegram para completar la activación.",
      },
    ],
  },
  {
    id: "licencias-tipos",
    icon: Info,
    label: "Tipos de Licencia",
    items: [
      {
        q: "¿Qué es una licencia OEM?",
        a: "OEM (Original Equipment Manufacturer) es una licencia que viene preinstalada en equipos nuevos. Está vinculada a la placa madre del equipo donde se activa por primera vez. No se puede transferir a otro equipo. Es más económica que una licencia Retail.",
      },
      {
        q: "¿Qué es una licencia Retail?",
        a: "Una licencia Retail es una licencia de compra directa que puedes transferir a otro equipo si la desinstalas del anterior. Es más flexible que una OEM pero tiene un costo más elevado. Las licencias que vendemos en Tienda CID Fetcher son de tipo Retail.",
      },
      {
        q: "¿Qué es una licencia ESD?",
        a: "ESD (Electronic Software Delivery) es una licencia digital que se entrega por correo electrónico, sin caja física ni CD. Es exactamente la misma licencia que la versión Retail, solo que el método de entrega es electrónico. Las licencias que comercializamos son ESD.",
      },
      {
        q: "¿Diferencia entre licencia OEM y Retail?",
        a: "La principal diferencia es la transferibilidad: una licencia OEM está atada a la placa madre y no puede moverse a otro PC. Una Retail puede desinstalarse e instalarse en otro equipo. Las Retail también incluyen soporte directo de Microsoft, mientras que las OEM son soportadas por el fabricante del equipo.",
      },
      {
        q: "¿Qué significa licencia de activación telefónica?",
        a: "Son licencias originales que requieren una llamada telefónica a Microsoft para completar la activación. Nosotros automatizamos ese proceso con nuestro Bot CID Fetcher para que recibas tu activación al instante, sin llamar ni esperar.",
      },
    ],
  },
  {
    id: "entregas",
    icon: Clock,
    label: "Entregas y Soporte",
    items: [
      {
        q: "¿Cuánto tarda la entrega?",
        a: "Una vez recibido tu pago y validado, la entrega es inmediata. Si son 30+ unidades la activación es automática vía Bot CID Fetcher. Si son 1–29 unidades te asistimos por Telegram de forma manual. En ambos casos el proceso toma menos de 10 minutos.",
      },
      {
        q: "¿Tienen soporte?",
        a: `Sí, soporte 24/7 vía Telegram. Escríbenos a ${TELEGRAM_HANDLE} y te atenderemos a la brevedad.`,
      },
      {
        q: "¿Cómo compro?",
        a: "1. Agrega los productos al carrito\n2. Haz clic en 'Pagar por Telegram'\n3. Te llegará un mensaje con tu pedido\n4. Te responderemos para coordinar el pago\n5. Recibes tu activación al instante",
      },
      {
        q: "¿Puedo revender las licencias?",
        a: "Sí. De hecho, ese es nuestro mercado principal. Compra por volumen a precio mayorista y revende con tu margen. El Bot CID Fetcher te ayuda a automatizar la entrega a tus propios clientes.",
      },
      {
        q: "¿Qué garantía tienen las licencias?",
        a: "Ofrecemos 7 días de garantía desde la compra. La activación debe realizarse dentro de los 7 días posteriores a la compra. Si la licencia no funciona dentro de ese plazo, avísanos por Telegram y te la cambiamos sin costo.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Preguntas Frecuentes" }]} center />
      <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Preguntas Frecuentes" }]} />

      <div className="text-center mt-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Preguntas Frecuentes</h1>
        <p className="text-muted-foreground mt-1">
          Respuestas directas sobre licencias, activación, pagos y el Bot CID Fetcher
        </p>
      </div>

      <div className="space-y-12 max-w-3xl mx-auto">
          {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <sec.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{sec.label}</h2>
                </div>

                <div className="space-y-0 divide-y rounded-xl border">
                  {sec.items.map((item) => (
                    <details key={item.q} className="group">
                      <summary className="flex items-start gap-3 cursor-pointer px-5 py-4 text-sm font-medium list-none [&::-webkit-details-marker]:hover:bg-muted/50 transition-colors">
                        <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" />
                        <span>{item.q}</span>
                      </summary>
                      <div className="px-5 pb-5 pl-11 text-sm text-muted-foreground/80 whitespace-pre-line leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
          ))}
      </div>

      <div className="mt-16 text-center p-8 rounded-xl bg-muted/30 border max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">¿Tu duda no está aquí?</h2>
        <p className="text-muted-foreground mb-6">
          Escríbenos por Telegram. Una persona real te responde — sin bots, sin formularios.
        </p>
        <a href={telegramUrl()} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            Escribir por Telegram
          </Button>
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: sections.flatMap((sec) =>
              sec.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Preguntas frecuentes sobre licencias Microsoft y Bot CID Fetcher",
            description: "Resuelve tus dudas sobre licencias Windows, Office, activación telefónica, métodos de pago y el Bot CID Fetcher.",
            url: "https://cidfetcher.de/faq",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Preguntas Frecuentes - Tienda CID Fetcher",
            url: "https://cidfetcher.de/faq",
            dateModified: "2026-06-16",
            speakable: {
              "@type": "SpeakableSpecification",
              xpath: [
                "/html/body//h1",
                "/html/body//h2",
                "/html/body//details/summary/span",
              ],
            },
          }),
        }}
      />
    </div>
  );
}
