import type { Metadata } from "next";
import ContactCard from "./components/ContactCard";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sweetleaves or visit our Minnesota dispensary locations for medical and recreational cannabis, expert guidance, and easy online ordering for pickup or local delivery.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
        <section className="flex flex-col items-center justify-center px-10 py-8 md:py-10">
          <h1 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-[0.9]">
            Contact Sweetleaves
          </h1>
        </section>
        <ContactCard />
      </div>
    </div>
  );
}
