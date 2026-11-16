import Image from "next/image";

// Same frame as the deals carousel. The 4:1 image shows whole on desktop;
// on mobile the 2:1 frame keeps its centered text and trims the side margins.
export default function DeliveryBanner() {
  return (
    <div
      className="relative block w-full max-w-7xl mx-auto aspect-2/1 md:aspect-4/1 rounded-[40px] overflow-hidden"
    >
      <Image
        src="/delivery/banner.png"
        alt="Same day cannabis delivery available. Stay in, we're already on the way. Free delivery on orders $200+."
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover"
      />
    </div>
  );
}
