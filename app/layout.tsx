import type { Metadata } from "next";
import { Bungee, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/core/lenis-provider";
import { siteContent } from "@/config/site-content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteContent.personalInfo.name} | ${siteContent.personalInfo.role}`,
  description: siteContent.personalInfo.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${bungee.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
