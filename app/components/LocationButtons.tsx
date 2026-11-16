import Link from "next/link";
import { locationHref, locations } from "@/lib/locations";

export default function LocationButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      {locations.map((l) => (
        <Link
          key={l.slug}
          href={locationHref(l.slug)}
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
        >
          {l.name}
        </Link>
      ))}
    </div>
  );
}
