"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { DealSlide } from "@/lib/deals";

const AUTO_ADVANCE_MS = 10000;

interface Props {
  slides: DealSlide[];
}

export default function DealsCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const activeIndex = index % slides.length;
  const slide = slides[activeIndex];
  const hasMultiple = slides.length > 1;
  const paused = hovered || focused;

  useEffect(() => {
    if (!hasMultiple || paused) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [hasMultiple, paused, slides.length, index]);

  function handleFocus(e: React.FocusEvent) {
    if (e.target.matches(":focus-visible")) setFocused(true);
  }

  function handleBlur(e: React.FocusEvent) {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }

  const image = (
    <Image
      src={slide.url}
      alt={slide.alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 1280px"
      priority={activeIndex === 0}
    />
  );

  return (
    <div
      className="relative aspect-2/1 md:aspect-4/1 w-full max-w-7xl mx-auto rounded-[40px] overflow-hidden"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {slide.href ? (
        <SlideLink href={slide.href} label={slide.alt}>
          {image}
        </SlideLink>
      ) : (
        image
      )}

      {hasMultiple && (
        <>
          <ArrowButton direction="prev" onClick={goPrev} />
          <ArrowButton direction="next" onClick={goNext} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-ivory" : "bg-ivory/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface SlideLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SlideLink({ href, label, children }: SlideLinkProps) {
  const isExternal = !href.startsWith("/");
  return (
    <Link
      href={href}
      aria-label={label}
      className="absolute inset-0"
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </Link>
  );
}

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        isPrev ? "left-2.5 md:left-4" : "right-2.5 md:right-4"
      } size-9 md:size-11 rounded-full bg-almost-black/35 hover:bg-almost-black/55 backdrop-blur-sm text-ivory flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-4 md:size-5 ${isPrev ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
