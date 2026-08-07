// after the user requests a verification code with /api/loyalty/verify, they provide the code + id (email or phone number)
// and AIQ fetches their "wallet"

import { NextResponse } from "next/server";
import { fetchWallet, normalizeContact, WalletApiError } from "@/lib/alpineiq/wallet";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const contact = typeof body?.contact === "string" ? normalizeContact(body.contact) : null;
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!contact || !code) {
    return NextResponse.json(
      { error: "Enter the verification code we sent you." },
      { status: 400 },
    );
  }

  try {
    const wallet = await fetchWallet(contact, code);
    return NextResponse.json(wallet);
  } catch (error) {
    if (error instanceof WalletApiError && error.kind === "invalid_code") {
      return NextResponse.json(
        { error: "That code didn't match. Double-check it and try again." },
        { status: 401 },
      );
    }
    console.error("Loyalty wallet fetch failed:", error);
    return NextResponse.json(
      { error: "Something went wrong loading your rewards. Please try again." },
      { status: 502 },
    );
  }
}
