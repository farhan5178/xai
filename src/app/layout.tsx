import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xai – Intelligence Workspace | From Raw Data to Actionable Insight",
  description:
    "Xai transforms raw data into structured intelligence and actionable insights through advanced AI models. Calm. Powerful. Technically confident.",
  keywords: ["AI", "data intelligence", "machine learning", "analytics", "insights"],
  openGraph: {
    title: "Xai – Intelligence Workspace",
    description: "From raw data → structured intelligence → actionable insight → AI Automations",
    type: "website",
  },
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Providers>{children}</Providers>
        </SmoothScroll>
      </body>
    </html>
  );
}
