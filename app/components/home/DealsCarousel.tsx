"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { DealSlide } from "@/lib/deals";

const AUTO_ADVANCE_MS = 10000;

interface Props {
  slides: DealSlide[];
}

export default function DealsCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className="relative aspect-[2/1] md:aspect-[4/1] w-full max-w-[1280px] mx-auto rounded-[40px] overflow-hidden"
    >
      <Image
        src={slides[index].url}
        alt={slides[index].alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1280px"
        priority={index === 0}
      />
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-ivory" : "bg-ivory/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
