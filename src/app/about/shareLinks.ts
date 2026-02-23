export const buildShareLinks = (currentUrl: string) => {
  const safeUrl = encodeURIComponent(currentUrl);
  const text = encodeURIComponent("Check out this profile");

  return {
    x: `https://twitter.com/intent/tweet?url=${safeUrl}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${safeUrl}`,
  } as const;
};
