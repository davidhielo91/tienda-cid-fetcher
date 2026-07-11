import type { Metadata } from "next";
import { OfficeClient } from "./office-client";

export const metadata: Metadata = {
  title: "Descargar Office 2024 ISO - Office 2021, 2019, 2016, 2013 | Tienda CID Fetcher",
  description: "Descarga ISO oficial de Microsoft Office 2024 Professional Plus, Office 2021, 2019, 2016 y 2013. Enlaces directos al CDN de Microsoft en español e inglés.",
  alternates: {
    canonical: "https://cidfetcher.de/instaladores/office",
  },
};

export default function InstaladoresOfficePage() {
  return <OfficeClient />;
}
