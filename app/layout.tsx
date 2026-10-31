import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AppThemeProvider } from "@/components/layout/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} (${siteConfig.handle}) · ${siteConfig.role}`,
  description: siteConfig.supportingText,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:border focus:border-primary focus:bg-background focus:px-4 focus:text-foreground"
        >
          Skip to content
        </a>
        <CursorGlow />
        <AppThemeProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
