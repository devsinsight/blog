"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, IconButton, Stack, Typography } from "@mui/material";

type SocialLink = {
  label: string;
  href: string;
  Icon: typeof GitHubIcon;
};

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "#", Icon: GitHubIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingY: 3,
        marginTop: 4,
      })}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="body2" color="text.secondary">
          © {year} DevsInsight. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={1} aria-label="social links">
          {socialLinks.map(({ label, href, Icon }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              aria-label={label}
              size="small"
              color="primary"
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
