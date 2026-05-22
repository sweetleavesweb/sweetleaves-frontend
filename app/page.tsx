import type { Metadata } from "next";
import {
  HomeHero,
  ProductGrid,
  DealsBanner,
  StorePhoto,
  ReviewsSection,
  BlogSection,
  GardenClubPromo,
} from "./components/home";
import FaqSection from "./components/FaqSection";
import { getCommonFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "Recreational Cannabis Dispensary in Minneapolis, MN | Sweetleaves",
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
        <DealsBanner />
        <StorePhoto
          src="/home/store-exterior.png"
          alt="Sweetleaves dispensary exterior"
        />

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-[30px]">
          <ReviewsSection />
          <BlogSection />
        </div>

        <GardenClubPromo />
        <StorePhoto
          src="/home/store-interior.png"
          alt="Sweetleaves dispensary interior"
        />
        <FaqSection faqs={commonFaqs} />
      </div>
    </div>
  );
}
