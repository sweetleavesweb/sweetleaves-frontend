import type { ReactNode } from "react";

interface BenefitProps {
  title: string;
  description: ReactNode;
  icon: ReactNode;
}

const iconClass = "size-6 text-dark-green";

const TaxIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

const PriorityIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CalendarIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
  </svg>
);

const PlaneIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z" />
  </svg>
);

const ChatIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12a8 8 0 1 1 3.2 6.4L3 20l1.2-4.2A8 8 0 0 1 4 12z" />
    <circle cx="8.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const InfinityIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 12c0-2.2 1.7-4 3.8-4 1.5 0 2.6.9 3.7 2.3 1.4 1.7 2.5 3.7 4.7 3.7 2.1 0 3.8-1.8 3.8-4s-1.7-4-3.8-4c-1.5 0-2.6.9-3.7 2.3-1.4 1.7-2.5 3.7-4.7 3.7C7.2 16 5.5 14.2 5.5 12z" />
  </svg>
);

function BenefitCard({ title, description, icon }: BenefitProps) {
  return (
    <div className="bg-white rounded-[30px] p-5 flex flex-col gap-3.5">
      <div className="bg-light-gold rounded-full size-12 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-poppins-bold text-lg text-dark-green leading-tight">{title}</p>
        <p className="font-poppins-regular text-base text-dark mt-1 leading-[1.45]">{description}</p>
      </div>
    </div>
  );
}

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
          Why Get Your Medical Cannabis Certification in Minnesota?
        </h2>
        <p className="font-poppins-regular text-lg text-dark max-w-2xl leading-relaxed mt-2">
          Having your medical cannabis certification opens the door to a variety of perks
          when you shop with us at{" "}
          <a
            href="https://sweetleavesnorthloop.com/shop-now/"
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
