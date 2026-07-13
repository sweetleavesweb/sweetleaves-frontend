"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const DEFAULT_TTL_HOURS = 12;
const FOCUSABLE_SELECTOR =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

type GateStatus = "prompt" | "exit" | "verified";

const AgeGateContext = createContext<GateStatus>("prompt");

export function useAgeGateStatus() {
  return useContext(AgeGateContext);
}

function getTtlHours(): number {
  const raw = process.env.NEXT_PUBLIC_AGE_GATE_TTL_HOURS;
  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_TTL_HOURS;
  }

  if (parsed === 0) {
    return 0;
  }

  if (parsed < 0) {
    return DEFAULT_TTL_HOURS;
  }

  return parsed;
}

export default function AgeGate({
  children,
  initialVerified,
}: {
  children: React.ReactNode;
  initialVerified: boolean;
}) {
  const [status, setStatus] = useState<GateStatus>(
    initialVerified ? "verified" : "prompt"
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== "prompt") {
      return;
    }

    yesButtonRef.current?.focus();
  }, [status]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const container = dialogRef.current;
    if (!container) {
      return;
    }

    const focusables = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleYes = () => {
    const ttlHours = getTtlHours();
    if (ttlHours > 0) {
      document.cookie = `ageGate:verified=true; max-age=${ttlHours * 3600}; path=/; SameSite=Lax`;
    }
    document.documentElement.classList.remove("overflow-hidden");
    setStatus("verified");
  };

  const handleNo = () => {
    setStatus("exit");
  };

  const gateActive = status !== "verified";

  return (
    <AgeGateContext.Provider value={status}>
      <div className="relative">
        {children}

        {gateActive ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-almost-black/40 px-6 py-10">
            {status === "prompt" ? (
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="age-gate-title"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                className="w-full max-w-lg rounded-2xl bg-dark-green p-8 shadow-2xl"
              >
                <Image
                  src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_A.svg"
                  alt="Sweetleaves"
                  width={300}
                  height={150}
                  className="mx-auto mb-6"
                />
                <p
                  id="age-gate-title"
                  className="font-poppins text-display text-center font-bold text-light-gold"
                >
                  Are you 21 or older?
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    ref={yesButtonRef}
                    type="button"
                    onClick={handleYes}
                    className="w-full rounded-full bg-light-gold border border-light-gold py-3 text-sm font-semibold text-dark-green transition hover:bg-orange-glow hover:border-orange-glow hover:text-white outline-none"
                  >
                    YES, I&apos;M 21+
                  </button>
                  <button
                    type="button"
                    onClick={handleNo}
                    className="w-full rounded-full border border-light-gold py-3 text-sm font-semibold text-light-gold transition hover:bg-orange-glow hover:border-orange-glow hover:text-white outline-none"
                  >
                    NO, I&apos;M NOT 21+
                  </button>
                </div>
              </div>
            ) : (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="age-gate-exit-title"
                className="w-full max-w-lg rounded-2xl bg-dark-green p-8 shadow-2xl"
              >
                <Image
                  src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_A.svg"
                  alt="Sweetleaves"
                  width={300}
                  height={150}
                  className="mx-auto mb-6"
                />
                <h1
                  id="age-gate-exit-title"
                  className="text-center text-3xl font-bold text-light-gold"
                >
                  We appreciate your honesty.
                </h1>
                <p className="mt-3 text-center text-sm text-ivory">
                  Come back when you&apos;re 21.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </AgeGateContext.Provider>
  );
}
