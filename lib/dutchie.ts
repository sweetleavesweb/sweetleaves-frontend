// TEST ONLY: Dutchie mock test store with delivery enabled. Do not ship.
export const REC_SCRIPT_SRC = "https://dutchie.com/api/v2/embedded-menu/6ad7ca150ded88f0bb5e6c98.js";
export const MED_SCRIPT_SRC =
  "https://dutchie.com/api/v2/embedded-menu/6a3096683cf9ab736cb06f1b.js?menuType=med";

// Dutchie's multi-location embed: lets dtche[location] preselect a store.
const CHAIN_SCRIPT_PARAMS = { chainLocations: "true" };
// Opens on the delivery address search, which picks the store by address.
const DELIVERY_SCRIPT_PARAMS = { ...CHAIN_SCRIPT_PARAMS, searchMethod: "deliveryArea" };

type SearchParams = Record<string, string | string[] | undefined>;

// Turns a shop page's URL params into DutchieEmbed props: dtche* params are
// forwarded to Dutchie, ?delivery=1 opens the delivery address search.
export function dutchieEmbedProps(params: SearchParams) {
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

  return {
    dutchieParams: Object.keys(dutchieParams).length ? dutchieParams : undefined,
    scriptParams,
  };
}
