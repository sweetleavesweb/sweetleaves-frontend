import type { Metadata } from "next";
import { getFaqSections, LOCATIONS_FAQ_SECTION } from "@/lib/faq";
import FaqAccordion from "./components/FaqAccordion";
import CareersCard from "./components/CareersCard";
import StillHaveQuestionsCard from "./components/StillHaveQuestionsCard";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Sweetleaves Cannabis in Minneapolis — shopping, products, laws, and more.",
  alternates: { canonical: "/faqs/" },
};

export default async function FaqPage() {
  const sections = (await getFaqSections()).filter(
    (section) => section.slug !== LOCATIONS_FAQ_SECTION
  );

  return (
    <div className="max-w-[1366px] mx-auto px-[20px] md:px-[37px] py-8 flex flex-col gap-[30px] items-center">
      <h1 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-[0.9]">
        Frequently Asked Questions
      </h1>

      <FaqAccordion sections={sections} />
      {/* <CareersCard /> */}
      <StillHaveQuestionsCard />
    </div>
  );
}
