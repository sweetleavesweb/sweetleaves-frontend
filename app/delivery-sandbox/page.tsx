import type { Metadata } from "next";
import DutchieEmbed from "../components/DutchieEmbed";
import UrlReadout from "./UrlReadout";

// THROWAWAY SPIKE: delete once delivery embed params are settled.

export const metadata: Metadata = {
  title: "Delivery Sandbox",
  robots: { index: false, follow: false },
};

const SCRIPT_SRC = "https://dutchie.com/api/v2/embedded-menu/6ad7ca150ded88f0bb5e6c98.js";

const PRESETS = [
  { label: "Rec: chain + preview", href: "/delivery-sandbox/?preview=1" },
  { label: "Rec: plain + preview", href: "/delivery-sandbox/?script=plain&preview=1" },
  { label: "Med: plain + preview", href: "/delivery-sandbox/?menu=med&script=plain&preview=1" },
  { label: "Rec (no params)", href: "/delivery-sandbox/" },
  { label: "Rec: plain script", href: "/delivery-sandbox/?script=plain" },
  { label: "Med (no params)", href: "/delivery-sandbox/?menu=med" },
  { label: "Med: plain script", href: "/delivery-sandbox/?menu=med&script=plain" },
  { label: "Rec: skip to store", href: "/delivery-sandbox/?dtche%5Blocation%5D=sweetleaves-test-sandbox" },
  { label: "Med: skip to store", href: "/delivery-sandbox/?menu=med&dtche%5Blocation%5D=sweetleaves-test-sandbox" },
];

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DeliverySandboxPage({ searchParams }: Props) {
  const params = await searchParams;
  const isMed = params.menu === "med";
  const isPlain = params.script === "plain";
  const isPreview = params.preview === "1";
  const scriptParams = new URLSearchParams();
  if (!isPlain) {
    scriptParams.set("chainLocations", "true");
    scriptParams.set("searchMethod", "deliveryArea");
  }
  if (isMed) scriptParams.set("menuType", "med");
  if (isPreview) scriptParams.set("previewMode", "true");
  const scriptSrc = scriptParams.size ? `${SCRIPT_SRC}?${scriptParams}` : SCRIPT_SRC;
  const dutchieParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => key.startsWith("dtche"))
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : (value ?? "")])
  );

  return (
    <div className="flex flex-col flex-1 md:max-w-[1365px] md:mx-auto md:px-6 md:py-8">
      <div className="px-4 pt-6 pb-4 md:px-0 flex flex-col gap-3">
        <h1 className="font-poppins-bold text-[35px] text-dark-green">
          Delivery Sandbox ({isMed ? "Med" : "Rec"}, {isPlain ? "plain" : "chain"}{isPreview ? ", preview" : ""})
        </h1>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <a key={preset.href} href={preset.href} className="px-3 py-1 rounded-full bg-dark-green text-ivory text-sm">
              {preset.label}
            </a>
          ))}
        </div>
        <UrlReadout />
      </div>
      <div className="flex-1 pb-8">
        <DutchieEmbed
          scriptSrc={scriptSrc}
          dutchieParams={Object.keys(dutchieParams).length ? dutchieParams : undefined}
        />
      </div>
    </div>
  );
}
