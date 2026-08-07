import type { Metadata } from "next";
import Image from "next/image";
import RewardsChecker from "./components/RewardsChecker";

export const metadata: Metadata = {
  title: "Check Your Rewards",
  description:
    "Check your Sweetleaves Garden Club points balance and see which rewards you can redeem on your next visit.",
  alternates: { canonical: "/loyalty/rewards/" },
  robots: { index: false, follow: true },
};

export default function CheckRewardsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-8">
        <section className="bg-dark-green rounded-[40px] flex flex-col items-center justify-center px-6 py-8 md:px-10 md:py-10">
          <Image
            src="/rewards/garden-club-text.png"
            alt="Garden Club"
            width={490}
            height={86}
            className="max-w-full h-auto"
          />
          <h1 className="font-poppins-bold text-3xl md:text-display text-white text-center">
            Check Your Rewards
          </h1>
        </section>

        <RewardsChecker />
      </div>
    </div>
  );
}
