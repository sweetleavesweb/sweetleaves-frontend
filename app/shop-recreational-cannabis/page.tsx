import type { Metadata } from "next";
import DutchieEmbed from "../components/DutchieEmbed";

export const metadata: Metadata = {
  title: "Shop Recreational Cannabis",
  alternates: { canonical: "/shop-recreational-cannabis/" },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const dutchieParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => key.startsWith("dtche"))
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : (value ?? "")])
  );

  return (
    <div className="min-h-screen p-8">
      <h1 className="font-poppins-bold text-[35px] md:text-[55px] text-dark-green leading-tight">
        Recreational Cannabis
      </h1>
      <DutchieEmbed dutchieParams={Object.keys(dutchieParams).length ? dutchieParams : undefined} />
    </div>
  );
}
