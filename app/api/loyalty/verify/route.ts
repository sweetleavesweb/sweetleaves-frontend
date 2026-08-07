// endpoint used when a user provides phone number or email to log into their rewards account using a verification code
import { NextResponse } from "next/server";
import { normalizeContact, sendVerificationCode, WalletApiError } from "@/lib/alpineiq/wallet";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const contact = typeof body?.contact === "string" ? normalizeContact(body.contact) : null;

  if (!contact) {
    return NextResponse.json(
      { error: "Enter a valid phone number or email address." },
      { status: 400 },
    );
  }

  try {
    await sendVerificationCode(contact);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof WalletApiError && error.kind === "not_found") {
      return NextResponse.json(
        {
          error: "We couldn't find a Garden Club member with that info.",
          notFound: true,
        },
        { status: 404 },
      );
    }
    console.error("Loyalty verify failed:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your code. Please try again." },
      { status: 502 },
    );
  }
}
