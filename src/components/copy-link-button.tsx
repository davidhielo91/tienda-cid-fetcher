"use client";

import { toast } from "sonner";

export function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(url);
        toast.success("Enlace copiado al portapapeles");
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
      aria-label="Copiar enlace"
    >
      Copiar enlace
    </button>
  );
}
