import Step, { type StepProps } from "./Step";
import VeteranShortcut from "./VeteranShortcut";

const PHYSICIAN_STEPS: StepProps[] = [
  {
    num: 1,
    title: "Schedule a Consultation",
    description:
      "Book an appointment with your primary care physician, or email us below for access to our NuggMD partnership discount. With NuggMD, you'll speak with a licensed cannabis doctor online from 8 AM - 10 PM, 7 days a week.",
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
    description:
      "Once certification is complete, you'll pay the associated fee directly with your provider. If you opted to work with Nugg, you'll get a discount code for your membership.",
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
    description:
      "Follow the link in the email to create your account in the Minnesota Medical Cannabis Registry.",
  },
  {
    num: 3,
    title: "Complete Enrollment",
    description:
      "Finish the registry enrollment process and you're ready to shop at Sweetleaves.",
  },
];

export default function HowToCertify() {
  return (
    <section className="bg-dark-green rounded-[40px] flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="font-poppins-bold text-3xl md:text-display text-white leading-10 md:leading-14">
          How to Get Certified
        </h2>
        <p className="font-poppins-regular text-lg text-white/80 max-w-2xl leading-relaxed mt-2">
          Minnesota&apos;s Department of Health oversees the Medical Cannabis
          program. You must have a{" "}
          <a
            href="https://mn.gov/ocm/dmc/patients/the-basics/qualifying-medical-condition.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-gold underline hover:opacity-80 transition-opacity"
          >
            qualifying medical condition
          </a>{" "}
          to be eligible. There are two steps in the sign up process, Physician
          Certification and Registry Enrollment.
        </p>
      </div>

      <VeteranShortcut skipTo="the registry steps."/>

      <div className="flex flex-col lg:flex-row gap-5 w-full px-4">
        {/* Steps columns */}
        <div className="flex flex-col md:flex-row gap-5 flex-1">
          <div className="flex flex-col gap-5 flex-1">
            <p className="font-poppins-bold text-base text-white/60 uppercase tracking-[0.08em]">
              Physician Certification
            </p>
            <div className="flex flex-col gap-5">
              {PHYSICIAN_STEPS.map((s) => (
                <Step key={s.num} {...s} dark />
              ))}
              <a
                href="mailto:medical@sweetleaves.co"
                className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
              >
                Email Us
              </a>
            </div>
          </div>

          <div className="hidden md:block w-px bg-white/10 self-stretch" />

          <div className="flex flex-col gap-5 flex-1">
            <p className="font-poppins-bold text-base text-white/60 uppercase tracking-[0.08em]">
              Registry Enrollment with the State
            </p>
            <div className="flex flex-col gap-5 flex-1">
              {REGISTRY_STEPS.map((s) => (
                <Step key={s.num} {...s} dark />
              ))}
              <a
                href="https://cannabis.web.health.state.mn.us/login.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center mt-auto"
              >
                Visit Patient Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
