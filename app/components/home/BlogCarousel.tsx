"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string | null;
  href: string;
}

interface Props {
  posts: BlogPost[];
}

export default function BlogCarousel({ posts }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (posts.length === 0) return null;

  const total = posts.length;

  function handlePrev() {
    setActiveIndex((i) => (i - 1 + total) % total);
  }

  function handleNext() {
    setActiveIndex((i) => (i + 1) % total);
  }

  return (
    <>
      <div className="grid w-full max-w-[608px]">
        {posts.map((p, i) => (
          <div
            key={i}
            className={`col-start-1 row-start-1 bg-white rounded-[30px] md:rounded-[20px] p-3.5 w-full flex flex-col gap-2.5${
              i === activeIndex ? "" : " invisible"
            }`}
          >
            <div className="relative w-full aspect-[16/9] rounded-[20px] md:rounded-[10px] overflow-hidden">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 608px) 100vw, 608px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-sage/20" />
              )}
            </div>
            <div className="flex flex-col gap-2.5 px-1">
              <h3 className="font-poppins-bold text-[25px] md:text-[30px] text-dark-sage line-clamp-2">
                {p.title}
              </h3>
              <div
                className="font-poppins-regular text-[18px] text-dark line-clamp-2"
                dangerouslySetInnerHTML={{ __html: p.excerpt }}
              />
              <Link
                href={p.href}
                className="font-poppins-bold text-[20px] text-orange-glow uppercase"
              >
                Read More &gt;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-[10px] md:gap-[25px] items-center justify-center w-full">
        <button
          aria-label="Previous post"
          onClick={handlePrev}
          className="bg-orange-glow rounded-full size-[68px] flex items-center justify-center shrink-0 rotate-180"
        >
          <span className="font-poppins-semibold text-[55px] text-white leading-none">
            &gt;
          </span>
        </button>

        <Link
          href="/blog/"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-5 rounded-full hover:opacity-90 transition-opacity text-center flex-1 max-w-[404px]"
        >
          Browse Our Blog
        </Link>

        <button
          aria-label="Next post"
          onClick={handleNext}
          className="bg-orange-glow rounded-full size-[68px] flex items-center justify-center shrink-0"
        >
          <span className="font-poppins-semibold text-[55px] text-white leading-none">
            &gt;
          </span>
        </button>
      </div>
    </>
  );
}
