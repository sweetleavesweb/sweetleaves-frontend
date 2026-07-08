import Link from "next/link";

interface ShopMethodProps {
  number: number;
  title: string;
  description: string;
  boldWord?: string;
}

function ShopMethod({ number, title, description, boldWord }: ShopMethodProps) {
  return (
    <div className="relative flex flex-col items-center min-w-0 lg:flex-1">
      <div className="bg-orange-glow rounded-full size-[86px] flex items-center justify-center font-poppins-semibold text-[55px] text-white z-10">
        {number}
      </div>
      <div className="bg-white rounded-[30px] w-full lg:max-w-[409px] min-h-[223px] flex flex-1 items-center justify-center px-[18px] pb-11 pt-20 -mt-11 text-center">
        <div className="max-w-[314px]">
          <p className="font-poppins-bold text-[35px] text-almost-black leading-[0.9] mb-4">
            {title}
          </p>
          <p className="font-poppins-regular text-lg text-almost-black leading-none">
            {boldWord
              ? description.split(boldWord).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="font-poppins-bold">{boldWord}</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )
              : description}
          </p>
        </div>
      </div>
    </div>
  );
}

const METHODS: ShopMethodProps[] = [
  {
    number: 1,
    title: "Online for Pickup",
    description:
      "Browse our full menu and place your order from anywhere. We offer curbside.",
    boldWord: "curbside",
  },
  {
    number: 2,
    title: "In-Store Kiosks",
    description: "Know what you want? Skip the line and order yourself.",
  },
  {
    number: 3,
    title: "With a Budtender",
    description:
      "Need help deciding? Our team can walk you through options and answer questions.",
  },
];

export default function HowToShop() {
  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-8 lg:gap-10 items-center px-4 lg:px-10 py-8 lg:py-10">
      <h2 className="font-poppins-bold text-3xl lg:text-display text-orange-glow text-center">
        How to Shop
      </h2>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-center lg:items-stretch w-full justify-center">
        {METHODS.map((m) => (
          <ShopMethod key={m.number} {...m} />
        ))}
      </div>
      <Link
        href="/about-us/#find-us"
        className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center w-full max-w-[356px]"
      >
        Plan Your Visit
      </Link>
    </section>
  );
}
