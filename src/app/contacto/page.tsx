import type { Metadata } from "next";
import { ContactoClient } from "./contacto-client";

export const metadata: Metadata = {
  title: "Contacto - Tienda CID Fetcher",
  description: "Contáctanos por Telegram o correo. Respondemos en minutos. Soporte 24/7 para licencias Microsoft Windows, Office, Server y Bot CID Fetcher.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}
