import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  getPersonJsonLd,
  getWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aeonz",
    template: "%s | Aeonz",
  },
  description:
    "Showcasing the creative work and projects of Aeonz, a passionate developer and designer.",
  metadataBase: new URL("https://aeonz.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aeonz",
    description: "Explore Aeonz's projects and creative journey.",
    url: "https://aeonz.dev",
    siteName: "Aeonz",
    images: [
      {
        url: "/images/eo-n.png",
        width: 1366,
        height: 768,
        alt: "Aeonz project preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeonz",
    description: "Discover the projects and designs by Aeonz.",
    images: ["/images/eo-n.png"],
    creator: "@aeonz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(getPersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(getWebsiteJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
