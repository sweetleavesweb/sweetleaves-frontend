import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL } from "@/lib/constants";
import { locationHref, locations } from "@/lib/locations";

const HOURS = [
  "Monday: 10am-9pm",
  "Tuesday: 10am-9pm",
  "Wednesday: 10am-9pm",
  "Thursday: 10am-10pm",
  "Friday: 10am-10pm",
  "Saturday: 9am-10pm",
  "Sunday: 11am-6pm",
];

export default function Footer() {
  return (
    <footer className="bg-dark-sage rounded-t-[30px] md:rounded-t-[40px] px-5 md:px-[73px] py-10 md:py-14 flex flex-col gap-10 md:gap-12 mx-4 md:mx-6">
      {/* Top row: Logo + tagline */}
      <div className="flex flex-col md:grid md:grid-cols-4 items-center gap-8 md:gap-[70px]">
        <div className="md:col-span-2 min-w-0 flex flex-col gap-2.5 items-center md:items-start">
          <p className="font-poppins-regular text-xl text-white text-center md:text-left">
            You&apos;re not lazy, you&apos;re living.
          </p>
          <Link href="/">
            <Image
              src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_A.svg"
              alt="Sweetleaves"
              width={341}
              height={61}
              className="max-w-full h-auto md:w-[428px]"
            />
          </Link>
        </div>
        <p className="md:col-span-2 font-poppins-bold text-3xl text-light-gold leading-none text-center md:text-left">
          Cannabis for real life.
        </p>
      </div>

      {/* Link columns */}
      <div className="flex flex-col md:grid md:grid-cols-4 gap-5 md:gap-[70px] items-center md:items-start">
        {/* Shop */}
        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <p className="font-poppins-bold text-lg text-ivory uppercase text-center md:text-left">
            Shop
          </p>
          <nav className="flex flex-col items-center md:items-start">
            <Link href="/products/flower/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Flower</Link>
            <Link href="/products/pre-rolls/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Pre-Rolls</Link>
            <Link href="/products/disposable-vapes-and-carts/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Vaporizers</Link>
            <Link href="/products/edibles/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Edibles</Link>
            <Link href="/products/cannabis-beverages/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">THC Drinks</Link>
            <Link href="/products/cbd/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">CBD</Link>
            <Link href="/products/concentrates/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Concentrates</Link>
            <Link href="/shop-medical-cannabis/" className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left">Medical</Link>
          </nav>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <p className="font-poppins-bold text-lg text-ivory uppercase text-center md:text-left">
            Info
          </p>
          <nav className="flex flex-col items-center md:items-start">
            <Link
              href="/loyalty/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              Rewards
            </Link>
            <Link
              href="/blog/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              Blog
            </Link>
            <Link
              href="/faqs/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              FAQ
            </Link>
            <Link
              href="/events/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              Events
            </Link>
            <Link
              href="/contact/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              Contact
            </Link>
            <Link
              href="/certificate-of-analysis/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              COAs
            </Link>
            <Link
              href="/medical-card/"
              className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
            >
              Medical Card
            </Link>
          </nav>
        </div>

        {/* Visit */}
        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <p className="font-poppins-bold text-lg text-ivory uppercase text-center md:text-left">
            Visit
          </p>
          <nav className="flex flex-col items-center md:items-start">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={locationHref(l.slug)}
                className="font-poppins-regular text-lg text-white py-0.5 hover:opacity-75 transition-opacity text-center md:text-left"
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <p className="font-poppins-bold text-lg text-ivory uppercase text-center md:text-left">
            Hours
          </p>
          <div className="flex flex-col items-center md:items-start">
            {HOURS.map((h) => (
              <span key={h} className="font-poppins-regular text-lg text-white">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        {/* Social */}
        <div className="flex flex-col md:flex-row gap-3.5 md:gap-5 items-center md:items-end">
          <div className="flex gap-3.5 items-center">
            <a
              href="https://www.instagram.com/sweetleaves.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social/instagram-white.png"
                alt="Sweetleaves on Instagram"
                width={46}
                height={46}
              />
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social/google-logo.png"
                alt="Sweetleaves on Google"
                width={48}
                height={49}
              />
            </a>
          </div>
          <Link
            href="/loyalty/"
            className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center w-full md:w-auto max-w-[350px]"
          >
            Sign Up For Rewards
          </Link>
        </div>

        {/* Compliance */}
        <div className="flex flex-col gap-7 items-center md:items-start w-full md:w-auto">
          <Image
            src="/compliance/mocc-logo.png"
            alt="Minnesota Office of Cannabis Management"
            width={387}
            height={49}
            className="max-w-full h-auto"
          />
          <div className="font-poppins-regular text-[13px] md:text-[15px] text-white leading-normal text-center md:text-left">
            <p>
              Sweetleaves sells Minnesota-compliant cannabis products to adults
              21+.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Sweetleaves. All rights
              reserved. License# MICRO-L24-000257
            </p>
            <p>Privacy Policy | Terms of Use | Certificate of Analysis</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
