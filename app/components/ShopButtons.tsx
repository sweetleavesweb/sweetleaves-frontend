import Link from "next/link";

interface ShopButtonProps {
  href: string;
  children: string;
}

function ShopButton({ href, children }: ShopButtonProps) {
  return (
    <Link
      href={href}
      className="bg-orange-glow text-white font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center"
    >
      {children}
    </Link>
  );
}

interface Props {
  medicalHref: string;
  recreationalHref: string;
}

export default function ShopButtons({ medicalHref, recreationalHref }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <ShopButton href={medicalHref}>Shop Medical</ShopButton>
      <ShopButton href={recreationalHref}>Shop Recreational</ShopButton>
    </div>
  );
}
