import type { Metadata } from "next";
import DutchieEmbed from "../components/DutchieEmbed";

export const metadata: Metadata = {
  title: "Shop Recreational Cannabis",
  alternates: { canonical: "/shop-recreational-cannabis/" },
};

// Dutchie's multi-location embed: lets dtche[location] preselect a store.
const CHAIN_SCRIPT_PARAMS = { chainLocations: "true" };
// Opens on the delivery address search, which picks the store by address.
const DELIVERY_SCRIPT_PARAMS = { ...CHAIN_SCRIPT_PARAMS, searchMethod: "deliveryArea" };

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
  const scriptParams =
    params.delivery === "1"
      ? DELIVERY_SCRIPT_PARAMS
      : dutchieParams["dtche[location]"]
        ? CHAIN_SCRIPT_PARAMS
        : undefined;

  return (
    <div className="flex flex-col flex-1 md:max-w-[1365px] md:mx-auto md:px-6 md:py-8">
      <h1 className="px-4 pt-6 pb-2 md:px-0 font-poppins-bold text-[35px] md:text-[55px] text-dark-green leading-tight">
        Recreational Cannabis
      </h1>
      <div className="flex-1 pb-8">
        <DutchieEmbed
          dutchieParams={Object.keys(dutchieParams).length ? dutchieParams : undefined}
          scriptParams={scriptParams}
        />
      </div>
    </div>
  );
}
