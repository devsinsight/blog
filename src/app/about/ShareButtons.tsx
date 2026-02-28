"use client";

import ShareIcon from "@mui/icons-material/Share";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { buildShareLinks } from "./shareLinks";

type Props = {
  label?: string;
};

export function ShareButtons({ label = "Share" }: Props) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // Ensure value is set client-side only to avoid SSR mismatch
    setUrl(window.location.href);
  }, []);

  const links = url ? buildShareLinks(url) : null;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ShareIcon fontSize="small" color="action" aria-hidden />
      <Stack direction="row" spacing={0.5}>
        <Tooltip title={`${label} on X`}>
          <span>
            <IconButton
              size="small"
              component="a"
              href={links?.x ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!links}
              aria-label="Share on X"
            >
              <XIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`${label} on LinkedIn`}>
          <span>
            <IconButton
              size="small"
              component="a"
              href={links?.linkedin ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!links}
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
