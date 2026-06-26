import Link from "next/link";

interface StepProps {
  num: number;
  title: string;
  description?: string;
  href?: string;
}

function Step({ num, title, description, href }: StepProps) {
  return (
    <div className="flex gap-4 items-start">
      <span className="shrink-0 bg-orange-glow text-white rounded-full size-[42px] flex items-center justify-center font-poppins-bold text-xl leading-none">
        {num}
      </span>
      <div className="pt-1.5">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins-bold text-lg text-dark-green underline decoration-dark-green decoration-2 underline-offset-2 hover:text-orange-glow hover:decoration-orange-glow transition-colors leading-tight"
          >
            {title}
          </a>
        ) : (
          <p className="font-poppins-bold text-lg text-dark-green leading-tight">{title}</p>
        )}
        {description && (
          <p className="font-poppins-regular text-base text-dark mt-1 leading-[1.45]">{description}</p>
        )}
      </div>
    </div>
  );
}

const STEPS: StepProps[] = [
  {
    num: 1,
    title: "Complete your Self-Evaluation",
    description:
      "Log into your patient portal and complete the self-evaluation — it's required once per quarter.",
    href: "https://cannabis.web.health.state.mn.us/login.xhtml"
  },
  {
    num: 2,
    title: "Schedule your pharmacist appointment",
    description:
      "Book a required consultation with a Sweetleaves pharmacist to register for medication dispensation.",
    href: "https://bookings.cloud.microsoft/book/Sweetleaves@sweetleavesnorthloop.com/?ismsaljsauthenabled",
  },
  {
    num: 3,
    title: "Select the medical menu",
    description:
      "When browsing products, make sure you've selected the medical menu to see patient pricing.",
  },
  {
    num: 4,
    title: "Place your order",
    description: "Browse the medical menu on our website and place your order.",
  },
  {
    num: 5,
    title: "Gather your documents",
    description: "Bring your government-issued ID and your digital Medical Card to the store.",
  },
  {
    num: 6,
    title: "Bring payment",
    description: "We accept cash or debit card for all purchases.",
  },
  {
    num: 7,
    title: "Join the Garden Club",
    description: "Earn points on every purchase and unlock exclusive perks and savings.",
    href: "/loyalty"
  },
];

export default function FirstPurchase() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-dark-green leading-[0.95]">
          Preparing for Your First Purchase
        </h2>
        <p className="font-poppins-regular text-lg text-dark max-w-2xl leading-relaxed mt-2">
          Before your first visit to Sweetleaves as a medical patient, here&apos;s what to do.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
        {STEPS.map((s) => (
          <Step key={s.num} {...s} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contact/"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Request Card Assistance
        </Link>
        <Link
          href="/loyalty/"
          className="bg-dark-green text-white font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Join the Garden Club
        </Link>
      </div>
    </section>
  );
}
