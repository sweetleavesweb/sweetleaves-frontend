import Image from "next/image";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir//905+N+Washington+Ave,+Minneapolis,+MN+55401/@44.9896532,-93.2826381,17z";
const APPLE_MAPS_URL = "https://maps.apple.com/?address=905+N+Washington+Ave,+Minneapolis,+MN+55401";

const HOURS = [
  "Monday: 10am-9pm",
  "Tuesday: 10am-9pm",
  "Wednesday: 10am-9pm",
  "Thursday: 10am-10pm",
  "Friday: 10am-10pm",
  "Saturday: 9am-10pm",
  "Sunday: 11am-6pm",
];

export default function ContactCard() {
  return (
    <section className="bg-dark-sage rounded-[40px] flex flex-col-reverse lg:flex-row gap-5 lg:gap-10 p-5">
      {/* aspect ratio on mobile; stretches to content height on desktop via flex */}
      <div className="relative w-full lg:w-[45%] aspect-[625/695] lg:aspect-auto lg:self-stretch shrink-0 rounded-[30px] overflow-hidden">
        <Image
          src="/about/map.png"
          alt="Sweetleaves storefront in North Loop"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 items-center lg:items-start flex-1 min-w-0 py-5">
        {/* Phone */}
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Give Us a Call</p>
          <a href="tel:6126889333" className="hover:underline">
            612-688-9333
          </a>
        </div>

        {/* Email */}
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Send An Email</p>
          <a href="mailto:info@sweetleaves.co" className="hover:underline break-all">
            info@sweetleaves.co
          </a>
        </div>

        {/* Address */}
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Come Visit Us</p>
          <p>905 N Washington Ave, Minneapolis, MN 55401</p>
        </div>

        <div className="flex gap-5 items-end">
          <a href={APPLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
            <Image src="/about/apple-maps.svg" alt="Open in Apple Maps" width={68} height={68} />
          </a>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
            <Image src="/about/google-maps.svg" alt="Open in Google Maps" width={47} height={68} />
          </a>
        </div>

        {/* Hours */}
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Hours</p>
          {HOURS.map((h) => (
            <p key={h}>{h}</p>
          ))}
        </div>

        {/* Parking */}
        <div className="font-poppins-regular text-lg text-white text-center lg:text-left">
          <p className="font-poppins-bold">Parking</p>
          <p>Street parking on Washington and 9th Ave N.</p>
          <p>TractorWorks ramp across the street (entrance on 10th Ave).</p>
          <p>Additional street parking on N 3rd Street.</p>
        </div>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center mt-2 w-auto"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
