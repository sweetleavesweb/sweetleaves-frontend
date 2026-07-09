import Image from "next/image";
import Link from "next/link";

interface ProductData {
  name: string;
  image: string;
  href: string;
}

function ProductCategory({ name, image, href }: ProductData) {
  const isExternal = href.startsWith("http");

  const circle = (
    <div className="rounded-full size-[165px] relative overflow-hidden bg-white p-4">
      <Image src={image} alt={name} fill sizes="165px" className="object-contain p-4" />
    </div>
  );

  const pill = (
    <span className="bg-light-gold text-dark-green font-poppins-semibold uppercase text-base px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-center w-[166px] block">
      {name}
    </span>
  );

  const Wrapper = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  return (
    <div className="flex flex-col gap-[23px] items-center justify-center">
      <Wrapper {...linkProps}>{circle}</Wrapper>
      <Wrapper {...linkProps}>{pill}</Wrapper>
    </div>
  );
}

const products: ProductData[] = [
  { name: "Flower", image: "/home/products/flower.png", href: "/products/flower" },
  { name: "Pre-Rolls", image: "/home/products/prerolls.png", href: "/products/pre-rolls" },
  { name: "Vaporizers", image: "/home/products/vaporizers.png", href: "/products/disposable-vapes-and-carts" },
  { name: "Edibles", image: "/home/products/gummies.png", href: "/products/edibles" },
  { name: "Concentrates", image: "/home/products/concentrate.png", href: "/products/concentrates" },
  { name: "Staff Picks", image: "/home/products/staff-picks.png", href: "/shop-recreational-cannabis/" },
];

export default function ProductGrid() {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:flex flex-wrap justify-center gap-x-[23px] gap-y-6">
        {products.map((product) => (
          <ProductCategory key={product.name} {...product} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="grid grid-cols-2 gap-x-[23px] gap-y-6">
          {products.map((product) => (
            <ProductCategory key={product.name} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
