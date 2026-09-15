import { BASE_PRICE_USDT, PRICE_TIERS, getPriceForQuantity } from "./pricing";

export type ProductData = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDesc: string;
  activationType: "digital" | "physical" | "subscription";
  minQuantity: number;
  features: string[];
  imageUrl: string | null;
  isActive: boolean;
  stock: number;
  priceUSDT: number;
};

const BOT_FEATURES = [
  "Licencia de activación telefónica original",
  "Activación vía Bot CID Fetcher — entrega inmediata",
  "Clave de producto de 25 caracteres (requiere activación vía bot o llamada)",
  "Sin llamadas a Microsoft, sin esperas",
  "Bot 100% gratis incluido con tu compra",
  "Soporte técnico incluido",
];

const BOT_DESC = `\n\nSe entrega una clave de producto de 25 caracteres (formato: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX). La clave requiere activación mediante llamada telefónica a Microsoft o a través de nuestro Bot CID Fetcher.

Esta es una licencia de activación telefónica original de Microsoft. Normalmente tendrías que llamar a Microsoft, proporcionar tus datos y esperar la activación, un proceso que puede tomar tiempo. Con nuestro Bot CID Fetcher incluido GRATIS, automatizamos todo el proceso y recibes tu activación al instante, sin llamadas ni esperas.`;

type RawProduct = {
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDesc?: string;
  features: string[];
  stock?: number;
};

