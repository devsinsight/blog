"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { buildSanityImageUrl } from "@/lib/cms/sanity/image";

export type SanityImageWithAlt = {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
};

type Props = {
  image?: SanityImageWithAlt | null;
  alt: string;
  size?: number;
};

function AvatarImage({ image, alt, size = 160 }: Props) {
  const url = buildSanityImageUrl(image, { width: size * 2, height: size * 2, quality: 80 });
  if (!url) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: (theme) => `0 0 0 6px ${theme.palette.background.paper}, 0 10px 40px rgba(0,0,0,0.3)`,
      }}
    >
      <Image src={url} alt={alt} fill sizes={`${size}px`} style={{ objectFit: "cover" }} />
    </Box>
  );
}

export default AvatarImage;
