import Link from "next/link";
import { REC_DELIVERY_HREF } from "@/lib/locations";

interface ShopMethodProps {
  number: number;
  title: React.ReactNode;
  description: string;
  boldWord?: string;
}

interface MenuLinkProps {
  href: string;
  children: string;
}

function MenuLink({ href, children }: MenuLinkProps) {
  return (
    <Link href={href} className="underline decoration-2 underline-offset-4 hover:text-orange-glow transition-colors">
      {children}
    </Link>
  );
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

const IN_STORE_METHODS: ShopMethodProps[] = [
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

interface Props {
  pickupHref: string;
}

export default function HowToShop({ pickupHref }: Props) {
  const methods: ShopMethodProps[] = [
    {
      number: 1,
      title: (
        <>
          Online for <MenuLink href={pickupHref}>Pickup</MenuLink> or{" "}
          <MenuLink href={REC_DELIVERY_HREF}>Delivery</MenuLink>
        </>
      ),
      description:
        "Browse our full menu and place your order from anywhere. We offer curbside.",
      boldWord: "curbside",
    },
    ...IN_STORE_METHODS,
  ];

  return (
    <section className="bg-parchment border border-sage rounded-[40px] flex flex-col gap-8 lg:gap-10 items-center px-4 lg:px-10 py-8 lg:py-10">
      <h2 className="font-poppins-bold text-3xl lg:text-display text-orange-glow text-center">
        How to Shop
      </h2>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-center lg:items-stretch w-full justify-center">
        {methods.map((m) => (
          <ShopMethod key={m.number} {...m} />
        ))}
      </div>
    </section>
  );
}
