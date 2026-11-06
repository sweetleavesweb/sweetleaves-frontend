import type { Metadata } from "next";
import AboutIntro from "./components/AboutIntro";
import HowToShop from "../components/HowToShop";
import WhatWeStandFor from "./components/WhatWeStandFor";
import FaqSection from "../components/FaqSection";
import { getCommonFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sweetleaves, a recreational cannabis dispensary in Minnesota. Cannabis for real people.",
  alternates: { canonical: "/about-us/" },
};

export default async function AboutPage() {
  const commonFaqs = await getCommonFaqs();

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
        <section className="flex flex-col items-center justify-center px-10 py-8 md:py-10">
          <h1 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-[0.9]">
            Cannabis for Real People
          </h1>
        </section>
        <AboutIntro />
        <HowToShop />
        <WhatWeStandFor />
        <FaqSection faqs={commonFaqs} />
      </div>
    </div>
  );
}
