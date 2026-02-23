export const palette = {
  light: {
    mode: "light" as const,
    primary: {
      main: "#1a73e8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9333ea",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#334155",
    },
    divider: "#e2e8f0",
  },
  dark: {
    mode: "dark" as const,
    primary: {
      main: "#8ab4f8",
      contrastText: "#0b1221",
    },
    secondary: {
      main: "#c084fc",
      contrastText: "#0b1221",
    },
    background: {
      default: "#0b1221",
      paper: "#111827",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
    },
    divider: "#1f2937",
  },
};

export const typography = {
  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, 'Segoe UI', sans-serif",
  h1: { fontWeight: 700, letterSpacing: "-0.02em" },
  h2: { fontWeight: 700, letterSpacing: "-0.02em" },
  h3: { fontWeight: 700, letterSpacing: "-0.02em" },
  h4: { fontWeight: 700, letterSpacing: "-0.01em" },
  h5: { fontWeight: 700, letterSpacing: "-0.01em" },
  h6: { fontWeight: 700, letterSpacing: "-0.01em" },
  body1: { fontWeight: 400, lineHeight: 1.6 },
  body2: { fontWeight: 400, lineHeight: 1.6 },
  button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.01em" },
};

export const shape = {
  borderRadius: 12,
};

export const spacing = 8;
