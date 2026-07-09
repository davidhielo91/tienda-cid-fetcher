"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Mail, Clock, ExternalLink, ArrowRight } from "lucide-react";
import { telegramUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

const channels = [
  {
    icon: MessageCircle,
    title: "Telegram",
    description: "El canal más rápido. Respondemos en minutos.",
    value: TELEGRAM_HANDLE,
    href: telegramUrl(),
    cta: "Abrir Telegram",
    primary: true,
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    description: "Para consultas que no son urgentes.",
    value: "contacto@cidfetcher.de",
    href: "mailto:contacto@cidfetcher.de",
    cta: "Enviar correo",
    primary: false,
  },
];

export function ContactoClient() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} center />
      <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />

      <div className="text-center mb-12 mt-2">
        <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-2">
          Elegí el canal que preferís. Nuestro equipo te responde rápido.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {channels.map((ch) => (
          <Card key={ch.title} className={ch.primary ? "border-primary/40 shadow-sm" : ""}>
            <CardHeader className="flex flex-row items-start gap-4 pb-3">
              <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                <ch.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base">{ch.title}</CardTitle>
                <CardDescription className="text-sm mt-0.5">{ch.description}</CardDescription>
                <p className="text-xs text-muted-foreground mt-1">{ch.value}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <a href={ch.href} target="_blank" rel="noopener noreferrer" aria-label={`${ch.cta} (se abre en nueva ventana)`}>
                <Button
                  variant={ch.primary ? "default" : "outline"}
                  className="gap-2"
                  size="sm"
                >
                  {ch.cta}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>Lunes a Sábado, 9:00 – 18:00 — Respondemos en menos de 1 hora</span>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-2">
          ¿Tenés dudas antes de comprar?{" "}
          <Link href="/faq" className="text-primary hover:underline inline-flex items-center gap-1">
            Revisá las preguntas frecuentes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
