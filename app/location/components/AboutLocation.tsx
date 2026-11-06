import type { Location } from "@/lib/locations";

interface Props {
  location: Location;
}

export default function AboutLocation({ location }: Props) {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-5 items-center px-4 lg:px-10 py-8 lg:py-10">
      <h2 className="font-poppins-bold text-3xl lg:text-display text-orange-glow text-center">
        About This Location
      </h2>
      <div className="font-poppins-regular text-lg text-dark-green max-w-[900px] flex flex-col gap-4">
        <p>{location.about}</p>
        <p className="font-poppins-bold">What makes this location special:</p>
        <ul className="list-disc pl-6 flex flex-col gap-1">
          {location.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
