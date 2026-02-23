import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { palette, shape, spacing, typography } from "./tokens";

export type ThemeMode = keyof typeof palette;

function buildTheme(mode: ThemeMode) {
  const paletteForMode = palette[mode];

  const options: ThemeOptions = {
    palette: paletteForMode,
    typography,
    shape,
    spacing,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: paletteForMode.background.default,
            color: paletteForMode.text.primary,
          },
          ":root": {
            colorScheme: mode,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: shape.borderRadius,
          },
        },
      },
    },
  };

  return createTheme(options);
}

export const lightTheme = buildTheme("light");
export const darkTheme = buildTheme("dark");
export const createAppTheme = buildTheme;
