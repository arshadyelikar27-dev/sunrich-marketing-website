import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sunrich Agua — Pure Drinking Water | BIS Certified",
  description:
    "Sunrich Agua delivers 7-stage RO purified, BIS certified, pH-balanced drinking water to your home and office. Fresh, safe, sustainable.",
  keywords: ["drinking water", "pure water", "RO water", "home delivery", "Sunrich Agua", "BIS certified water"],
  openGraph: {
    title: "Sunrich Agua — Pure Drinking Water",
    description: "7-stage purified, BIS certified drinking water delivered fresh to you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#0d2240",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-crystal text-ink antialiased overflow-x-hidden">
        <TooltipProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
