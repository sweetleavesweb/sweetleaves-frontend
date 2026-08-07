import type { Metadata } from "next";
import Image from "next/image";
import { getCoaBatches, groupBatchesByFlavor } from "@/lib/coa";
import ViewReportButton from "./components/ViewReportButton";
import SubBatchPills from "./components/SubBatchPills";

export const metadata: Metadata = {
  title: "Certificates of Analysis",
  description:
    "Every Sweetleaves batch is independently tested by an ISO-accredited third-party lab for potency, residual solvents, pesticides, heavy metals, and microbials.",
  alternates: { canonical: "/certificate-of-analysis/" },
};

export default async function CoaPage() {
  const batches = await getCoaBatches();
  const groups = groupBatchesByFlavor(batches);
  const batchLookup = new Map(batches.map((b) => [b.batchNumber, b]));

  return (
    <div className="font-poppins">
      {/* Hero */}
      <section className="text-center pt-[70px] pb-[40px] px-5 max-w-[880px] mx-auto">
        <div className="text-[13px] tracking-[0.14em] uppercase text-dark-sage font-semibold">
          Lab Results
        </div>
        <h1 className="font-poppins-bold text-[44px] sm:text-[55px] lg:text-[66px] text-dark-green mt-[10px] mb-5">
          Certificates of Analysis
        </h1>
        <p className="text-[16px] leading-[1.55] text-dark-sage max-w-[680px] mx-auto mb-[30px]">
          Every Sweetleaves batch is independently tested by an ISO-accredited
          third-party lab for potency, residual solvents, pesticides, heavy
          metals, and microbials. Find your batch below by product SKU.
        </p>
      </section>

      {/* Product list */}
      <section className="max-w-[1100px] mx-auto px-5 pt-5 pb-10 flex flex-col gap-[18px]">
        {groups.map((group) => (
          <div
            key={group.flavor}
            className="bg-white rounded-3xl overflow-hidden border border-dark-green/[0.08]"
          >
            {/* Product header */}
            <div className="grid grid-cols-[72px_1fr] gap-[18px] items-center px-6 py-5 border-b border-dark-green/10 max-sm:grid-cols-[56px_1fr]">
              <div
                className="w-[72px] h-[72px] rounded-2xl grid place-items-center overflow-hidden shrink-0 max-sm:w-[56px] max-sm:h-[56px]"
                style={{ background: group.meta.halo }}
              >
                <Image
                  src={`/products/gummies/${group.meta.imageSlug}.png`}
                  alt={group.meta.displayName}
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-2xl font-bold text-dark-green leading-[1.1]">
                {group.meta.displayName}
              </div>
            </div>

            {/* Batch rows */}
            <div className="flex flex-col">
              {group.batches.map((batch, i) => (
                <div
                  key={batch.batchNumber}
                  className={`px-6 py-[18px] max-sm:px-[18px] max-sm:py-[14px]${
                    i < group.batches.length - 1
                      ? " border-b border-dark-green/[0.08]"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-[14px] text-dark-sage max-sm:text-[13px]">
                      Batch{" "}
                      <span className="font-mono text-[15px] text-dark-green font-semibold ml-1.5">
                        {batch.batchNumber}
                      </span>
                    </div>
                    {batch.pdfUrl && <ViewReportButton pdfUrl={batch.pdfUrl} />}
                  </div>
                  {batch.subBatches.length > 0 && (
                    <SubBatchPills
                      subBatchNumbers={batch.subBatches}
                      batchLookup={batchLookup}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer note */}
      <section className="max-w-[880px] mx-auto mt-[30px] mb-[80px] px-5">
        <div className="bg-dark-green text-white rounded-[28px] px-10 py-9">
          <h3 className="font-poppins-bold text-[22px] text-light-gold mb-2.5">
            Why we test every batch
          </h3>
          <p className="text-[14px] leading-[1.55] opacity-[0.88]">
            Because you deserve to know what you&apos;re putting in your body.
            Our COAs confirm cannabinoid content within ±10% of label and
            screen for 60+ contaminants. Can&apos;t find the batch on your
            bag? Email{" "}
            <a
              href="mailto:info@sweetleaves.co"
              className="text-light-gold underline"
            >
              info@sweetleaves.co
            </a>{" "}
            with the lot number and we&apos;ll send the report directly.
          </p>
        </div>
      </section>
    </div>
  );
}
