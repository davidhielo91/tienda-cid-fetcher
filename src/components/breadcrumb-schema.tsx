interface Crumb {
  label: string;
  href?: string;
}

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const filtered = items.filter((i) => i.href);
  if (filtered.length < 2) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: filtered.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: item.href ? `https://cidfetcher.de${item.href}` : undefined,
          })),
        }),
      }}
    />
  );
}
