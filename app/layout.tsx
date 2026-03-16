import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Newsreader } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klemacreative.com"),
  title: "Klema Creative | Marketing Engines for San Antonio Businesses",
  description:
    "We build complete marketing systems that generate and convert leads for local service businesses. Stop wasting money on marketing that doesn't work.",
  openGraph: {
    title: "Klema Creative | Marketing Engines for San Antonio Businesses",
    description:
      "We build complete marketing systems that generate and convert leads for local service businesses.",
    siteName: "Klema Creative",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Klema Creative - Marketing Engines for Local Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klema Creative | Marketing Engines for San Antonio Businesses",
    description:
      "We build complete marketing systems that generate and convert leads for local service businesses.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Klema Creative",
              description:
                "We build complete marketing systems that generate and convert leads for local service businesses in San Antonio.",
              url: "https://klemacreative.com",
              logo: "https://klemacreative.com/logo.png",
              image: "https://klemacreative.com/og-image.png",
              areaServed: {
                "@type": "City",
                name: "San Antonio",
                "@id": "https://www.wikidata.org/wiki/Q975",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 29.4241,
                longitude: -98.4936,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Antonio",
                addressRegion: "TX",
                addressCountry: "US",
              },
              serviceType: [
                "Web Design",
                "SEO",
                "Digital Marketing",
                "Lead Generation",
                "CRM Automation",
              ],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          // @ts-expect-error -- custom attrs for SearchAtlas loader
          nowprocket=""
          nitro-exclude=""
          type="text/javascript"
          id="sa-dynamic-optimization"
          data-uuid="cc853bdc-d179-4b04-aaf3-e7c9fc275501"
          src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gImNjODUzYmRjLWQxNzktNGIwNC1hYWYzLWU3YzlmYzI3NTUwMSI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y0XWVRLC33"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y0XWVRLC33');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
