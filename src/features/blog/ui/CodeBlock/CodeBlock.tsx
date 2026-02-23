"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, duotoneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
};

type CopyState = "idle" | "copied" | "error";

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
} as const;

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const theme = useTheme();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimerRef = useRef<number | null>(null);

  const monoFont = 'Menlo, Consolas, "SFMono-Regular", "Liberation Mono", monospace';

  const languageLabel = language?.toLowerCase?.() || "text";

  const feedbackLabel = useMemo(() => {
    if (copyState === "copied") return "Copied";
    if (copyState === "error") return "Copy failed";
    return "Copy code";
  }, [copyState]);

  const handleCopy = useCallback(async () => {
    if (!code) return;

    if (!("clipboard" in navigator) || !navigator.clipboard?.writeText) {
      setCopyState("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopyState("idle");
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code", error);
      setCopyState("error");
    }
  }, [code]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        my: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: theme.palette.background.paper,
        overflow: "hidden",
        boxShadow: theme.shadows[1],
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1.5}
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor:
            theme.palette.mode === "light"
              ? alpha(theme.palette.primary.main, 0.04)
              : alpha(theme.palette.primary.main, 0.12),
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: monoFont,
              textTransform: "lowercase",
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
            aria-label={`Language: ${languageLabel}`}
          >
            {languageLabel}
          </Typography>
          {filename ? (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontFamily: monoFont,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: 180, sm: 260 },
              }}
              title={filename}
            >
              {filename}
            </Typography>
          ) : null}
        </Stack>

        <IconButton
          size="small"
          aria-label={feedbackLabel}
          onClick={handleCopy}
          color={copyState === "error" ? "error" : "default"}
          title={feedbackLabel}
        >
          {copyState === "copied" ? (
            <CheckIcon fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>

      <Box sx={{ position: "relative" }}>
        <Box component="span" sx={visuallyHidden} aria-live="polite">
          {feedbackLabel}
        </Box>
        <Box sx={{ overflowX: "auto" }}>
          <SyntaxHighlighter
            language={languageLabel}
            style={theme.palette.mode === "dark" ? duotoneDark : coy}
            customStyle={{
              margin: 0,
              padding: theme.spacing(2),
              background: "transparent",
              fontSize: 14,
            }}
            codeTagProps={{
              style: {
                fontFamily: monoFont,
                color: theme.palette.text.primary,
              },
            }}
            wrapLongLines={false}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
}

