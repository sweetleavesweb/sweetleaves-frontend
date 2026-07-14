const AIQ_BASE_URL = "https://lab.alpineiq.com";
const AIQ_UID = "3585";
const MAX_ORDERS = 50;

export type Contact = { phone: string } | { email: string };

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  available: boolean;
  expiration: number;
}

export interface OrderItem {
  name: string;
  brand: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: number;
  store: string;
  total: number;
  items: OrderItem[];
}

export interface PassLinks {
  apple: string;
  google: string;
}

export interface Wallet {
  points: number;
  hidePoints: boolean;
  rewards: Reward[];
  orders: Order[];
  referralUrl: string;
  passLinks: PassLinks;
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

interface AiqOrderLineItem {
  name?: string;
  brand?: string;
  quantity?: number;
  totalPrice?: number;
  timestamp?: number;
  storeName?: string;
}

// The orders endpoint returns a flat list of line items; items purchased
// together share the same timestamp, which is the only grouping key available.
async function fetchOrders(contactID: string): Promise<Order[]> {
  const apiKey = process.env.ALPINEIQ_API_KEY;
  const res = await fetch(
    `${AIQ_BASE_URL}/api/v1.1/contact/orders/${AIQ_UID}/${contactID}`,
    { headers: { "X-APIKEY": apiKey ?? "" }, cache: "no-store" },
  );
  if (!res.ok) {
    throw new WalletApiError(`Alpine IQ orders fetch failed (${res.status}).`, "upstream");
  }

  const payload = await res.json();
  const lineItems: AiqOrderLineItem[] = Array.isArray(payload?.data) ? payload.data : [];

  const visits = new Map<number, Order>();
  for (const item of lineItems) {
    const date = item.timestamp ?? 0;
    const order = visits.get(date) ?? {
      id: String(date),
      date,
      store: item.storeName ?? "",
      total: 0,
      items: [],
    };
    const price = item.totalPrice ?? 0;
    order.items.push({
      name: item.name ?? "Unknown item",
      brand: item.brand ?? "",
      quantity: item.quantity ?? 1,
      price,
    });
    order.total += price;
    visits.set(date, order);
  }

  return [...visits.values()].sort((a, b) => b.date - a.date).slice(0, MAX_ORDERS);
}

async function fetchPassLinks(contactID: string): Promise<PassLinks> {
  const apiKey = process.env.ALPINEIQ_API_KEY;
  const res = await fetch(
    `${AIQ_BASE_URL}/api/v2/walletPassDownloadLinks/${contactID}`,
    { headers: { "X-APIKEY": apiKey ?? "" }, cache: "no-store" },
  );
  if (!res.ok) {
    throw new WalletApiError(`Alpine IQ pass links fetch failed (${res.status}).`, "upstream");
  }
  const payload = await res.json();
  return {
    apple: typeof payload?.data?.apple === "string" ? payload.data.apple : "",
    google: typeof payload?.data?.google === "string" ? payload.data.google : "",
  };
}

async function fetchReferralUrl(contactID: string): Promise<string> {
  const apiKey = process.env.ALPINEIQ_API_KEY;
  const res = await fetch(`${AIQ_BASE_URL}/api/v1.1/piis/${AIQ_UID}/${contactID}`, {
    headers: { "X-APIKEY": apiKey ?? "" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new WalletApiError(`Alpine IQ contact fetch failed (${res.status}).`, "upstream");
  }
  const payload = await res.json();
  const referCode = payload?.data?.referCode;
  if (typeof referCode === "string" && referCode) {
    return `${AIQ_BASE_URL}/joinMembers/${AIQ_UID}?refCode=${encodeURIComponent(referCode)}`;
  }
  const referLink = payload?.data?.referLink;
  return typeof referLink === "string" ? referLink : "";
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

  let orders: Order[] = [];
  let referralUrl = "";
  let passLinks: PassLinks = { apple: "", google: "" };
  if (typeof data?.contactID === "string" && data.contactID) {
    [orders, referralUrl, passLinks] = await Promise.all([
      fetchOrders(data.contactID).catch(() => []),
      fetchReferralUrl(data.contactID).catch(() => ""),
      fetchPassLinks(data.contactID).catch(() => ({ apple: "", google: "" })),
    ]);
  }

  return {
    points: typeof data?.loyaltyPoints === "number" ? data.loyaltyPoints : 0,
    hidePoints: Boolean(data?.hidePointsInWallet),
    rewards,
    orders,
    referralUrl,
    passLinks,
  };
}
