import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { sanityClient } from "@/lib/cms/sanity/client";
import { authorProfileQuery } from "@/lib/cms/sanity/queries";
import { buildSanityImageUrl } from "@/lib/cms/sanity/image";
import AvatarImage, { type SanityImageWithAlt } from "@/components/AvatarImage/AvatarImage";
import { ShareButtons } from "./ShareButtons";

type AuthorProfile = {
  name: string;
  titleTagline: string;
  shortBio: string;
  avatar?: SanityImageWithAlt | null;
  location?: string;
  email?: string;
  socialLinks?: { label: string; url: string; icon: string }[];
  cta?: { primaryLabel?: string; primaryUrl?: string; secondaryLabel?: string; secondaryUrl?: string };
  experienceTimeline?: { period?: string; role?: string; company?: string; bullets?: string[]; tech?: string[] }[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    cloudDevOps?: string[];
    data?: string[];
    testing?: string[];
  };
  highlights?: { title?: string; description?: string; metrics?: string; relatedPostSlug?: string }[];
  nowSection?: { title?: string; bullets?: string[] };
  hobbies?: { title?: string; description?: string; images?: SanityImageWithAlt[] }[];
  seo?: { metaTitle?: string; metaDescription?: string };
};

export const revalidate = 60;

async function getAuthorProfile(): Promise<AuthorProfile | null> {
  return sanityClient.fetch(authorProfileQuery, {}, { next: { revalidate } });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2, mt: 4 }}>
      {children}
    </Typography>
  );
}

export default async function AboutPage() {
  const profile = await getAuthorProfile();
  console.log('profile: ', profile)
  if (!profile) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          About Me
        </Typography>
        <Typography color="text.secondary">No author profile found.</Typography>
      </Container>
    );
  }

  const heroButtons = [
    profile.cta?.primaryUrl && profile.cta?.primaryLabel
      ? { label: profile.cta.primaryLabel, href: profile.cta.primaryUrl, variant: "contained" as const }
      : null,
    profile.cta?.secondaryUrl && profile.cta?.secondaryLabel
      ? { label: profile.cta.secondaryLabel, href: profile.cta.secondaryUrl, variant: "outlined" as const }
      : null,
  ].filter(Boolean) as { label: string; href: string; variant: "contained" | "outlined" }[];

  return (
    <Container sx={{ py: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box>
          <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }} textAlign={{ xs: "center", md: "left" }}>
            <AvatarImage
              image={profile.avatar}
              alt={profile.avatar?.alt ?? `Photo of ${profile.name}`}
            />
            <Stack spacing={1}>
              <Typography variant="h3" fontWeight={800}>
                {profile.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {profile.titleTagline}
              </Typography>
              <Typography color="text.secondary">{profile.shortBio}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.socialLinks?.map((link) => (
                  <Button key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" variant="outlined" size="small">
                    {link.label}
                  </Button>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {heroButtons.map((btn) => (
                  <Button key={btn.label} href={btn.href} variant={btn.variant} target="_blank" rel="noopener noreferrer">
                    {btn.label}
                  </Button>
                ))}
              </Stack>
              <ShareButtons />
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Card
            variant="outlined"
            sx={{
              bgcolor: "background.paper",
              borderColor: "divider",
              boxShadow: 6,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Highlights
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                  gap: 2,
                }}
              >
                {profile.highlights?.map((item, idx) => (
                  <Card key={`${item.title}-${idx}`} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {item.description}
                      </Typography>
                      {item.metrics && (
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 700 }}>
                          {item.metrics}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <SectionTitle>Experience</SectionTitle>
      <Stack spacing={2}>
        {profile.experienceTimeline?.map((exp, idx) => (
          <Card variant="outlined" key={`${exp.company}-${idx}`}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {exp.role} — {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.period}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
                  {exp.tech?.map((t) => (
                    <Chip key={t} label={t} size="small" />
                  ))}
                </Stack>
              </Stack>
              <Stack component="ul" sx={{ pl: 2, mt: 1 }} spacing={0.5}>
                {exp.bullets?.map((b, i) => (
                  <Typography component="li" variant="body2" color="text.secondary" key={i}>
                    {b}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <SectionTitle>Tech Stack</SectionTitle>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {(
          [
            { title: "Frontend", items: profile.techStack?.frontend },
            { title: "Backend", items: profile.techStack?.backend },
            { title: "Cloud / DevOps", items: profile.techStack?.cloudDevOps },
            { title: "Data", items: profile.techStack?.data },
            { title: "Testing", items: profile.techStack?.testing },
          ] as const
        ).map((group) => (
          <Card key={group.title} variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {group.title}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {group.items?.map((item) => (
                  <Chip key={item} label={item} size="small" />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 4,
          mt: 2,
        }}
      >
        <Box>
          <SectionTitle>{profile.nowSection?.title ?? "Now"}</SectionTitle>
          <Card variant="outlined">
            <CardContent>
              <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                {profile.nowSection?.bullets?.map((item, idx) => (
                  <Typography component="li" variant="body2" color="text.secondary" key={idx}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <SectionTitle>Hobbies</SectionTitle>
          <Stack spacing={2}>
            {profile.hobbies?.map((hobby, idx) => {
                const imgUrl = hobby.images?.[0]
                  ? buildSanityImageUrl(hobby.images[0], { width: 600, height: 360, quality: 80 })
                  : null;
              return (
                <Card variant="outlined" key={`${hobby.title}-${idx}`}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {hobby.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {hobby.description}
                      </Typography>
                      {imgUrl && (
                        <Box sx={{ position: "relative", width: "100%", height: 0, pt: "56%", overflow: "hidden" }}>
                          <Image
                            src={imgUrl}
                            alt={hobby.images?.[0]?.alt ?? hobby.title ?? "Hobby image"}
                            fill
                            sizes="100vw"
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {profile.name}
          </Typography>
          <Typography color="text.secondary">{profile.location}</Typography>
          <Typography color="text.secondary">{profile.email}</Typography>
        </Box>
        <ShareButtons label="Share this profile" />
      </Stack>
    </Container>
  );
}
