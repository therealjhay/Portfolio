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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:border focus:border-primary focus:bg-background focus:px-4 focus:text-foreground"
        >
          Skip to content
        </a>
        <AppThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
