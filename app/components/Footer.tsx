import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark-sage rounded-t-[30px] md:rounded-t-[40px] px-5 md:px-[73px] py-10 md:py-14 flex flex-col gap-10 md:gap-12 mx-4 md:mx-6">
      {/* Top row: Logo + tagline */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2.5 items-center md:items-start">
          <p className="font-poppins-regular text-xl text-white text-center md:text-left">
            You&apos;re not lazy, you&apos;re living.
          </p>
          <Link href="/">
            <Image
              src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_A.svg"
              alt="Sweetleaves"
              width={341}
              height={61}
              className="md:w-[428px] md:h-[77px]"
            />
          </Link>
        </div>
        <p className="font-poppins-bold text-3xl text-light-gold leading-none text-center md:text-left">
          Cannabis for real life.
          <br />
          Located in North Loop Minneapolis.
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
          <div className="flex flex-col items-center md:items-start">
            <a
              href="https://maps.app.goo.gl/qdpTUHsrBr7cpnm7A"
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins-regular text-lg text-white hover:opacity-75 transition-opacity text-center md:text-left"
            >
              905 N Washington Ave
              <br />
              Minneapolis, MN 55401
            </a>
            <a
              href="tel:612-688-9333"
              className="font-poppins-regular text-lg text-white hover:opacity-75 transition-opacity text-center md:text-left"
            >
              612-688-9333
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <p className="font-poppins-bold text-lg text-ivory uppercase text-center md:text-left">
            Hours
          </p>
          <div className="flex flex-col items-center md:items-start">
            <span className="font-poppins-regular text-lg text-white">
              Monday: 10am-9pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Tuesday: 10am-9pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Wednesday: 10am-9pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Thursday: 10am-10pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Friday: 10am-10pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Saturday: 9am-10pm
            </span>
            <span className="font-poppins-regular text-lg text-white">
              Sunday: 11am-6pm
            </span>
          </div>
        </div>

        {/* Map - mobile only */}
        <div className="md:hidden w-full max-w-[350px]">
          <iframe
            src="https://www.google.com/maps?q=905+N+Washington+Ave,+Minneapolis,+MN+55401&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Map to Sweetleaves"
            width={350}
            height={200}
            className="w-full h-auto rounded-[10px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        {/* Map + social */}
        <div className="flex flex-col gap-5 items-center md:items-start">
          <div className="hidden md:block w-[429px]">
            <iframe
              src="https://www.google.com/maps?q=Sweetleaves+North+Loop+Minneapolis&output=embed"
              title="Map to Sweetleaves"
              width={429}
              height={200}
              className="w-full h-auto rounded-[10px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
