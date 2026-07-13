import Image from "next/image";
import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col lg:flex-row gap-8 lg:gap-[90px] items-center justify-end p-5">
      <div className="flex flex-col gap-4 lg:gap-0">
        <div className="font-poppins-regular text-lg text-dark-green text-center lg:text-left">
          <p>
            When Minnesota legalized recreational cannabis in August 2023, we saw
            an opportunity to do things differently. Not another warehouse
            dispensary. Not a clinical pharmacy. Just a calm, thoughtfully
            designed space where shopping for cannabis feels easy. Where it fits
            into your real life, just like everything else you choose with care.
          </p>
          <br />
          <p>
            We&apos;re located in North Loop Minneapolis, and we&apos;re here
            for everyone. Whether you&apos;re trying cannabis for the first time
            or you know exactly what you want, our team offers honest guidance
            and a curated selection that fits into real life.
          </p>
        </div>
        <Link
          href="/about-us/#find-us"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center lg:text-center w-full lg:max-w-[269px] mt-4"
        >
          Visit Us
        </Link>
      </div>
      <Image
        src="/about/store-interior.png"
        alt="Inside Sweetleaves dispensary"
        width={625}
        height={435}
        sizes="(max-width: 1024px) 100vw, 625px"
        className="rounded-[30px] object-cover w-full lg:w-[625px] h-auto lg:h-[435px] shrink-0"
      />
    </section>
  );
}
