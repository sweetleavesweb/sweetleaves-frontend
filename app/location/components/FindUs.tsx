import Image from "next/image";
import type { Location } from "@/lib/locations";

interface Props {
  location: Location;
}

interface DetailProps {
  label: string;
  children: React.ReactNode;
}

function Detail({ label, children }: DetailProps) {
  return (
    <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
      <p className="font-poppins-bold">{label}</p>
      {children}
    </div>
  );
}

export default function FindUs({ location }: Props) {
  return (
    <section className="bg-dark-sage rounded-[40px] flex flex-col-reverse lg:flex-row gap-8 lg:gap-20 items-center p-5">
      <iframe
        src={location.googleMapsEmbedUrl}
        title={`Map to Sweetleaves ${location.name}`}
        className="rounded-[30px] border-0 w-full lg:w-[625px] aspect-[625/695] lg:aspect-auto lg:h-[695px] shrink-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-col gap-3 items-center lg:items-start w-full lg:w-[597px] py-5">
        <h2 className="font-poppins-bold text-3xl lg:text-display text-white leading-[0.9] text-center lg:text-left">
          {location.findUsHeading}
        </h2>

        <Detail label="Address">
          <p>{location.address}</p>
        </Detail>

        <div className="flex gap-5 items-end justify-center">
          <a href={location.appleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Image src="/about/apple-maps.svg" alt="Open in Apple Maps" width={68} height={68} />
          </a>
          <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Image src="/about/google-maps.svg" alt="Open in Google Maps" width={47} height={68} />
          </a>
        </div>

        {location.phone && (
          <Detail label="Phone">
            <a href={`tel:${location.phone.replace(/\D/g, "")}`} className="hover:underline">
              {location.phone}
            </a>
          </Detail>
        )}

        <Detail label="Hours">
          {location.hours.map((h) => (
            <p key={h}>{h}</p>
          ))}
        </Detail>

        <Detail label="Parking">
          {location.parking.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Detail>

        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center w-full mt-2"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
