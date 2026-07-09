import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "./links";

export default function DesktopNav() {
  return (
    <div className="hidden [@media(min-width:1200px)]:block sticky top-0 z-40 px-6 pt-2 pb-4 relative">
      <div
        className="absolute inset-x-0 top-0 h-1/2 backdrop-blur-xl pointer-events-none bg-sky-blue"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <nav className="relative bg-dark-green rounded-[70px] max-w-[1365px] mx-auto flex items-center justify-between px-9 h-[89px]">
        <Link href="/">
          <Image
            src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_B.svg"
            alt="Sweetleaves"
            width={267}
            height={38}
            priority
          />
        </Link>

        <div className="flex self-stretch items-stretch gap-8">
          {NAV_LINKS.map((item) =>
            item.items ? (
              <div key={item.label} className="group relative flex items-center">
                <span className="font-poppins-bold text-[15px] text-parchment uppercase cursor-default select-none group-hover:opacity-75 transition-opacity">
                  {item.label}
                </span>
                {/* invisible bridge keeps hover active between trigger and panel */}
                <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 w-full h-4" />
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 z-50">
                  <div className="bg-dark-green border border-dark-sage rounded-2xl py-2 px-1 min-w-[190px] flex flex-col shadow-xl">
                    {item.items.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="font-poppins-bold text-[13px] text-parchment uppercase px-4 py-2.5 rounded-xl hover:bg-dark-sage transition-colors whitespace-nowrap"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-poppins-bold text-[15px] text-parchment uppercase hover:opacity-75 transition-opacity flex items-center"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop-medical-cannabis/"
            className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Med
          </Link>
          <Link
            href="/shop-recreational-cannabis/"
            className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Rec
          </Link>
        </div>
      </nav>
    </div>
  );
}
