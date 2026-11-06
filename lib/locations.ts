import { APPLE_MAPS_URL, GOOGLE_MAPS_URL } from "./constants";

export interface Location {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  findUsHeading: string;
  address: string;
  phone?: string;
  hours: string[];
  parking: string[];
  about: string;
  highlights: string[];
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
      "Points add up automatically when you use your email at checkout. You must be subscribed to our marketing communications to be in the Garden Club.",
    googleMapsUrl: GOOGLE_MAPS_URL,
    appleMapsUrl: APPLE_MAPS_URL,
  },
  {
    slug: "minnetonka",
    name: "Minnetonka",
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
      "Located conveniently on Wayzata Blvd, Sweetleaves proudly serves as a premier destination for cannabis. Whether you are new to cannabis or know exactly what you need, our team is here to help you find what's right for you and are deeply committed to our Minneapolis community.",
    highlights: [
      "Recreational and medical cannabis offerings",
      "Delivery available",
      "Easy to reach on Wayzata Blvd, featuring quick highway access and simple parking",
    ],
    gardenClubDescription:
      "Points add up automatically when you use your email at checkout. Members get access to exclusive giveaways, sweepstakes, and discounts! You must be subscribed to our marketing communications to be in the Garden Club.",
    ...mapsSearchUrls("12970 Wayzata Blvd, Minnetonka, MN 55305"),
  },
];

export const LOCATION_FAQ_QUESTIONS = [
  "What forms of payment do you accept?",
  "Do I need a medical card?",
  "What forms of IDs are accepted?",
  "Can I order online for pickup?",
];

export function locationHref(slug: string) {
  return `/location/${slug}/`;
}
