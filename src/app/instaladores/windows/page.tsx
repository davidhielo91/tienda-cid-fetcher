import type { Metadata } from "next";
import { WindowsClient } from "./windows-client";

export const metadata: Metadata = {
  title: "Instaladores Windows 11 y 10 ISO Oficiales | Tienda CID Fetcher",
  description: "Descarga los instaladores oficiales de Windows 11 y Windows 10 directamente desde Microsoft. ISOs oficiales y Media Creation Tool para crear USB de instalación.",
  alternates: {
    canonical: "https://cidfetcher.de/instaladores/windows",
  },
};

export default function InstaladoresWindowsPage() {
  return <WindowsClient />;
}
