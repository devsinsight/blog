## SEO Essentials Architecture

### Scope & goals
- Add dynamic `generateMetadata` for blog detail pages (slug-based) with safe fallbacks.
- Provide global OpenGraph/Twitter defaults and per-post overrides.
- Expose `robots.txt`, `sitemap.xml`, and `rss.xml` using simple manual route handlers (no secrets, no env).
- Keep gates green: lint, test, build.

### Current state (baseline)
- Root metadata is static and generic in [`metadata`](src/app/layout.tsx:17).
- Blog index renders mock posts without metadata specialization in [`BlogPage`](src/app/blog/page.tsx:4).
- Domain model supports optional SEO fields in [`Post`](src/features/blog/domain/Post.ts:8).
- No route handlers yet for robots/sitemap/rss.

### Decisions
- **Manual route handlers** for `robots.txt`, `sitemap.xml`, `rss.xml` to avoid extra deps; small surface, easy to test.
- **Metadata defaults** in layout: site name, baseUrl, OpenGraph/Twitter fallbacks, canonical builder.
- **Per-post metadata**: use `generateMetadata` in blog detail route (to be added at `src/app/blog/[slug]/page.tsx`).
- **Source of truth**: start with in-memory mocks; keep a `getAllPosts()` and `getPostBySlug()` utility to feed metadata, sitemap, and RSS. Later swap to CMS with same interface.
- **No secrets / no env**: all URLs derived from `NEXT_PUBLIC_SITE_URL` if present, else `https://example.com` fallback (string literal ok for docs; when coding, read from config util).

### Interfaces & helpers (to add during implementation)
- `getAllPosts(): Promise<PostSummary[]>` and `getPostBySlug(slug: string): Promise<Post | null>` in a shared server utility (e.g., `src/features/blog/data/posts.server.ts`).
- `buildAbsoluteUrl(path: string, baseUrl: string)` in a shared util (e.g., `src/shared/utils/url.ts`).
- `siteConfig` object (e.g., `src/shared/config/site.ts`): `{ name, description, baseUrl, locale, twitterHandle }`.

### Metadata plan
- **Global (`src/app/layout.tsx`)**
  - Set `metadataBase` from `siteConfig.baseUrl`.
  - Defaults: title template `"%s | Devs Insight"`, description from site config, keywords broad to the blog domain.
  - OpenGraph: type `website`, default image fallback (static `/og-default.png`), locale, siteName.
  - Twitter: card `summary_large_image`, site handle, creator handle (same as site).
  - Canonical: set at page level via `alternates.canonical` when applicable.

- **Blog detail (`src/app/blog/[slug]/page.tsx`)**
  - Export `generateMetadata` to fetch `Post` by slug. If missing, return `notFound()` metadata (or throw `notFound()` in page loader).
  - Title: `post.seo?.title ?? post.title`.
  - Description: `post.seo?.description ?? post.excerpt`.
  - Keywords: `post.seo?.keywords ?? post.tags.map(t => t.name)`.
  - Published/modified: use `publishedAt`/`updatedAt` for OpenGraph article fields.
  - Images: `post.coverImageUrl ?? "/og-default.png"` (absolute via `buildAbsoluteUrl`).
  - Canonical: `buildAbsoluteUrl(`/blog/${slug}`, baseUrl)`.

### Route handlers
- `src/app/robots.txt/route.ts`
  - Static allow-all plus sitemap pointer: `Sitemap: {baseUrl}/sitemap.xml`.
  - Content-Type `text/plain`.

- `src/app/sitemap.xml/route.ts`
  - GET: assemble URLs for home `/`, blog index `/blog`, and each published post (slug) from `getAllPosts()`.
  - Use `lastmod` from `updatedAt ?? publishedAt ?? createdAt`.
  - Content-Type `application/xml`.

- `src/app/rss.xml/route.ts`
  - GET: RSS 2.0 minimal feed.
  - Channel uses `siteConfig` values; items loop over published posts sorted by date.
  - Content-Type `application/rss+xml`.

### Data flow (mermaid)
```mermaid
flowchart TD
  subgraph Config
    A[siteConfig]
    B[buildAbsoluteUrl]
  end
  subgraph Data
    C[getAllPosts]
    D[getPostBySlug]
  end

  D -->|slug| E[generateMetadata(blog/[slug])]
  A --> E
  B --> E

  C --> F[sitemap.xml route]
  A --> F
  B --> F

  C --> G[rss.xml route]
  A --> G
  B --> G

  A --> H[robots.txt route]
```

### Extensibility & RSC boundaries
- Keep data utilities server-only (no `use client`) and serializable outputs.
- `generateMetadata` must remain a Server Component function; fetch only primitive/serializable fields.
- Route handlers run server-side; avoid importing client components.

### Testing & gates
- **lint**: ensure new files adhere to eslint (no unused imports). Keep route handlers typed.
- **test**: add unit tests for `buildAbsoluteUrl`, and for sitemap/rss string generation helpers if factored.
- **build**: ensure `generateMetadata` path exists and no dynamic import of client modules; provide fallback baseUrl constant to avoid env-dependent build failures.

### Implementation checklist
- [ ] Add `siteConfig` and `buildAbsoluteUrl` helper.
- [ ] Update `src/app/layout.tsx` metadata defaults (title template, OG/Twitter, metadataBase).
- [ ] Create blog detail route `src/app/blog/[slug]/page.tsx` with `generateMetadata` and page body (can reuse `PostList` or new component later).
- [ ] Add route handlers for `robots.txt`, `sitemap.xml`, `rss.xml`.
- [ ] Add tests for helpers (URL builder, sitemap/rss generation) if split into pure functions.
- [ ] Run lint, test, build gates.
