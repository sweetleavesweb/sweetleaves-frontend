import type { Metadata } from "next";
import {
  HomeHero,
  ProductGrid,
  DealsBanner,
  DeliveryBanner,
  StorePhoto,
  ReviewsSection,
  BlogSection,
} from "./components/home";
import GardenClubPromo from "./components/GardenClubPromo";
import FaqSection from "./components/FaqSection";
import { getCommonFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "Medical & Recreational Cannabis Dispensary in Minnesota | Sweetleaves",
  },
  description:
    "Redefine your recreational cannabis at Sweetleaves, your trusted dispensary in Minneapolis, Minnesota. Shop quality products for all your cannabis needs.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const commonFaqs = await getCommonFaqs();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
        <HomeHero />
        <ProductGrid />
        <DeliveryBanner />
        <DealsBanner />

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-[30px]">
          <ReviewsSection />
          <BlogSection />
        </div>

        <GardenClubPromo description="Points add up automatically when you use your phone number or email at checkout. You must be subscribed to our marketing communications to be in the Garden Club." />
        <StorePhoto
          src="/home/store-interior.png"
          alt="Sweetleaves dispensary interior"
        />
        <FaqSection faqs={commonFaqs} />
      </div>
    </div>
  );
}
