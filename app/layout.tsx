import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "../lenis";
import { TailwindIndicator } from "./components/tailwind-indicator";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeonz",
  description: "My site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${geistMono.className} antialiased selection:bg-foreground selection:text-background`}
        >
          <TailwindIndicator />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
