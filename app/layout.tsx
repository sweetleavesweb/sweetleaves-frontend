import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import AgeGate from "./components/AgeGate";
import AlpineIQProvider from "./components/AlpineIQProvider";
import PageViewTracker from "./components/PageViewTracker";
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
    <html lang="en" className="bg-sky-blue">
      <head>
        {/* GTM: must load as high as possible in <head> */}
        <script async
src='https://www.googletagmanager.com/gtag/js?id=G-3M9FSQWF9T'></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-3M9FSQWF9T');
</script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KW2H37S6');`,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KW2H37S6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AgeGate initialVerified={initialVerified}>
          <div className="relative min-h-screen flex flex-col bg-sky-blue bg-[url(/rewards/circles-bg.svg)] bg-cover bg-center bg-fixed">
            <AlpineIQProvider />
            <PageViewTracker />

            <Nav />

            <main className="flex-1 w-full">{children}</main>

            <Footer />
          </div>
        </AgeGate>
      </body>
    </html>
  );
}
