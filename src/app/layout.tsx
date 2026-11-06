import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import CursorBubble from "@/components/ui/CursorBubble";
import AOSInit from "@/components/ui/AOSInit";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Ferg Flannery – Lead Creative Consultant & Web Accessibility Expert",
  description:
    "Ferg Flannery, Lead Creative Consultant and Lead Web Accessibility Expert. Digital delivery, creative direction and WCAG 2.2 AA accessibility for national programmes, agencies and brands. Based in Cork, available for freelance and contract work.",
  openGraph: {
    title: "Ferg Flannery – Lead Creative Consultant & Web Accessibility Expert",
    description:
      "Lead Creative Consultant and Lead Web Accessibility Expert. Digital delivery, creative direction and WCAG 2.2 AA accessibility.",
    url: "https://fergflannery.com",
    siteName: "Ferg Flannery",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "https://fergflannery.com/images/social2.jpg",
        secureUrl: "https://fergflannery.com/images/social2.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Ferg Flannery – Lead Creative Consultant and Lead Web Accessibility Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferg Flannery – Lead Creative Consultant & Web Accessibility Expert",
    description:
      "Lead Creative Consultant and Lead Web Accessibility Expert. Digital delivery, creative direction and WCAG 2.2 AA accessibility.",
    images: ["https://fergflannery.com/images/social2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <CursorBubble />
        <AOSInit />
        <Analytics />
      </body>
    </html>
  );
}
