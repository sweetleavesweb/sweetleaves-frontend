const AIQ_BASE_URL = "https://lab.alpineiq.com";

export type Contact = { phone: string } | { email: string };

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  available: boolean;
  expiration: number;
}

export interface Wallet {
  points: number;
  hidePoints: boolean;
  rewards: Reward[];
}

export class WalletApiError extends Error {
  constructor(
    message: string,
    public readonly kind: "not_found" | "invalid_code" | "upstream",
  ) {
    super(message);
  }
}

export function normalizeContact(raw: string): Contact | null {
  const trimmed = raw.trim();
  if (trimmed.includes("@")) {
    return /^\S+@\S+\.\S+$/.test(trimmed) ? { email: trimmed.toLowerCase() } : null;
  }
  const digits = trimmed.replace(/\D/g, "");
  const phone = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return phone.length === 10 ? { phone } : null;
}

async function aiqPost(path: string, body: Record<string, string>): Promise<Response> {
  const apiKey = process.env.ALPINEIQ_API_KEY;
  if (!apiKey) {
    throw new WalletApiError("Alpine IQ API key is not configured.", "upstream");
  }
  return fetch(`${AIQ_BASE_URL}${path}`, {
    method: "POST",
    headers: { "X-APIKEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function sendVerificationCode(contact: Contact): Promise<void> {
  const res = await aiqPost("/api/v2/verify/contact/wallet", { ...contact });
  if (res.status === 400 || res.status === 404) {
    throw new WalletApiError("Contact not found.", "not_found");
  }
  if (!res.ok) {
    throw new WalletApiError(`Alpine IQ verify failed (${res.status}).`, "upstream");
  }
}

interface AiqDiscountTemplate {
  id?: string;
  name?: string;
  pointsDeduction?: number;
  available?: boolean;
  expiration?: number;
}

export async function fetchWallet(contact: Contact, code: string): Promise<Wallet> {
  const res = await aiqPost("/api/v2/view/contact/wallet", { ...contact, code });
  if (res.status >= 400 && res.status < 500) {
    throw new WalletApiError("Verification code did not match.", "invalid_code");
  }
  if (!res.ok) {
    throw new WalletApiError(`Alpine IQ wallet fetch failed (${res.status}).`, "upstream");
  }

  const payload = await res.json();
  const data = payload?.data ?? payload;
  const templates: AiqDiscountTemplate[] = Array.isArray(data?.discountTemplates)
    ? data.discountTemplates
    : [];

  const rewards: Reward[] = templates
    .filter((t) => t.name)
    .map((t, index) => ({
      id: t.id ?? String(index),
      name: t.name as string,
      pointsCost: t.pointsDeduction ?? 0,
      available: Boolean(t.available),
      expiration: t.expiration ?? 0,
    }))
    .sort((a, b) => a.pointsCost - b.pointsCost);

  return {
    points: typeof data?.loyaltyPoints === "number" ? data.loyaltyPoints : 0,
    hidePoints: Boolean(data?.hidePointsInWallet),
    rewards,
  };
}
