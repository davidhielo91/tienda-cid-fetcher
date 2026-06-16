"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  center?: boolean;
}

export function Breadcrumbs({ items, center }: BreadcrumbsProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const visibleItems = isMobile && items.length > 2
    ? [items[0], { label: "..." }, items[items.length - 1]]
    : items;

  return (
    <nav className={`flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap scrollbar-none ${center ? "justify-center" : ""}`}>
      {visibleItems.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors truncate max-w-[100px] sm:max-w-none"
            >
              {item.label}
            </Link>
          ) : item.label === "..." ? (
            <span className="text-muted-foreground">…</span>
          ) : (
            <span className="text-foreground font-medium truncate max-w-[120px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
