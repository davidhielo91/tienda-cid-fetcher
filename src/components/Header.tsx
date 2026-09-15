"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShoppingCart, Menu, Key, ChevronDown, AlertTriangle } from "lucide-react";

const categories = [
  { name: "Windows", href: "/licencias/windows" },
  { name: "Office", href: "/licencias/office" },
  { name: "Windows Server", href: "/licencias/windows-server" },
  { name: "Visio", href: "/licencias/visio" },
  { name: "Project", href: "/licencias/project" },
];

const instItems = [
  { name: "Windows", href: "/instaladores/windows" },
  { name: "Office", href: "/instaladores/office" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartStorageError, setCartStorageError] = useState(false);
  const [licDropdown, setLicDropdown] = useState(false);
  const [instDropdown, setInstDropdown] = useState(false);
  const pathname = usePathname();
  const licRef = useRef<HTMLDivElement>(null);
  const instRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (licRef.current && !licRef.current.contains(e.target as Node)) {
        setLicDropdown(false);
      }
      if (instRef.current && !instRef.current.contains(e.target as Node)) {
        setInstDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      try {
        const data = localStorage.getItem("cart");
        const cart = data ? JSON.parse(data) : [];
        setCartCount(cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0));
        setCartStorageError(false);
      } catch {
        setCartCount(0);
        setCartStorageError(true);
      }
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    const updateCartFromStorage = (event: StorageEvent) => {
      if (event.key === "cart" || event.key === null) updateCart();
    };
    window.addEventListener("storage", updateCartFromStorage);
    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCartFromStorage);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const navLinkClass = (href: string) =>
    `relative text-sm transition-colors py-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-sm ${
      isActive(href)
        ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-0.5 after:bg-primary after:rounded-full"
        : "text-muted-foreground/80 hover:text-primary"
    }`;

  const mobileLinkClass = (href: string) =>
    `text-lg transition-colors ${
      isActive(href)
        ? "font-semibold text-primary"
        : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl truncate">
          <Key className="h-6 w-6" />
          <span>Tienda CID Fetcher</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5" aria-label="Navegación principal">
          {/* Licencias dropdown */}
          <div
            ref={licRef}
            className="relative"
            onMouseEnter={() => setLicDropdown(true)}
            onMouseLeave={() => setLicDropdown(false)}
          >
            <button
              type="button"
              className={`${navLinkClass("/licencias")} inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0`}
              onClick={() => setLicDropdown((v) => !v)}
              aria-expanded={licDropdown}
              aria-haspopup="menu"
              aria-controls="licencias-menu"
            >
              Licencias
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${licDropdown ? "rotate-180" : ""}`} />
            </button>
            <div
              id="licencias-menu"
              role="menu"
              aria-label="Categorías de licencias"
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                licDropdown
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="rounded-xl border bg-popover shadow-lg p-1.5 min-w-[200px] space-y-0.5">
                <Link
                  href="/licencias"
                  role="menuitem"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setLicDropdown(false)}
                  tabIndex={licDropdown ? 0 : -1}
                >
                  Todas las licencias
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    role="menuitem"
                    className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive(cat.href)
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setLicDropdown(false)}
                    tabIndex={licDropdown ? 0 : -1}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Instaladores dropdown */}
          <div
            ref={instRef}
            className="relative"
            onMouseEnter={() => setInstDropdown(true)}
            onMouseLeave={() => setInstDropdown(false)}
          >
            <button
              type="button"
              className={`${navLinkClass("/instaladores")} inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0`}
              onClick={() => setInstDropdown((v) => !v)}
              aria-expanded={instDropdown}
              aria-haspopup="menu"
              aria-controls="instaladores-menu"
            >
              Instaladores
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${instDropdown ? "rotate-180" : ""}`} />
            </button>
            <div
              id="instaladores-menu"
              role="menu"
              aria-label="Categorías de instaladores"
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                instDropdown
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="rounded-xl border bg-popover shadow-lg p-1.5 min-w-[200px] space-y-0.5">
                <Link
                  href="/instaladores"
                  role="menuitem"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setInstDropdown(false)}
                  tabIndex={instDropdown ? 0 : -1}
                >
                  Todos los instaladores
                </Link>
                {instItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive(item.href)
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setInstDropdown(false)}
                    tabIndex={instDropdown ? 0 : -1}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/faq" className={navLinkClass("/faq")}>FAQ</Link>
          <Link href="/sobre-nosotros" className={navLinkClass("/sobre-nosotros")}>Sobre nosotros</Link>
          <Link href="/bot-cid-fetcher" className={navLinkClass("/bot-cid-fetcher")}>Bot CID Fetcher</Link>
          <Link href="/contacto" className={navLinkClass("/contacto")}>Contacto</Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Link href="/carrito" className="relative">
            <Button variant="ghost" size="icon" className="relative" aria-label="Carrito de compras">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartCount > 0 && (
              <Badge
                key={cartCount}
                className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold motion-safe:animate-scale-in"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </Link>
          {cartStorageError && (
            <Link
              href="/carrito"
              className="text-destructive"
              title="Revisar problema del almacenamiento del carrito"
              aria-label="Revisar problema del almacenamiento del carrito"
            >
              <AlertTriangle className="h-4 w-4" />
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden"
              render={<Button variant="ghost" size="icon" aria-label="Abrir menú" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Menú móvil">
                <div className="space-y-1">
                  <Link href="/licencias" className={`${mobileLinkClass("/licencias")} flex items-center gap-1`} onClick={() => setOpen(false)}>
                    Licencias
                  </Link>
                  <div className="pl-4 border-l-2 border-muted ml-1.5 space-y-1">
                    {categories.map((cat) => (
                      <Link key={cat.href} href={cat.href} className="text-sm text-muted-foreground hover:text-foreground block py-1 transition-colors" onClick={() => setOpen(false)}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <Link href="/instaladores" className={`${mobileLinkClass("/instaladores")} flex items-center gap-1`} onClick={() => setOpen(false)}>
                    Instaladores
                  </Link>
                  <div className="pl-4 border-l-2 border-muted ml-1.5 space-y-1">
                    {instItems.map((item) => (
                      <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground block py-1 transition-colors" onClick={() => setOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/faq" className={mobileLinkClass("/faq")} onClick={() => setOpen(false)}>FAQ</Link>
                <Link href="/sobre-nosotros" className={mobileLinkClass("/sobre-nosotros")} onClick={() => setOpen(false)}>Sobre nosotros</Link>
                <Link href="/bot-cid-fetcher" className={mobileLinkClass("/bot-cid-fetcher")} onClick={() => setOpen(false)}>Bot CID Fetcher</Link>
                <Link href="/contacto" className={mobileLinkClass("/contacto")} onClick={() => setOpen(false)}>Contacto</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
