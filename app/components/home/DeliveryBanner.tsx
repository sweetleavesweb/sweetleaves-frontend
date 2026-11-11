import Image from "next/image";
import Link from "next/link";
import { REC_DELIVERY_HREF } from "@/lib/locations";

// Same frame as the deals carousel. The 4:1 image shows whole on desktop;
// on mobile the 2:1 frame keeps its centered text and trims the side margins.
export default function DeliveryBanner() {
  return (
    <Link
      href={REC_DELIVERY_HREF}
      className="relative block w-full max-w-7xl mx-auto aspect-2/1 md:aspect-4/1 rounded-[40px] overflow-hidden hover:opacity-90 transition-opacity"
    >
      <Image
        src="/delivery/banner.png"
        alt="Same day cannabis delivery available. Stay in, we're already on the way. Free delivery on orders $200+."
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover"
      />
    </Link>
  );
}
