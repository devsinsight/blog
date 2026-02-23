# Blog Content Provider Architecture

Goal: Introduce a Strategy-based ContentProvider for blog content retrieval while keeping the UI layer CMS-agnostic and testable.

Scope
- ContentProvider interface (Strategy).
- useCases delegating to provider.
- Provider factory with Sanity placeholder.
- Tests mocking ContentProvider for useCases.

Domain alignment
- Inputs/outputs reuse existing domain models: PostSummary, Post, TagSummary.
- Keep useCases returning Promise-based values for async CMS fetches.
- Avoid leaking CMS-specific fields beyond the provider layer.

ContentProvider (Strategy)
- Location: src/features/blog/services/ContentProvider.ts
- Responsibility: Define contract for fetching posts and tags.
- Interface (TypeScript):
```ts
export interface ContentProvider {
  getLatestPosts(limit?: number): Promise<PostSummary[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getAllTags(): Promise<TagSummary[]>;
  getPostsByTag(tagSlug: string): Promise<PostSummary[]>;
}
```
- Notes:
  - return null when slug not found; avoid throwing 404 upstream.
  - enforce published-only filtering inside provider; drafts stay internal.
  - apply defensive defaults (limit > 0, sanitize inputs with slug utility).

useCases
- Location: src/features/blog/services/useCases.ts
- Functions accept provider: ContentProvider (DI-friendly).
- Pure delegation + minimal shaping; no CMS details.
- Suggested signatures:
```ts
export async function fetchLatestPosts(provider: ContentProvider, limit?: number)
export async function fetchPostBySlug(provider: ContentProvider, slug: string)
export async function fetchAllTags(provider: ContentProvider)
export async function fetchPostsByTag(provider: ContentProvider, tagSlug: string)
```
- Error handling: propagate provider errors; let pages handle not-found/null gracefully.
- These remain server-safe and can run in RSC boundaries; avoid client-only APIs.

Provider factory
- Location: src/lib/cms/provider.ts
- Responsibility: choose concrete provider by config (env, feature flag, or static selection).
- For now: return SanityProvider placeholder that throws informative error until wired.
- Shape:
```ts
export function createContentProvider(): ContentProvider
```
- Future: add other providers (LocalMockProvider, FilesystemProvider) without changing consumers.
- Keep factory pure; do not read secrets directly; accept config object if needed.

Testing strategy
- Mock ContentProvider in useCases tests to verify delegation + data pass-through.
- Use manual jest mocks (no globals); feed resolved values and errors.
- Cover:
  - fetchLatestPosts forwards limit and result.
  - fetchPostBySlug returns null passthrough.
  - fetchAllTags returns list passthrough.
  - fetchPostsByTag forwards tagSlug and result.
- Add negative path: provider rejection surfaces to caller (no swallowing).

Data flow (mermaid)
```mermaid
graph TD
  UI[PostList page] --> UC[useCases.ts]
  UC --> |ContentProvider interface| CP[Concrete Provider]
  CP --> |CMS API (Sanity)| CMS[(Sanity)]
  CP -.-> |swap| Mock[(Mock Provider)]
```

RSC & boundaries
- Keep useCases as server-friendly (no window/document).
- Providers should be async and serializable outputs (domain types only).
- Avoid non-serializable fields; ensure dates are strings (already ISO).

Extensibility guardrails
- Add new methods by extending interface and provider impls together.
- Keep factory single responsibility; prefer config object to branching env reads.
- Avoid hardcoded URLs/keys; inject via env parsing upstream.
