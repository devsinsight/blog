"use client";

import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import Header from "@/shared/ui/Header/Header";
import Footer from "@/shared/ui/Footer/Footer";

export type AppShellProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export default function AppShell({ header, footer, children }: AppShellProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingY: 3,
      }}
    >
      <Box component="header" sx={{ paddingY: 1 }}>
        {header ?? <Header />}
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box component="footer" sx={{ paddingY: 2 }}>
        {footer ?? <Footer />}
      </Box>
    </Container>
  );
}
