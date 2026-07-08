import Image from "next/image";
import Link from "next/link";

export default function GardenClubPromo() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col gap-[5px] items-center justify-center px-10 py-9 min-h-[422px] md:min-h-[508px]">
      <Link href="/loyalty/">
        <div className="relative w-[340px] md:w-[817px] h-[67px] md:h-[143px]">
          <Image
            src="/rewards/garden-club-text.png"
            alt="Garden Club"
            fill
            sizes="(max-width: 768px) 340px, 817px"
            className="object-contain"
          />
        </div>
      </Link>

      <div className="text-center text-white max-w-[762px]">
        <p className="font-poppins-bold text-[30px] md:text-display uppercase">
          $1 Spent = 1 Point
        </p>
        <p className="font-poppins-regular text-[18px] mt-3">
          Points add up automatically when you use your phone number or email at
          checkout. You must be subscribed to our marketing communications to be
          in the Garden Club.
        </p>
      </div>

      <Link
        href="/loyalty/#signup"
        className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity mt-4 w-[256px] text-center"
      >
        Start Earning
      </Link>
    </section>
  );
}