const rawProducts: RawProduct[] = [
  { name: "Windows 11 Pro", slug: "windows-11-pro", category: "windows", shortDesc: "Licencia original Windows 11 Pro con activación vía Bot CID Fetcher. Sin llamadas a Microsoft. Ideal para empresas y técnicos revendedores.", description: "Licencia de activación telefónica de Microsoft Windows 11 Pro. Ideal para empresas y profesionales.", features: ["Activación permanente", "Soporte multi-idioma", "Actualizaciones incluidas"] },
  { name: "Windows 11 Home", slug: "windows-11-home", category: "windows", shortDesc: "Licencia original Windows 11 Home con activación inmediata vía Bot CID Fetcher. Sin llamadas, sin esperas. Desde 1 unidad.", description: "Licencia de activación telefónica de Microsoft Windows 11 Home. Ideal para uso doméstico y productividad básica.", features: ["Activación permanente", "Soporte multi-idioma"] },
  { name: "Windows 10 Pro", slug: "windows-10-pro", category: "windows", shortDesc: "Licencia original Windows 10 Pro. Activación inmediata con Bot CID Fetcher incluido. Estable y compatible con cualquier hardware.", description: "Licencia de activación telefónica de Microsoft Windows 10 Pro. Probado y confiable para entornos empresariales.", features: ["Activación permanente", "Soporte multi-idioma"] },
  { name: "Windows 10 Home", slug: "windows-10-home", category: "windows", shortDesc: "Licencia original Windows 10 Home con activación telefónica automatizada. Bot CID Fetcher gratis incluido en compras de 30+ unidades.", description: "Licencia de activación telefónica de Microsoft Windows 10 Home. Ideal para el hogar y oficina.", features: ["Activación permanente", "Soporte multi-idioma"] },
  { name: "Windows 10 Enterprise MAK", slug: "windows-10-enterprise-mak", category: "windows", shortDesc: "Licencia MAK Windows 10 Enterprise para implementaciones corporativas a gran escala. Activación telefónica original de Microsoft.", description: "Licencia de activación telefónica Microsoft Windows 10 Enterprise MAK. Para implementaciones corporativas a gran escala.", features: [], stock: 0 },
  { name: "Windows Pro Workstation MAK", slug: "windows-pro-workstation-mak", category: "windows", shortDesc: "Licencia MAK Windows Pro Workstation para estaciones de alto rendimiento. Activación telefónica original, entrega inmediata.", description: "Licencia de activación telefónica Microsoft Windows Pro Workstation MAK. Para estaciones de trabajo de alto rendimiento.", features: [], stock: 0 },
  { name: "Microsoft Office 2024 Professional Plus", slug: "office-2024-pro-plus", category: "office", shortDesc: "Licencia original Office 2024 Pro Plus con Word, Excel, PowerPoint, Outlook, Access y Publisher. Activación inmediata, 1 PC, licencia perpetua.", description: "La última suite ofimática de Microsoft con Word, Excel, PowerPoint, Outlook, Access y Publisher.", features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Licencia perpetua", "1 PC"] },
  { name: "Microsoft Office 2021 Professional Plus", slug: "office-2021-pro-plus", category: "office", shortDesc: "Licencia original Office 2021 Pro Plus. Incluye Word, Excel, PowerPoint, Outlook, Access y Publisher. Perpetua para 1 PC o Mac.", description: "Suite ofimática Microsoft con Word, Excel, PowerPoint, Outlook, Access y Publisher. Licencia perpetua.", features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Licencia perpetua", "1 PC / Mac"] },
  { name: "Microsoft Office 2021 Home & Business", slug: "office-2021-home-business", category: "office", shortDesc: "Licencia original Office 2021 Home & Business con Word, Excel, PowerPoint y Outlook. Perpetua para 1 PC o Mac. Ideal para pymes.", description: "Word, Excel, PowerPoint y Outlook para uso profesional en hogar o pequeña empresa.", features: ["Word, Excel, PowerPoint", "Outlook", "Licencia perpetua", "1 PC / Mac"] },
  { name: "Microsoft Office 2019 Professional Plus", slug: "office-2019-pro-plus", category: "office", shortDesc: "Licencia original Office 2019 Pro Plus con suite completa incluyendo Access y Publisher. Perpetua para 1 PC. Activación inmediata.", description: "Suite ofimática Microsoft 2019 con Word, Excel, PowerPoint, Outlook, Access y Publisher.", features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Licencia perpetua", "1 PC"] },
  { name: "Microsoft Office 2019 Home & Business", slug: "office-2019-home-business", category: "office", shortDesc: "Licencia original Office 2019 Home & Business con Word, Excel, PowerPoint y Outlook. Para 1 PC o Mac. Activación por bot incluida.", description: "Office 2019 Home & Business con Word, Excel, PowerPoint y Outlook.", features: ["Word, Excel, PowerPoint", "Outlook", "Licencia perpetua", "1 PC / Mac"] },
  { name: "Microsoft Office 2016 Professional Plus", slug: "office-2016-pro-plus", category: "office", shortDesc: "Licencia original Office 2016 Pro Plus con suite completa incluyendo Access y Publisher. Perpetua, 1 PC. Precio mayorista por volumen.", description: "Suite ofimática Microsoft 2016 con Word, Excel, PowerPoint, Outlook, Access y Publisher.", features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Licencia perpetua", "1 PC"] },
  { name: "Microsoft Office 2013 Professional Plus", slug: "office-2013-pro-plus", category: "office", shortDesc: "Licencia original Office 2013 Pro Plus. Compatible con Windows 7 y superior. Perpetua para 1 PC. Activación telefónica vía bot.", description: "Suite ofimática Microsoft 2013 con Word, Excel, PowerPoint, Outlook, Access y Publisher.", features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Licencia perpetua", "1 PC"] },
  { name: "Microsoft Visio Professional 2021", slug: "visio-professional-2021", category: "visio", shortDesc: "Licencia original Visio Professional 2021 para diagramas de flujo, organigramas y planos técnicos. Activación inmediata con Bot CID Fetcher.", description: "Diagramación profesional con Visio 2021: diagramas de flujo, organigramas y planos técnicos.", features: ["Diagramas profesionales", "Plantillas integradas", "Colaboración en tiempo real"] },
  { name: "Microsoft Visio Professional 2019", slug: "visio-professional-2019", category: "visio", shortDesc: "Licencia original Visio Professional 2019 para crear diagramas de flujo y organigramas. Activación telefónica. Precio por volumen disponible.", description: "Diagramación profesional con Visio 2019 para crear diagramas de flujo y organigramas.", features: ["Diagramas profesionales", "Plantillas integradas", "Colaboración en tiempo real"] },
  { name: "Microsoft Project Professional 2021", slug: "project-professional-2021", category: "project", shortDesc: "Licencia original Project Professional 2021 para gestión de proyectos con planificación, Gantt y reportes avanzados. Activación inmediata.", description: "Gestión de proyectos con Project 2021: planificación, seguimiento y reportes avanzados.", features: ["Planificación de proyectos", "Gestión de recursos", "Reportes avanzados"] },
  { name: "Microsoft Project Professional 2019", slug: "project-professional-2019", category: "project", shortDesc: "Licencia original Project Professional 2019 para planificación y seguimiento de proyectos. Activación telefónica. Precio mayorista disponible.", description: "Gestión de proyectos con Project 2019 para planificación y seguimiento.", features: ["Planificación de proyectos", "Gestión de recursos", "Reportes avanzados"] },
  { name: "Windows Server 2025 Datacenter Azure", slug: "windows-server-2025-datacenter-azure", category: "windows_server", shortDesc: "Licencia original Windows Server 2025 Datacenter Azure Edition. Virtualización ilimitada e integración híbrida con Azure. Activación inmediata.", description: "Windows Server 2025 Datacenter Azure Edition con virtualización ilimitada y capacidades híbridas.", features: ["Virtualización ilimitada", "Integración Azure", "SDN", "Storage Spaces Direct"] },
  { name: "Windows Server 2025 Standard", slug: "windows-server-2025-standard", category: "windows_server", shortDesc: "Licencia original Windows Server 2025 Standard con seguridad avanzada y soporte Azure Arc. Activación vía Bot CID Fetcher.", description: "Windows Server 2025 Standard con funciones avanzadas de seguridad y administración.", features: ["Seguridad mejorada", "Azure Arc", "Contenedores", "Storage Migration"] },
  { name: "Windows Server 2022 Standard", slug: "windows-server-2022-standard", category: "windows_server", shortDesc: "Licencia original Windows Server 2022 Standard con seguridad híbrida y Azure Arc. Activación telefónica inmediata. Precio por volumen.", description: "Windows Server 2022 Standard con seguridad híbrida y administración moderna.", features: ["Seguridad mejorada", "Azure Arc", "Contenedores", "Storage Migration"] },
  { name: "Windows Server 2022 Datacenter", slug: "windows-server-2022-datacenter", category: "windows_server", shortDesc: "Licencia original Windows Server 2022 Datacenter con virtualización ilimitada y SDN. Activación inmediata. Precio mayorista disponible.", description: "Windows Server 2022 Datacenter con virtualización ilimitada.", features: ["Virtualización ilimitada", "Protección avanzada", "SDN", "Storage Spaces Direct"] },
  { name: "Windows Server 2019 Standard", slug: "windows-server-2019-standard", category: "windows_server", shortDesc: "Licencia original Windows Server 2019 Standard para cargas empresariales con soporte de contenedores. Activación vía bot, entrega inmediata.", description: "Windows Server 2019 Standard para cargas de trabajo empresariales.", features: ["Seguridad mejorada", "Contenedores", "Storage Migration"] },
  { name: "Windows Server 2019 Essentials", slug: "windows-server-2019-essentials", category: "windows_server", shortDesc: "Licencia original Windows Server 2019 Essentials para pequeñas empresas hasta 25 usuarios. Activación telefónica con bot incluido.", description: "Windows Server 2019 Essentials ideal para pequeñas empresas.", features: ["Interfaz simplificada", "Conectividad remota", "Hasta 25 usuarios"] },
  { name: "Windows Server 2016 Datacenter", slug: "windows-server-2016-datacenter", category: "windows_server", shortDesc: "Licencia original Windows Server 2016 Datacenter con virtualización ilimitada y SDN. Activación telefónica. Precio mayorista por volumen.", description: "Windows Server 2016 Datacenter con virtualización ilimitada.", features: ["Virtualización ilimitada", "Protección avanzada", "SDN"] },
  { name: "Windows Server 2016 Standard", slug: "windows-server-2016-standard", category: "windows_server", shortDesc: "Licencia original Windows Server 2016 Standard para entornos empresariales con soporte de contenedores. Activación inmediata vía bot.", description: "Windows Server 2016 Standard para entornos empresariales.", features: ["Seguridad mejorada", "Contenedores", "Storage Migration"] },
];

const SHORT_DESC = "Licencia de activación telefónica. Incluye clave de producto de 25 caracteres. La activación requiere nuestro Bot CID Fetcher o llamada a Microsoft — con el bot es inmediato y sin llamadas.";

export const products: ProductData[] = rawProducts.map((p) => ({
  id: p.slug,
  name: p.name,
  slug: p.slug,
  category: p.category,
  description: p.description + BOT_DESC,
  shortDesc: p.shortDesc || SHORT_DESC,
  activationType: "digital",
  minQuantity: 1,
  features: [...p.features, ...BOT_FEATURES],
  imageUrl: null,
  isActive: true,
  stock: p.stock ?? 9999,
  priceUSDT: BASE_PRICE_USDT,
}));

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug && p.isActive);
}

export function getProductsByCategory(category?: string): ProductData[] {
  let filtered = products.filter((p) => p.isActive);
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  return filtered;
}

export function getFeaturedProducts(): ProductData[] {
  return products.filter((p) => p.isActive && p.stock > 0).slice(0, 6);
}

const categoryLabelMap: Record<string, string> = {
  windows: "Windows",
  office: "Office",
  windows_server: "Windows Server",
  visio: "Visio",
  project: "Project",
};

export function getCategoryLabel(category: string): string {
  return categoryLabelMap[category] || category;
}
