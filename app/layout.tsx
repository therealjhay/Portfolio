import type { Metadata } from "next";
import { AppThemeProvider } from "@/components/layout/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — Product & Software Engineer`,
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-md focus:border focus:border-foreground focus:bg-background focus:px-4 focus:text-foreground"
        >
          Skip to content
        </a>
        <AppThemeProvider>
          <PageTransition>{children}</PageTransition>
        </AppThemeProvider>
      </body>
    </html>
  );
}
