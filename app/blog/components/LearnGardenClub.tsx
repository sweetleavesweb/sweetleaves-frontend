import Image from "next/image";
import Link from "next/link";

export default function LearnGardenClub() {
  return (
    <section className="bg-dark-green rounded-[40px] overflow-hidden w-full">
      {/* Mobile */}
      <div className="flex flex-col gap-[15px] items-center justify-center px-[38px] py-[37px] lg:hidden">
        <Link href="/loyalty/" className="relative w-[340px] h-[67px]">
          <Image
            src="/rewards/garden-club-text.png"
            alt="Garden Club"
            fill
            sizes="340px"
            className="object-contain"
          />
        </Link>

        <div className="text-center text-white">
          <p className="font-poppins-bold text-[30px] uppercase">
            $1 Spent = 1 Point
          </p>
          <p className="font-poppins-regular text-[18px] mt-3">
            Points add up automatically when you use your phone number or email
            at checkout. You must be subscribed to our marketing communications
            to be in the Garden Club.
          </p>
        </div>

        <Link
          href="/loyalty/#signup"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-[25px] py-[14px] rounded-full hover:opacity-90 transition-opacity w-[342px] h-[50px] flex items-center justify-center"
        >
          Start Earning
        </Link>

        <div className="relative w-[340px] h-[231px] rounded-[30px] overflow-hidden">
          <Image
            src="/rewards/garden-club-photo.jpg"
            alt="Sweetleaves store event"
            fill
            sizes="340px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex gap-[60px] items-center justify-end px-5 py-2.5 min-h-[372px]">
        <div className="flex flex-col gap-5 items-start flex-1 min-w-0">
          <Link href="/loyalty/" className="relative w-full max-w-[525px] h-[104px]">
            <Image
              src="/rewards/garden-club-text.png"
              alt="Garden Club"
              fill
              sizes="525px"
              className="object-contain"
            />
          </Link>

          <p className="font-poppins-regular text-[18px] text-white max-w-[472px]">
            Earn points with every purchase and get exclusive access to new
            products and giveaways.
          </p>

          <Link
            href="/loyalty/#signup"
            className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-[25px] py-[14px] rounded-full hover:opacity-90 transition-opacity w-[250px] h-[50px] flex items-center justify-center"
          >
            Sign Up
          </Link>
        </div>

        <div className="relative w-[40%] min-w-[280px] aspect-[625/330] rounded-[30px] overflow-hidden">
          <Image
            src="/rewards/garden-club-photo.jpg"
            alt="Sweetleaves store event"
            fill
            sizes="(min-width: 1280px) 625px, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
