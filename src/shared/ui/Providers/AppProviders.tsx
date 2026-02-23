"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { PropsWithChildren, useMemo } from "react";
import { darkTheme, lightTheme } from "@/styles/theme/createTheme";
import { useMounted } from "@/shared/hooks/useMounted";

function InnerThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme, systemTheme } = useTheme();
  const mounted = useMounted();

  const muiTheme = useMemo(
    () => {
      const effectiveTheme = resolvedTheme === "system" ? systemTheme : resolvedTheme;
      return effectiveTheme === "dark" ? darkTheme : lightTheme;
    },
    [resolvedTheme, systemTheme]
  );

  if (!mounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="devsinsight-theme"
    >
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </NextThemesProvider>
  );
}
