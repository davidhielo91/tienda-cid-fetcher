const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "rootkit_spoofer";

const defaultMessage = encodeURIComponent(
  "¡Hola! Vengo de la web de Tienda CID Fetcher y me gustaría recibir información. ¿Me puedes ayudar?"
);

export function telegramUrl(message?: string): string {
  const text = message ? encodeURIComponent(message) : defaultMessage;
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

export const TELEGRAM_CONTACT_URL = telegramUrl();

export const TELEGRAM_HANDLE = `@${TELEGRAM_USERNAME}`;
