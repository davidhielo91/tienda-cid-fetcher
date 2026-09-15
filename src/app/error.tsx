"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Send } from "lucide-react";
import { telegramUrl } from "@/lib/telegram";

export default function RootError({
  reset,
}: {
  reset: () => void;
}) {
  useEffect(() => {
    document.title = "Error - Tienda CID Fetcher";
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">Algo salió mal</h1>
        <p className="text-muted-foreground">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Intentar de nuevo
        </Button>
        <div className="pt-4">
          <a href={telegramUrl()} target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="gap-2">
              <Send className="h-4 w-4" />
              Contactar soporte por Telegram
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
