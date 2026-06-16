import Link from "next/link";
import { telegramUrl, TELEGRAM_HANDLE } from "@/lib/telegram";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Tienda CID Fetcher</h3>
            <p className="text-sm text-muted-foreground/80">
              Licencias de software originales para empresas y profesionales.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Productos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/licencias/windows" className="hover:text-primary">Windows</Link></li>
              <li><Link href="/licencias/office" className="hover:text-primary">Office</Link></li>
              <li><Link href="/licencias/windows-server" className="hover:text-primary">Windows Server</Link></li>
              <li><Link href="/licencias/visio" className="hover:text-primary">Visio</Link></li>
              <li><Link href="/licencias/project" className="hover:text-primary">Project</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/instaladores" className="hover:text-primary">Instaladores</Link></li>
              <li><Link href="/bot-cid-fetcher" className="hover:text-primary">Bot CID Fetcher</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-primary">Sobre nosotros</Link></li>
              <li><Link href="/terminos" className="hover:text-primary">Términos y privacidad</Link></li>
              <li><Link href="/contacto" className="hover:text-primary">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Métodos de pago</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>USDT — Binance</li>
              <li>Transferencia Banamex</li>
              <li>Transferencia Banorte</li>
              <li>Transferencia Albo</li>
              <li>Depósito OXXO</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contacto@cidfetcher.de" className="hover:text-primary transition-colors">
                  contacto@cidfetcher.de
                </a>
              </li>
              <li>
                <a href={telegramUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Telegram: {TELEGRAM_HANDLE}
                </a>
              </li>
              <li>Soporte: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tienda CID Fetcher. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
