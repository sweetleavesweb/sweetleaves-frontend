import type { Metadata } from "next";
import DutchieEmbed from "../components/DutchieEmbed";

export const metadata: Metadata = {
  title: "Shop Med",
  alternates: { canonical: "/shop-med/" },
};

const MED_SCRIPT_SRC =
  "https://dutchie.com/api/v2/embedded-menu/6a3096683cf9ab736cb06f1b.js?menuType=med";

export default function ShopMedPage() {
  return (
    <div className="min-h-screen p-8">
      <DutchieEmbed scriptSrc={MED_SCRIPT_SRC} />
    </div>
  );
}
