"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto px-4 py-24 text-center space-y-4">
      <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
      <h1 className="text-2xl font-bold">Algo salió mal</h1>
      <p className="text-muted-foreground">Ocurrió un error al cargar esta página.</p>
      <Button onClick={reset} className="gap-2">
        <RefreshCw className="h-4 w-4" /> Reintentar
      </Button>
    </div>
  );
}
