import Link from "next/link";

export default function MedicalHero() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col items-center px-6 py-10 md:px-10 md:py-12 gap-5 text-center">
      <p className="font-poppins-regular text-lg text-white/80 max-w-2xl leading-relaxed">
        Having your Minnesota medical cannabis certification unlocks tax savings, priority
        service, unlimited possession, and free pharmacist consults — every visit, for three years.
        We&apos;ve put together this guide to help you get certified and stay enrolled.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/contact/"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Request Card Assistance
        </Link>
        <a
          href="mailto:info@sweetleavesnorthloop.com"
          className="bg-transparent text-white border-2 border-white font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:bg-white hover:text-dark-green transition-colors text-center"
        >
          Chat With Us
        </a>
      </div>
    </section>
  );
}
