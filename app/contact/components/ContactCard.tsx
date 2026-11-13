import Image from "next/image";
import LocationButtons from "../../components/LocationButtons";

export default function ContactCard() {
  return (
    <section className="bg-dark-sage rounded-[40px] flex flex-col-reverse lg:flex-row gap-5 lg:gap-10 p-5">
      {/* aspect ratio on mobile; stretches to content height on desktop via flex */}
      <div className="relative w-full lg:w-[45%] aspect-[625/435] lg:aspect-auto lg:self-stretch lg:min-h-[435px] shrink-0 rounded-[30px] overflow-hidden">
        <Image
          src="/contact/store-interior.jpg"
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

        <LocationButtons />
      </div>
    </section>
  );
}
