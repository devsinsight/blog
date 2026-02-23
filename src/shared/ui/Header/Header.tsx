"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import ThemeToggle from "@/shared/ui/ThemeToggle/ThemeToggle";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const brand = useMemo(
    () => (
      <Typography
        variant="h6"
        component={Link}
        href="/"
        sx={{
          textDecoration: "none",
          color: "inherit",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        DevsInsight
      </Typography>
    ),
    []
  );

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <>
      <AppBar position="static" elevation={0} color="primary">
        <Toolbar sx={{ gap: 2 }}>
          {brand}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map(({ label, href }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                color="inherit"
              >
                {label}
              </Button>
            ))}
          </Box>

          <ThemeToggle />

          <IconButton
            edge="end"
            color="inherit"
            aria-label="Open navigation menu"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 260, paddingY: 1 }} role="presentation">
          <List>
            {navItems.map(({ label, href }) => (
              <ListItemButton
                key={href}
                component={Link}
                href={href}
                role="link"
                onClick={handleDrawerClose}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

