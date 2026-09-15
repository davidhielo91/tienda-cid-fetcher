import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { telegramUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Tienda CID Fetcher",
  description: "Términos y condiciones de compra, política de privacidad y garantía de 7 días para licencias de software Microsoft originales. Información sobre pagos, entregas y devoluciones.",
  alternates: {
    canonical: "https://cidfetcher.de/terminos",
  },
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Términos y Condiciones" }]} center />

      <h1 className="text-3xl font-bold tracking-tight mt-2 mb-8">Términos y Condiciones</h1>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Información General</h2>
          <p>
            Tienda CID Fetcher es una plataforma de venta de licencias de software originales de Microsoft.
            Todas las licencias comercializadas son de activación telefónica originales, adquiridas a través
            de canales autorizados.
          </p>
          <p className="mt-2">
            Al realizar una compra en nuestra plataforma, el cliente acepta los presentes términos y condiciones.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Productos</h2>
          <p>
            Comercializamos licencias de activación telefónica originales de Microsoft para los siguientes productos:
            Windows 11, Windows 10, Office 2013/2016/2019/2021/2024, Windows Server, Visio y Project.
          </p>
          <p className="mt-2">
            Las licencias son perpetuas, no requieren suscripción mensual (excepto Office 365, del cual solo
            ofrecemos el instalador, no la licencia). La activación es permanente y no expira.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Precios y Pagos</h2>
          <p>
            Todos los precios están expresados en USDT (Tether). Aceptamos pagos por:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>USDT por Binance (transferencia directa)</li>
            <li>Transferencia Banamex, Banorte o Albo (clientes México)</li>
            <li>Depósito en efectivo en OXXO (clientes México)</li>
          </ul>
          <p className="mt-2">
            Los precios están sujetos a descuentos por volumen según la tabla de precios publicada en el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Entrega</h2>
          <p>
            Una vez recibido y validado el pago, se entrega una clave de producto de 25 caracteres
            (formato: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX) lista para activar el software.
          </p>
          <p className="mt-2">
            La entrega se realiza a través de Telegram. Para compras de 30+ unidades, la activación
            es automatizada vía Bot CID Fetcher. Para compras de 1 a 29 unidades, se brinda asistencia
            manual por Telegram.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Garantía</h2>
          <p>
            Ofrecemos 7 días de garantía desde la fecha de compra. La activación debe realizarse dentro
            de los 7 días posteriores a la compra para que aplique la garantía.
          </p>
          <p className="mt-2">
            Si la licencia no funciona dentro de ese plazo, el cliente debe notificarlo por Telegram
            y procederemos al cambio sin costo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Devoluciones</h2>
          <p>
            No se realizan reembolsos una vez entregada la licencia, a menos que la licencia presentefallas
            técnicas y no sea posible realizar un cambio dentro del período de garantía.
          </p>
          <p className="mt-2">
            El reemplazo de la licencia es la solución primaria ante cualquier inconveniente de activación.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Privacidad</h2>
          <p>
            En Tienda CID Fetcher respetamos tu privacidad. La información proporcionada por el cliente
            (nombre, correo electrónico, número de teléfono) se utiliza únicamente para procesar y
            dar seguimiento a los pedidos.
          </p>
          <p className="mt-2">
            No compartimos información personal con terceros. Los datos de contacto se almacenan de forma
            segura y solo se utilizan para comunicación relacionada con la compra.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Soporte</h2>
          <p>
            El soporte técnico se brinda exclusivamente por Telegram, 24/7. Ante cualquier duda o
            problema con tu licencia, contáctanos.
          </p>
          <div className="mt-3">
            <a
              href={telegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Contactar soporte por Telegram →
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
            Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
          </p>
        </section>
      </div>
    </div>
  );
}
