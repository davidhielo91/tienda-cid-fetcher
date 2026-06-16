"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, MessageCircle, Clock, Send, ExternalLink, CheckCircle } from "lucide-react";
import { telegramUrl, TELEGRAM_HANDLE } from "@/lib/telegram";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

const contactInfo = [
  { icon: Mail, label: "Email", value: "contacto@cidfetcher.de", href: "mailto:contacto@cidfetcher.de" },
  { icon: MessageCircle, label: "Telegram", value: TELEGRAM_HANDLE, href: telegramUrl() },
  { icon: Clock, label: "Horario", value: "Lun - Sáb, 9:00 - 18:00 — Respondemos en menos de 1 hora" },
];

type FormData = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(form: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!form.name.trim()) errs.name = "El nombre es obligatorio";
  if (!form.email.trim()) {
    errs.email = "El correo es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Correo electrónico inválido";
  }
  if (!form.message.trim()) errs.message = "El mensaje es obligatorio";
  return errs;
}

const emptyForm: FormData = { name: "", email: "", type: "", message: "" };

export function ContactoClient() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const next = { ...errors };
      delete next[field];
      setErrors(next);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Corrige los errores antes de enviar");
      return;
    }
    setSubmitting(true);

    const msg = `📬 *Nuevo mensaje desde la web*\n\n*Nombre:* ${form.name}\n*Email:* ${form.email}\n*Tipo:* ${form.type || "General"}\n*Mensaje:* ${form.message}\n\n— Enviado desde contacto`;
    window.open(telegramUrl(msg), "_blank");

    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center space-y-6 py-16">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold">¡Mensaje enviado!</h1>
          <div className="space-y-2 text-muted-foreground">
            <p>Se abrió Telegram con tu mensaje listo para enviar.</p>
            <p className="text-sm">Si no se abrió automáticamente, haz clic abajo.</p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <a href={telegramUrl()} target="_blank" rel="noopener noreferrer" aria-label="Abrir Telegram (se abre en nueva ventana)">
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Abrir Telegram
              </Button>
            </a>
            <Button variant="outline" className="w-full" onClick={() => { setSent(false); setForm(emptyForm); }}>
              Enviar otro mensaje
            </Button>
            <Link href="/">
              <Button variant="ghost" className="w-full">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} center />
      <BreadcrumbSchema items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
      <div className="text-center mb-12 mt-2">
        <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Elige el canal que prefieras o envíanos un
          mensaje directo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Todos los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nombre <span className="text-destructive" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => {
                        const fieldErrors = validate(form);
                        if (fieldErrors.name) setErrors((prev) => ({ ...prev, name: fieldErrors.name }));
                      }}
                      required
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => {
                        const fieldErrors = validate(form);
                        if (fieldErrors.email) setErrors((prev) => ({ ...prev, email: fieldErrors.email }));
                      }}
                      required
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de mensaje</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => handleChange("type", v ?? "")}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="soporte">Soporte</SelectItem>
                      <SelectItem value="mayorista">Mayorista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Mensaje <span className="text-destructive" aria-hidden="true">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => {
                      const fieldErrors = validate(form);
                      if (fieldErrors.message) setErrors((prev) => ({ ...prev, message: fieldErrors.message }));
                    }}
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={submitting} className="gap-2">
                  <Send className="h-4 w-4" />
                  {submitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  ¿Tienes dudas? Revisa nuestras{" "}
                  <Link href="/faq" className="text-primary hover:underline">
                    preguntas frecuentes →
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {contactInfo.map((item) => (
            <Card key={item.label}>
              <CardHeader className="flex flex-row items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                    >
                      {item.value}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    <CardDescription className="text-xs mt-0.5">{item.value}</CardDescription>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
