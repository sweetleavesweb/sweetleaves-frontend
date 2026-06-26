import type { ReactNode } from "react";

interface BenefitProps {
  title: string;
  description: string;
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

const CalendarIcon = (
  <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
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
    <div className="bg-white/10 rounded-[30px] p-5 flex gap-4 items-start">
      <span className="shrink-0 bg-light-gold rounded-full size-12 flex items-center justify-center">
        {icon}
      </span>
      <div>
        <p className="font-poppins-bold text-lg text-white leading-tight">{title}</p>
        <p className="font-poppins-regular text-base text-white/80 mt-1 leading-[1.45]">{description}</p>
      </div>
    </div>
  );
}

const BENEFITS: BenefitProps[] = [
  {
    icon: TaxIcon,
    title: "Pay Fewer Taxes",
    description:
      "Continuing your patient status means you still skip the 15% state cannabis excise tax and remain fully exempt from the standard 6.875% state and local sales taxes.",
  },
  {
    icon: CalendarIcon,
    title: "3-Year Enrollment",
    description: "Your renewed MN Medical Cannabis enrollment is good for three more years.",
  },
  {
    icon: ChatIcon,
    title: "Free Pharmacist Consults",
    description: "Keep getting one-on-one product consults to find what works best.",
  },
  {
    icon: InfinityIcon,
    title: "Unlimited Possession",
    description: "No 90-day supply cap or possession limits as long as you stay enrolled.",
  },
];

export default function WhyRenew() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col gap-7 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-white leading-[0.95]">
          Why Renew Your Certification in Minnesota?
        </h2>
        <p className="font-poppins-regular text-lg text-white/80 max-w-2xl leading-relaxed mt-2">
          As a valued member of the Sweetleaves family, we want your experience to stay
          seamless when you renew. Renewing keeps all of these perks rolling — don&apos;t let
          them lapse, or you won&apos;t be able to pick up medical cannabis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        {BENEFITS.map((b) => (
          <BenefitCard key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}
