import type { Metadata } from "next";
import GardenClubHero from "./components/GardenClubHero";
import PointsInfo from "./components/PointsInfo";
import SignUpSection from "./components/SignUpSection";
import FaqSection from "./components/FaqSection";
import { getFaqsBySection } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Loyalty",
  description:
    "Join the Sweetleaves Garden Club. Earn points on every purchase and enjoy exclusive perks, birthday rewards, and more.",
  alternates: { canonical: "/loyalty/" },
};

export default async function RewardsPage() {
  const gardenClubFaqs = await getFaqsBySection("garden-club-loyalty");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-8">
        <GardenClubHero />
yooopopoooo
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          <div className="flex-1 min-w-0">
            <PointsInfo />
          </div>
          <div className="flex-1">
            <SignUpSection />
          </div>
        </div>

        <FaqSection faqs={gardenClubFaqs} />
      </div>
    </div>
  );
}
