import Image from "next/image";
import LocationButtons from "../../components/LocationButtons";

export default function AboutIntro() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[90px] items-center p-5">
      <div className="lg:flex-1 min-w-0 flex flex-col gap-8 items-center lg:items-start">
        <div className="font-poppins-regular text-lg text-dark-green text-center lg:text-left">
          <p>
            When Minnesota legalized recreational cannabis in August 2023, we saw
            an opportunity to do things differently. Not another warehouse
            dispensary. Not a clinical pharmacy. Just a calm, thoughtfully
            designed space where shopping for cannabis feels easy—where it fits
            into your real life, just like everything else you choose with care.
          </p>
          <br />
          <p>
            As a locally owned and operated Minnesota company, we&apos;re here
            for everyone. Whether you&apos;re trying cannabis for the first time
            or you know exactly what you want, our team offers honest guidance
            and a curated selection of medical and recreational products that
            fit seamlessly into real life.
          </p>
        </div>
        <LocationButtons />
      </div>
      <Image
        src="/about/store-interior.png"
        alt="Inside Sweetleaves dispensary"
        width={625}
        height={435}
        sizes="(max-width: 1024px) 100vw, 625px"
        className="rounded-[30px] object-cover w-full lg:w-1/2 lg:max-w-[625px] h-auto lg:h-[435px]"
      />
    </section>
  );
}
