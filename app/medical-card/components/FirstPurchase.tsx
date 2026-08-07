import Link from "next/link";
import Step, { type StepProps } from "./Step";

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
    href: "https://outlook.office.com/book/Sweetleaves@sweetleavesnorthloop.com/?ismsaljsauthenabled",
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
    href: "/loyalty/"
  },
];

export default function FirstPurchase() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-dark-green leading-10 md:leading-14">
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
        <a
          href="mailto:medical@sweetleaves.co"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Email Us
        </a>
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
