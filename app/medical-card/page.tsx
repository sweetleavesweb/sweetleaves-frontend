import type { Metadata } from "next";
import GuideRecap from "./components/GuideRecap";
import WhyCertify from "./components/WhyCertify";
import HowToCertify from "./components/HowToCertify";
import FirstPurchase from "./components/FirstPurchase";
import WhyRenew from "./components/WhyRenew";
import HowToRenew from "./components/HowToRenew";

export const metadata: Metadata = {
  title: "Medical Cannabis Card",
  description:
    "Your complete guide to medical cannabis certification, registry enrollment, and renewal — written for Minnesota patients shopping with Sweetleaves.",
  alternates: { canonical: "/medical-card/" },
};

export default function MedicalCardPage() {
  return (
    <div className="max-w-[1365px] mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
      <section className="flex flex-col items-center justify-center px-10 py-8 md:py-10 gap-3">
        <h1 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green text-center leading-[0.9]">
          Getting Your Medical Cannabis Card in Minnesota
        </h1>
        <p className="font-poppins-regular text-lg text-dark max-w-2xl text-center leading-relaxed">
          Your complete guide to certification, registry enrollment, and renewal —
          written for Minnesota patients shopping with Sweetleaves.
        </p>
      </section>

      <WhyCertify />
      <HowToCertify />
      <FirstPurchase />

      <div className="flex items-center gap-4 px-2">
        <span className="font-poppins-bold text-sm text-orange-glow uppercase tracking-[0.15em] whitespace-nowrap">
          Part 2 — Renewing
        </span>
        <span className="flex-1 h-px bg-sage/40" />
      </div>

      <WhyRenew />
      <HowToRenew />

      <GuideRecap />
    </div>
  );
}
