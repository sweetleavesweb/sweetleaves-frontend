import type { CatalogEntry } from "@/lib/catalog";
import DutchieEmbed from "./DutchieEmbed";

interface Props {
  entry: CatalogEntry;
}

export default function CatalogPageTemplate({ entry }: Props) {

  return (
    <div className="flex flex-col flex-1">
      <h1 className="px-4 pt-6 pb-2 md:px-8 font-poppins-bold text-[35px] md:text-[55px] text-dark-green leading-tight">
        {entry.headline}
      </h1>

      <div className="flex-1">
        <DutchieEmbed dutchieParams={entry.dutchieParams} />
      </div>

      {(entry.subheadline || entry.body) && (
        <div className="px-4 md:px-8 py-5 md:py-8 flex flex-col gap-5 lg:gap-[30px]">
          {entry.subheadline && (
            <h2 className="font-poppins-bold text-[25px] md:text-[35px] text-dark-green leading-tight">
              {entry.subheadline}
            </h2>
          )}

          {entry.body && (
            <div
              className="font-poppins-regular text-[18px] text-dark-green leading-[1.6] [&_p]:mb-6 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />
          )}
        </div>
      )}
    </div>
  );
}
