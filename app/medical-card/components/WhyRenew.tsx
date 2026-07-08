import BenefitCard, { type BenefitProps } from "./BenefitCard";
import { TaxIcon, CalendarIcon, ChatIcon, InfinityIcon } from "./icons";

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
        <h2 className="font-poppins-bold text-3xl md:text-display text-white leading-10 md:leading-14">
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
          <BenefitCard key={b.title} {...b} dark />
        ))}
      </div>
    </section>
  );
}
