import Image from "next/image";
import Link from "next/link";
import { locationHref, locations } from "@/lib/locations";

export default function ContactCard() {
  return (
    <section className="bg-dark-sage rounded-[40px] flex flex-col-reverse lg:flex-row gap-5 lg:gap-10 p-5">
      {/* aspect ratio on mobile; stretches to content height on desktop via flex */}
      <div className="relative w-full lg:w-[45%] aspect-[625/435] lg:aspect-auto lg:self-stretch lg:min-h-[435px] shrink-0 rounded-[30px] overflow-hidden">
        <Image
          src="/about/store-interior.png"
          alt="Inside Sweetleaves dispensary"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 items-center lg:items-start justify-center flex-1 min-w-0 py-5">
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Send An Email</p>
          <a href="mailto:info@sweetleaves.co" className="hover:underline break-all">
            info@sweetleaves.co
          </a>
        </div>

        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Visit a Location</p>
          <p>Find the address, hours, phone, and parking for each store.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={locationHref(l.slug)}
              className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
