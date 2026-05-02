import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Geist } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5a6b3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.osteopatheavignon.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
