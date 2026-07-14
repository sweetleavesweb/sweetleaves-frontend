"use client";

import { useState } from "react";
import Link from "next/link";
import type { Wallet } from "@/lib/alpineiq/wallet";
import WalletView from "./WalletView";

type Step = "contact" | "code" | "wallet";

const inputClasses =
  "w-full bg-white border border-sage rounded-full px-6 py-3.5 font-poppins-regular text-lg text-dark text-center focus:outline-none focus:border-dark-green";

const buttonClasses =
  "w-full bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50";

export default function RewardsChecker() {
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function sendCode() {
    setSubmitting(true);
    setError(null);
    setNotFound(false);
    try {
      const res = await fetch("/api/loyalty/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotFound(Boolean(data.notFound));
        setError(data.error);
        return;
      }
      setCode("");
      setStep("code");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function loadWallet() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/loyalty/wallet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setWallet(data);
      setStep("wallet");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("contact");
    setContact("");
    setCode("");
    setWallet(null);
    setError(null);
    setNotFound(false);
  }

  if (step === "wallet" && wallet) {
    return <WalletView wallet={wallet} onReset={reset} />;
  }

  return (
    <section className="bg-parchment border border-sage rounded-[50px] px-6 py-10 md:px-12 md:py-12 flex flex-col items-center gap-5">
      {step === "contact" ? (
        <form
          className="w-full max-w-md flex flex-col items-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            sendCode();
          }}
        >
          <label
            htmlFor="loyalty-contact"
            className="font-poppins-bold text-2xl text-dark-green text-center"
          >
            Welcome back
          </label>
          <p className="font-poppins-semibold uppercase text-sm text-dark-green text-center tracking-wide">
            Sign in to manage your points and rewards
          </p>
          <input
            id="loyalty-contact"
            type="text"
            placeholder="Phone number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputClasses}
            required
          />
          <button type="submit" className={buttonClasses} disabled={submitting}>
            {submitting ? "Sending..." : "Send My Code"}
          </button>
          <p className="font-poppins-regular text-base text-dark-green text-center">
            Not a member yet?{" "}
            <Link
              href="/loyalty/#signup"
              className="font-poppins-semibold underline hover:opacity-70"
            >
              Sign up here
            </Link>
          </p>
        </form>
      ) : (
        <form
          className="w-full max-w-md flex flex-col items-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            loadWallet();
          }}
        >
          <label
            htmlFor="loyalty-code"
            className="font-poppins-bold text-2xl text-dark-green text-center"
          >
            Enter your code
          </label>
          <p className="font-poppins-regular text-base text-dark-green text-center">
            We sent a verification code to {contact.trim()}.
          </p>
          <input
            id="loyalty-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${inputClasses} tracking-[0.3em]`}
            required
          />
          <button type="submit" className={buttonClasses} disabled={submitting}>
            {submitting ? "Checking..." : "View My Rewards"}
          </button>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={sendCode}
              disabled={submitting}
              className="font-poppins-semibold text-base text-dark-green underline hover:opacity-70"
            >
              Resend code
            </button>
            <button
              type="button"
              onClick={reset}
              className="font-poppins-semibold text-base text-dark-green underline hover:opacity-70"
            >
              Use a different number
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="w-full max-w-md flex flex-col items-center gap-3">
          <p className="font-poppins-semibold text-base text-orange-glow text-center">
            {error}
          </p>
          {notFound && (
            <Link
              href="/loyalty/#signup"
              className="font-poppins-semibold text-base text-dark-green underline hover:opacity-70"
            >
              Join the Garden Club — it&apos;s free
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
