import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  verification: {
    google: "1z2sRzjjuEu9tKDBOAoU82jT7UMKGFF7-ufyStZeUoY",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  title: "Tienda CID Fetcher - Licencias de Software Originales",
  description:
    "Licencias originales Microsoft Windows, Office, Server, Visio y Project. Activación telefónica. Bot CID Fetcher gratis incluido. Pagos en USDT y MXN. Desde $2.50 USDT — hasta 80% de descuento por volumen.",
  metadataBase: new URL("https://cidfetcher.de"),
  alternates: {
    canonical: "https://cidfetcher.de",
  },
  openGraph: {
    title: "Tienda CID Fetcher - Licencias de Software Originales",
    description: "Licencias originales Windows, Office, Server. Bot CID Fetcher gratis incluido. Precios por volumen.",
    siteName: "Tienda CID Fetcher",
    locale: "es_MX",
    type: "website",
    url: "https://cidfetcher.de",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda CID Fetcher - Licencias de Software Originales",
    description: "Licencias originales Windows, Office, Server. Bot CID Fetcher gratis incluido.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${interSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tienda CID Fetcher",
              url: "https://cidfetcher.de",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://cidfetcher.de/licencias?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://cidfetcher.de/#organization",
              name: "Tienda CID Fetcher",
              url: "https://cidfetcher.de",
              logo: {
                "@type": "ImageObject",
                url: "https://cidfetcher.de/favicon.svg",
              },
              description: "Venta de licencias originales Microsoft. Bot CID Fetcher incluido.",
              areaServed: "MX",
              sameAs: ["https://t.me/rootkit_spoofer"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://t.me/rootkit_spoofer",
              },
            }),
          }}
        />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-lg focus:outline-2 focus:outline-primary"
          >
            Saltar al contenido principal
          </a>
          <Header />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-WNFWDCB3GQ" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WNFWDCB3GQ');`}
          </Script>
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
