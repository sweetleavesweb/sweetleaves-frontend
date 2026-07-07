import BenefitCard, { type BenefitProps } from "./BenefitCard";
import { TaxIcon, PriorityIcon, CalendarIcon, PlaneIcon, ChatIcon, InfinityIcon } from "./icons";

const BENEFITS: BenefitProps[] = [
  {
    icon: TaxIcon,
    title: "Pay Fewer Taxes",
    description:
      "Enrolled patients skip the 15% state cannabis excise tax on qualifying medical products — and are entirely exempt from the standard 6.875% state and local sales taxes. Every visit.",
  },
  {
    icon: PriorityIcon,
    title: "Priority Service",
    description:
      "Skip the line and enjoy priority service whenever you visit our dispensaries.",
  },
  {
    icon: CalendarIcon,
    title: "3-Year Enrollment",
    description:
      "As of July 1, 2024, your MN Medical Cannabis enrollment is valid for three years.",
  },
  {
    icon: PlaneIcon,
    title: "Legal Travel Within the U.S.",
    description: (
      <>
        <a
          href="https://www.tsa.gov/travel/security-screening/whatcanibring/items/medical-marijuana"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-glow underline hover:opacity-80 transition-opacity"
        >
          TSA
        </a>{" "}
        now permits medical patients to travel with their medication.
      </>
    ),
  },
  {
    icon: ChatIcon,
    title: "Free Pharmacist Consults",
    description:
      "Free, one-on-one product consults with our pharmacists to find what fits you best.",
  },
  {
    icon: InfinityIcon,
    title: "Unlimited Possession",
    description: "No more 90-day supply cap or possession limits for medical patients.",
  },
];

export default function WhyCertify() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-7 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-dark-green leading-[0.95]">
          Benefits
        </h2>
        <p className="font-poppins-regular text-lg text-dark max-w-2xl leading-relaxed mt-2">
          Having your medical cannabis certification opens the door to a variety of perks
          when you shop with us at{" "}
          <a
            href="/shop-med/"
            className="text-orange-glow underline hover:opacity-80 transition-opacity"
          >
            Sweetleaves
          </a>
          . Here are the top benefits you&apos;ll enjoy as a patient.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
        {BENEFITS.map((b) => (
          <BenefitCard key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}
