import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import AgeGate from "./components/AgeGate";
import AlpineIQProvider from "./components/AlpineIQProvider";
import PageViewTracker from "./components/PageViewTracker";
import GardenClubPopup from "./components/GardenClubPopup";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Sweetleaves Cannabis",
    template: "%s | Sweetleaves",
  },
  description:
    "Sweetleaves Cannabis Dispensary in the North Loop of Minneapolis, MN.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sweetleaves Cannabis",
    description:
      "Sweetleaves Cannabis Dispensary in the North Loop of Minneapolis, MN.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawTtl = process.env.NEXT_PUBLIC_AGE_GATE_TTL_HOURS;
  const parsedTtl = Number(rawTtl);
  const ttlHours =
    rawTtl != null && Number.isFinite(parsedTtl) && parsedTtl >= 0
      ? parsedTtl
      : 12;
  const initialVerified =
    ttlHours !== 0 && cookieStore.get("ageGate:verified")?.value === "true";

  return (
    <html lang="en" className="bg-sky-blue scroll-pt-[141px] [@media(min-width:1100px)]:scroll-pt-[113px]">
      <GoogleTagManager gtmId="GTM-KW2H37S6" />
      <GoogleAnalytics gaId="G-3M9FSQWF9T" />
      <body className={`${poppins.variable} antialiased`}>
        <AgeGate initialVerified={initialVerified}>
          <div className="relative min-h-screen flex flex-col bg-sky-blue bg-[url(/rewards/circles-bg.svg)] bg-cover bg-center bg-fixed">
            <AlpineIQProvider />
            <PageViewTracker />
            <GardenClubPopup />

            <Nav />

            <main className="flex-1 w-full">{children}</main>

            <Footer />
          </div>
        </AgeGate>
      </body>
    </html>
  );
}
