import Step, { type StepProps } from "./Step";
import VeteranShortcut from "./VeteranShortcut";

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
        <h2 className="font-poppins-bold text-3xl md:text-display text-dark-green leading-10 md:leading-14">
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
          href="mailto:medical@sweetleavesnorthloop.com"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          Chat With Us
        </a>
      </div>
    </section>
  );
}
