"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgeGateStatus } from "./AgeGate";

const STORAGE_KEY = "gardenClub:dismissedAt";
const TTL_MS = Number(process.env.NEXT_PUBLIC_GARDEN_CLUB_POPUP_TTL_MS) || 24 * 60 * 60 * 1000;

function isDismissedWithinTtl(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < TTL_MS;
}

export default function GardenClubPopup() {
  const [visible, setVisible] = useState(false);
  const status = useAgeGateStatus();
  const pathname = usePathname();
  const triggered = useRef(false);
  const mounted = useRef(false);

  function maybeShow() {
    if (triggered.current) return;
    if (status !== "verified") return;
    if (pathname.startsWith("/loyalty")) return;
    if (isDismissedWithinTtl()) return;
    triggered.current = true;
    setVisible(true);
  }

  // Scroll trigger: fires once when the user has scrolled 25% of the page.
  // pathname is included in deps so the closure always has the current path,
  // preventing the popup from showing on /loyalty after navigating there.
  useEffect(() => {
    if (status !== "verified") return;

    function handleScroll() {
      const ratio = window.scrollY / document.documentElement.scrollHeight;
      if (ratio >= 0.25) {
        maybeShow();
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigation trigger: fires on page navigation, skips initial mount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    maybeShow();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-almost-black/40 px-2">
      <div className="relative bg-dark-green rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-white text-xl leading-none hover:opacity-70 transition-opacity"
        >
          X
        </button>

        <Image
          src="/rewards/garden-club-text.png"
          alt="Garden Club"
          width={817}
          height={143}
          className="w-full h-auto mb-4 -ml-2 mt-2"
        />

        <p className="text-white text-base mb-6 text-pretty">
          Earn points with every purchase and get exclusive access to new
          products and giveaways.
        </p>

        <Link
          href="/loyalty#signup"
          onClick={handleDismiss}
          className="block w-full bg-light-gold text-dark-green font-semibold uppercase text-sm text-center rounded-full py-3 hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
