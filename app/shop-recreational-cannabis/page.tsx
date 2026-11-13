import type { Metadata } from "next";
import DutchieEmbed from "../components/DutchieEmbed";
import { REC_SCRIPT_SRC, dutchieEmbedProps } from "@/lib/dutchie";

export const metadata: Metadata = {
  title: "Shop Recreational Cannabis",
  alternates: { canonical: "/shop-recreational-cannabis/" },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopPage({ searchParams }: Props) {
  return (
    <div className="flex flex-col flex-1 md:max-w-[1365px] md:mx-auto md:px-6 md:py-8">
      <h1 className="px-4 pt-6 pb-2 md:px-0 font-poppins-bold text-[35px] md:text-[55px] text-dark-green leading-tight">
        Recreational Cannabis
      </h1>
      <div className="flex-1 pb-8">
        <DutchieEmbed scriptSrc={REC_SCRIPT_SRC} {...dutchieEmbedProps(await searchParams)} />
      </div>
    </div>
  );
}
