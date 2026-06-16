interface StepProps {
  num: number;
  title: string;
  description: string;
}

function Step({ num, title, description }: StepProps) {
  return (
    <div className="flex gap-4 items-start">
      <span className="shrink-0 bg-light-gold text-dark-green rounded-full size-[42px] flex items-center justify-center font-poppins-bold text-xl leading-none">
        {num}
      </span>
      <div className="pt-1.5">
        <p className="font-poppins-bold text-lg text-white leading-tight">{title}</p>
        <p className="font-poppins-regular text-base text-white/80 mt-1 leading-[1.45]">{description}</p>
      </div>
    </div>
  );
}

const PHYSICIAN_STEPS: StepProps[] = [
  {
    num: 1,
    title: "Schedule a Consultation",
    description:
      "Book an appointment with your primary care physician or another qualified healthcare provider.",
  },
  {
    num: 2,
    title: "Complete the Certification",
    description:
      "Your physician evaluates your eligibility for a qualifying medical condition and completes the necessary certification.",
  },
  {
    num: 3,
    title: "Pay the Certification Fee",
    description: "Once certification is complete, you'll pay the associated fee directly with your provider.",
  },
];

const REGISTRY_STEPS: StepProps[] = [
  {
    num: 1,
    title: "Wait for Your Approval Email",
    description:
      "After certification, you'll receive a confirmation email with instructions to register in the Patient Portal.",
  },
  {
    num: 2,
    title: "Create Your Account",
    description: "Follow the link in the email to create your account in the Minnesota Medical Cannabis Registry.",
  },
  {
    num: 3,
    title: "Complete Enrollment",
    description: "Finish the registry enrollment process and you're ready to shop at Sweetleaves.",
  },
];

export default function HowToCertify() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <span className="bg-light-gold text-dark-green font-poppins-semibold text-xs uppercase tracking-[0.1em] px-4 py-1.5 rounded-full">
          Step-by-Step
        </span>
        <h2 className="font-poppins-bold text-3xl md:text-display text-white leading-[0.95]">
          How to Get Certified
        </h2>
        <p className="font-poppins-regular text-lg text-white/80 max-w-2xl leading-relaxed">
          Minnesota&apos;s Department of Health oversees the Medical Cannabis program.
          You must have a{" "}
          <a
            href="https://mn.gov/ocm/dmc/patients/the-basics/qualifying-medical-condition.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-gold underline hover:opacity-80 transition-opacity"
          >
            qualifying medical condition
          </a>{" "}
          to be eligible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {/* Veteran shortcut */}
        <div className="bg-white/10 rounded-[30px] p-6 flex flex-col gap-3 lg:max-w-[280px] shrink-0">
          <span className="font-poppins-bold text-lg text-light-gold">Are You a Veteran?</span>
          <p className="font-poppins-regular text-base text-white/80 leading-[1.45]">
            Veterans can{" "}
            <a
              href="https://cannabis.web.health.state.mn.us/enrollment/veteran/certify.xhtml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-gold underline hover:opacity-80 transition-opacity"
            >
              self-certify with the state for free
            </a>{" "}
            — no physician visit required. Skip straight to the registry steps.
          </p>
        </div>

        {/* Steps columns */}
        <div className="flex flex-col md:flex-row gap-5 flex-1">
          <div className="flex flex-col gap-5 flex-1">
            <p className="font-poppins-bold text-base text-white/60 uppercase tracking-[0.08em]">
              Physician Certification
            </p>
            <div className="flex flex-col gap-5">
              {PHYSICIAN_STEPS.map((s) => (
                <Step key={s.num} {...s} />
              ))}
            </div>
          </div>

          <div className="hidden md:block w-px bg-white/10 self-stretch" />

          <div className="flex flex-col gap-5 flex-1">
            <p className="font-poppins-bold text-base text-white/60 uppercase tracking-[0.08em]">
              Registry Enrollment
            </p>
            <div className="flex flex-col gap-5">
              {REGISTRY_STEPS.map((s) => (
                <Step key={s.num} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
