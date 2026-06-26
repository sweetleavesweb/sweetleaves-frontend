import Link from "next/link";
import VeteranShortcut from "./VeteranShortcut";

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
            className="font-poppins-bold text-lg text-dark-green underline decoration-light-gold decoration-2 underline-offset-2 hover:text-orange-glow transition-colors leading-tight"
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
    title: "Schedule a recertification appointment",
    description: "Book with your primary care physician or another qualified healthcare provider.",
  },
  {
    num: 2,
    title: "Pay the recertification fee",
    description: "Complete payment with your provider after the appointment.",
  },
  {
    num: 3,
    title: "Open the email from the Registry",
    description: "After your certification appointment, watch for the renewal email from the state.",
  },
  {
    num: 4,
    title: "Log in and complete your renewal",
    description: "Use the link in the email to log into the registry and finish your re-enrollment.",
    href: "https://cannabis.web.health.state.mn.us/login.xhtml",
  },
];

export default function HowToRenew() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-dark-green leading-[0.95]">
          How to Renew
        </h2>
        <p className="font-poppins-regular text-lg text-dark max-w-2xl leading-relaxed mt-2">
          Patients must re-enroll every three years. The state sends reminders 60 and 30 days
          before your enrollment expires — follow these steps to stay covered.
        </p>
      </div>

      {/* Veteran shortcut */}
      <VeteranShortcut dark skipTo="step 3."/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
        {STEPS.map((s) => (
          <Step key={s.num} {...s} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="mailto:info@sweetleavesnorthloop.com"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Chat With Us
        </a>
      </div>
    </section>
  );
}
