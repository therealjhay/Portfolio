import type { Metadata } from "next";
import { Archivo_Black, Fira_Code, Manrope } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/core/lenis-provider";
import { siteContent } from "@/config/site-content";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
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
      <body className={`${manrope.variable} ${archivoBlack.variable} ${firaCode.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
