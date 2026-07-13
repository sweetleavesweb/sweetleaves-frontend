import Link from "next/link";
import type { WPCategory } from "@/lib/blog";

interface Props {
  categories: WPCategory[];
  activeSlug?: string;
}

export default function CategoryFilter({ categories, activeSlug }: Props) {
  const isAll = !activeSlug;

  return (
    <div className="flex gap-[9px] flex-wrap justify-center">
      <Link
        href="/blog/"
        className={`rounded-full h-[50px] px-[25px] py-[14px] flex items-center justify-center font-poppins-regular text-[16px] uppercase whitespace-nowrap ${
          isAll ? "bg-dark-green text-white" : "bg-sage text-white"
        }`}
      >
        All Categories
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog/?category=${cat.slug}`}
          className={`rounded-full h-[50px] px-[25px] py-[14px] flex items-center justify-center font-poppins-regular text-[16px] uppercase whitespace-nowrap ${
            activeSlug === cat.slug
              ? "bg-dark-green text-white"
              : "bg-sage text-white"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
