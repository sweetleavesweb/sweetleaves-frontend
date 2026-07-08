"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "./links";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuMaxHeight, setMenuMaxHeight] = useState("0px");

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Recalculate max-height after DOM settles — covers both open/close and sub-dropdown expand
  useEffect(() => {
    if (!isOpen) {
      setMenuMaxHeight("0px");
      return;
    }
    const frame = requestAnimationFrame(() => {
      if (menuRef.current) {
        setMenuMaxHeight(`${menuRef.current.scrollHeight}px`);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen, openDropdown]);

  function close() {
    setIsOpen(false);
    setOpenDropdown(null);
  }

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  return (
    <div className="[@media(min-width:1200px)]:hidden sticky top-0 z-40">
      <div className="relative bg-dark-green px-5 pt-4 pb-4">
        {/* Top row: logo + hamburger */}
        <div className="flex items-center justify-between">
          <Link href="/" onClick={close}>
            <Image
              src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_B.svg"
              alt="Sweetleaves"
              width={234}
              height={33}
              priority
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="w-[47px] h-[25px] relative flex flex-col justify-between"
          >
            <span
              className={`block w-full h-[3px] bg-light-gold rounded-full transition-transform duration-300 origin-center ${
                isOpen ? "translate-y-[11px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-full h-[3px] bg-light-gold rounded-full transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-[3px] bg-light-gold rounded-full transition-transform duration-300 origin-center ${
                isOpen ? "-translate-y-[11px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Shop buttons — always visible */}
        <div className="mt-4 flex gap-3">
          <Link
            href="/shop-med/"
            onClick={close}
            className="flex-1 flex items-center justify-center bg-light-gold text-dark-green font-poppins-semibold uppercase text-base py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Med
          </Link>
          <Link
            href="/shop-now/"
            onClick={close}
            className="flex-1 flex items-center justify-center bg-light-gold text-dark-green font-poppins-semibold uppercase text-base py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Rec
          </Link>
        </div>

        {/* Expanded menu */}
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-full bg-dark-green overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: menuMaxHeight }}
        >
          <div className="px-5 pb-5 pt-2 flex flex-col items-center gap-1">
            {NAV_LINKS.map((item) =>
              item.items ? (
                <div key={item.label} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="font-poppins-bold text-[15px] text-white uppercase hover:opacity-75 transition-opacity py-2 flex items-center gap-1.5"
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    >
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="flex flex-col items-center gap-0.5 pb-2 pt-1">
                      {item.items.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={close}
                          className="font-poppins-bold text-[13px] text-parchment uppercase py-1.5 hover:opacity-75 transition-opacity"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="font-poppins-bold text-[15px] text-white uppercase hover:opacity-75 transition-opacity py-2"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
