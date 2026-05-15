"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgeGateStatus } from "./AgeGate";

const STORAGE_KEY = "gardenClub:dismissedAt";
const TTL_MS = 24 * 60 * 60 * 1000;

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

  // Navigation trigger: fires on any pathname change while verified
  useEffect(() => {
    maybeShow();
  }, [pathname, status]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-almost-black/40 px-6">
      <div className="relative bg-dark-green rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-white text-xl leading-none hover:opacity-70 transition-opacity"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/rewards/garden-club-text.png"
            alt="Garden Club"
            width={220}
            height={38}
            className="h-auto"
          />
          <div className="flex-shrink-0 w-12 h-12 bg-light-gold rounded-full flex items-center justify-center">
            <Image
              src="/logos-and-icons/icon/Sweetleaves_Icon_DarkGreen.svg"
              alt=""
              width={28}
              height={28}
            />
          </div>
        </div>

        <p className="text-ivory text-sm mb-6">
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
