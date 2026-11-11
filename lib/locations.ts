import { APPLE_MAPS_URL, GOOGLE_MAPS_URL } from "./constants";

export type LocationStatus = "coming-soon" | "open";

interface LocationCopy {
  metaDescription: string;
  about: string;
  highlights: string[];
}

export interface Location extends LocationCopy {
  slug: string;
  name: string;
  // "coming-soon" shows the pre-launch banner and copy and hides How to Shop.
  status: LocationStatus;
  // Dutchie store slug (from dutchie.com/embedded-menu/<slug>) used to preselect
  // this store for pickup. null falls back to the default rec menu.
  dutchieStore: string | null;
  // Shown instead of the regular copy while status is "coming-soon".
  comingSoonCopy?: LocationCopy;
  metaTitle: string;
  eyebrow: string;
  findUsHeading: string;
  address: string;
  phone?: string;
  hours: string[];
  parking: string[];
  gardenClubDescription: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
}

function mapsSearchUrls(address: string) {
  const query = encodeURIComponent(address);
  return {
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
    appleMapsUrl: `https://maps.apple.com/?address=${query}`,
  };
}

export const locations: Location[] = [
  {
    slug: "minneapolis",
    name: "Minneapolis",
    status: "open",
    dutchieStore: "sweet-leaves-a-cannabis-company",
    metaTitle: "Sweetleaves | Medical & Recreational Dispensary in Minneapolis, MN",
    metaDescription:
      "Visit Sweetleaves in North Loop, Minneapolis for premium cannabis, convenient online ordering for pickup or delivery, and expert budtenders.",
    eyebrow: "Medical & Recreational Dispensary in Minneapolis, Minnesota",
    findUsHeading: "Find Us in North Loop",
    address: "905 N Washington Ave, Minneapolis, MN 55401",
    phone: "(612) 688-9333",
    hours: [
      "Monday: 10am–9pm",
      "Tuesday: 10am–9pm",
      "Wednesday: 10am–9pm",
      "Thursday: 10am–10pm",
      "Friday: 10am–10pm",
      "Saturday: 9am–10pm",
      "Sunday: 11am–6pm",
    ],
    parking: [
      "Street parking on Washington and 9th Ave N.",
      "TractorWorks ramp across the street (entrance on 10th Ave).",
      "Additional street parking on N 3rd Street.",
    ],
    about:
      "Nestled in the vibrant North Loop neighborhood, Sweetleaves serves as your premier local dispensary. Whether you are new to cannabis or know exactly what you need, our team is here to help you find what's right for you and are deeply committed to our Minneapolis community.",
    highlights: [
      "Recreational and medical cannabis offerings",
      "Delivery available",
      "Easy access with dedicated curbside pickup spots and nearby parking options",
    ],
    gardenClubDescription:
      "Points add up automatically when you use your email at checkout. Members get access to exclusive giveaways, sweepstakes, and discounts! You must be subscribed to our marketing communications to be in the Garden Club.",
    googleMapsUrl: GOOGLE_MAPS_URL,
    appleMapsUrl: APPLE_MAPS_URL,
  },
  {
    slug: "minnetonka",
    name: "Minnetonka",
    // TODO(launch): flip to "open" once the Minnetonka store is live in Dutchie.
    status: "coming-soon",
    // TODO(launch): PLACEHOLDER. Set to Minnetonka's Dutchie store slug before
    // flipping status to "open", or Pickup will open the default (Minneapolis) menu.
    dutchieStore: null,
    metaTitle: "Sweetleaves | Medical & Recreational Dispensary in Minnetonka, Minnesota",
    metaDescription:
      "Explore Sweetleaves dispensary in Minnetonka for top-tier cannabis products, easy online ordering for pickup or delivery, and expert service.",
    eyebrow: "Medical & Recreational Dispensary in Minnetonka, Minnesota",
    findUsHeading: "Find Us in Minnetonka",
    address: "12970 Wayzata Blvd, Minnetonka, MN 55305",
    hours: [
      "Monday: 10am–10pm",
      "Tuesday: 10am–10pm",
      "Wednesday: 10am–10pm",
      "Thursday: 10am–10pm",
      "Friday: 10am–10pm",
      "Saturday: 10am–10pm",
      "Sunday: 11am–6pm",
    ],
    parking: ["Street parking and dedicated lot available."],
    about:
      "Located conveniently on Wayzata Blvd—just off I-394 and Plymouth Road, right across the highway from Ridgedale Center—Sweetleaves proudly serves as a premier destination for cannabis. Whether you are new to cannabis or know exactly what you need, our team is here to help you find what's right for you and are deeply committed to our community.",
    highlights: [
      "Recreational and medical cannabis offerings",
      "Delivery available",
      "Easy to reach on Wayzata Blvd, featuring quick highway access and ample parking",
    ],
    comingSoonCopy: {
      metaDescription:
        "Sweetleaves is coming soon to Minnetonka on Wayzata Blvd, bringing medical and recreational cannabis, expert budtenders, and online ordering for pickup or delivery.",
      about:
        "Sweetleaves is coming soon to Wayzata Blvd—just off I-394 and Plymouth Road, right across the highway from Ridgedale Center. Whether you are new to cannabis or know exactly what you need, our team will be here to help you find what's right for you.",
      highlights: [
        "Recreational and medical cannabis offerings",
        "Online ordering for pickup and delivery once we open",
        "Easy to reach on Wayzata Blvd, featuring quick highway access and ample parking",
      ],
    },
    gardenClubDescription:
      "Points add up automatically when you use your email at checkout. Members get access to exclusive giveaways, sweepstakes, and discounts! You must be subscribed to our marketing communications to be in the Garden Club.",
    ...mapsSearchUrls("12970 Wayzata Blvd, Minnetonka, MN 55305"),
  },
];

export function locationHref(slug: string) {
  return `/location/${slug}/`;
}

export function locationCopy(location: Location): LocationCopy {
  return location.status === "coming-soon" && location.comingSoonCopy
    ? location.comingSoonCopy
    : location;
}

export const REC_MENU_HREF = "/shop-recreational-cannabis/";

export function pickupHref(location: Location) {
  return location.dutchieStore
    ? `${REC_MENU_HREF}?dtche%5Blocation%5D=${encodeURIComponent(location.dutchieStore)}`
    : REC_MENU_HREF;
}
