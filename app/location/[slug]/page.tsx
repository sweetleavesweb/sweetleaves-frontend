import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_FAQ_QUESTIONS, locationHref, locations } from "@/lib/locations";
import { getFaqsByQuestion } from "@/lib/faq";
import FaqSection from "@/app/components/FaqSection";
import GardenClubPromo from "@/app/components/GardenClubPromo";
import HowToShop from "@/app/components/HowToShop";
import AboutLocation from "../components/AboutLocation";
import FindUs from "../components/FindUs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical: locationHref(location.slug) },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const faqs = await getFaqsByQuestion(LOCATION_FAQ_QUESTIONS);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
        <section className="flex flex-col gap-1 items-center justify-center px-10 py-8 md:py-10">
          <h1 className="font-poppins-regular text-[23px] md:text-[25px] text-dark-green text-center leading-[0.9]">
            {location.eyebrow}
          </h1>
          <h2 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-tight">
            Sweetleaves {location.name}
          </h2>
        </section>
        <FindUs location={location} />
        <AboutLocation location={location} />
        <HowToShop />
        <GardenClubPromo description={location.gardenClubDescription} />
        {faqs.length > 0 && <FaqSection faqs={faqs} />}
      </div>
    </div>
  );
}
