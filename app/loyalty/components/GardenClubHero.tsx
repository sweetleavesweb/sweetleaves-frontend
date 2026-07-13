import Image from "next/image";
import Link from "next/link";

export default function GardenClubHero() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col items-center justify-center px-6 py-8 md:px-10 md:py-10 gap-0">
      <Image
        src="/logos-and-icons/logo-hotizontal/Sweetleaves_Logo_White_Horizontal_B.svg"
        alt="Sweetleaves"
        width={478}
        height={68}
        className="hidden md:block"
      />
      <Image
        src="/rewards/garden-club-text.png"
        alt="Garden Club"
        width={817}
        height={143}
        className="max-w-full h-auto"
      />
      <h1 className="font-poppins-bold text-3xl md:text-display text-white text-center">
        Loyalty Perks &amp; Points
      </h1>
      <Link
        href="/loyalty/rewards/"
        className="flex mt-4 bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
      >
        Check Your Rewards
      </Link>
    </section>
  );
}
