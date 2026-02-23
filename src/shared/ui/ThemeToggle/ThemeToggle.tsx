"use client";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "next-themes";
import { useMounted } from "@/shared/hooks/useMounted";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  const effectiveTheme = theme === "system" ? systemTheme ?? resolvedTheme : theme;
  const isDark = effectiveTheme === "dark";

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  return (
    <Tooltip title={label}>
      <IconButton color="inherit" aria-label={label} onClick={handleToggle} size="large">
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}

