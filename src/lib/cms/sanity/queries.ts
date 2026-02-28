const baseProjection = `{
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  _updatedAt,
  image{..., asset->, alt, caption},
  author->{
    _id,
    name,
    slug,
    "avatarUrl": avatar.asset->url
  },
  body
}`;

export const latestPostsQuery = `*[_type == "post" && defined(slug.current) && publishedAt != null] | order(publishedAt desc)[0...$limit] ${baseProjection}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${baseProjection}`;

export const authorProfileQuery = `*[_type == "authorProfile"][0]{
  name,
  titleTagline,
  shortBio,
  avatar{..., asset->, alt},
  location,
  email,
  socialLinks[]{label, url, icon},
  cta{primaryLabel, primaryUrl, secondaryLabel, secondaryUrl},
  experienceTimeline[]{period, role, company, bullets, tech},
  techStack{frontend, backend, cloudDevOps, data, testing},
  highlights[]{title, description, metrics, relatedPostSlug},
  nowSection{title, bullets},
  hobbies[]{title, description, images[]{..., asset->, alt}},
  seo{metaTitle, metaDescription}
}`;
