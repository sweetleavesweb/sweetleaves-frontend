import Image from "next/image";
import Link from "next/link";
import { REC_DELIVERY_HREF } from "@/lib/locations";

// The image has text baked in, so the frame keeps its middle 60% visible
// on desktop and shows it whole on mobile.
export default function DeliveryBanner() {
  return (
    <Link
      href={REC_DELIVERY_HREF}
      className="relative block w-full aspect-[3/2] md:aspect-[5/2] rounded-[40px] overflow-hidden hover:opacity-90 transition-opacity"
    >
      <Image
        src="/delivery/1.png"
        alt="Same day cannabis delivery available. Stay in, we're already on the way. Free delivery on orders $200+. Shop delivery."
        fill
        sizes="(max-width: 1365px) 100vw, 1365px"
        className="object-cover"
      />
    </Link>
  );
}
