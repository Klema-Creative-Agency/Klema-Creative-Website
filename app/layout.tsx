import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
  title: "Klema Creative | Marketing Engines for San Antonio Businesses",
  description:
    "We build complete marketing systems that generate and convert leads for local service businesses. Stop wasting money on marketing that doesn't work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
