import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import CursorBubble from "@/components/ui/CursorBubble";
import AOSInit from "@/components/ui/AOSInit";

export const metadata: Metadata = {
  title: "Ferg Flannery – Creative Consultant",
  description:
    "Ferg Flannery – Creative Consultant, Art Director, Visual Designer. Over 25 years experience across the creative landscape from concept to creation.",
  openGraph: {
    title: "Ferg Flannery – Creative Consultant",
    description:
      "Creative Consultant, Art Director, Visual Designer. 25+ years across the creative landscape.",
    url: "https://fergflannery.com",
    siteName: "Ferg Flannery",
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<CursorBubble /><AOSInit /></body>
    </html>
  );
}
