import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  openGraph: {
    title: "Aeonz",
    description: "Explore Aeonz's projects and creative journey.",
    url: "https://aeonz.dev",
    siteName: "Aeonz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aeonz Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeonz",
    description: "Discover the projects and designs by Aeonz.",
    images: ["/og-image.jpg"],
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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
