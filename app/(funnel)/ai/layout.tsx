import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Appointment Setter + Facebook Ads | Klema Creative",
  description:
    "Get exclusive leads and an AI that books them in 60 seconds. Built for local service businesses that want more booked appointments, not more leads to chase.",
  robots: { index: false, follow: false },
};

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
