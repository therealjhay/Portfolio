"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="jhay-workspace-surface"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
