import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AppThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} · ${siteConfig.role}`,
  description: siteConfig.tagline,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceMono.variable} ${ibmPlexSans.variable}`}>
        <AppThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
