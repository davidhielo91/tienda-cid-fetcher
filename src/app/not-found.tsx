import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import { telegramUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Página no encontrada - Tienda CID Fetcher",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          <Link href="/licencias">
            <Button variant="outline">Ver catálogo</Button>
          </Link>
        </div>
        <div className="pt-4">
          <a href={telegramUrl()} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ¿Crees que es un error? Reportarlo por Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
