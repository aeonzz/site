# Plan 005: Use stable sitemap lastModified values

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 905a34a..HEAD -- app/sitemap.ts .content-collections.ts content/projects tests plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `905a34a`, 2026-07-08

## Why this matters

`app/sitemap.ts` currently stamps the home page and every project page with
`new Date()` each time the sitemap is generated. That tells crawlers every URL
was modified at generation time, even when neither the page code nor MDX content
changed. The fix is to make `lastModified` come from stable source data so the
sitemap remains truthful and testable.

## Current state

Relevant files:

- `app/sitemap.ts` -- generates `/sitemap.xml`; currently uses runtime dates.
- `.content-collections.ts` -- defines the project MDX schema; currently has no
  stable modified-date field.
- `content/projects/eo-n-ui.mdx` and `content/projects/grydal.mdx` -- project
  source documents whose frontmatter should carry the project modified dates.
- `tests/` -- Vitest coverage for pages/components exists, but no sitemap test
  currently exists.

Current excerpts to confirm before editing:

```ts
// app/sitemap.ts:6-16
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...allProjects.map((project) => ({
      url: `${siteUrl}/projects/${project._meta.path}`,
      lastModified: new Date(),
    })),
  ];
}
```

```ts
// .content-collections.ts:9-17
  schema: z.object({
    title: z.string(),
    href: z.string().url(),
    type: z.string(),
    summary: z.string(),
    image: z.string(),
    order: z.number(),
    content: z.string(),
  }),
```

```mdx
<!-- content/projects/eo-n-ui.mdx:1-7 -->
---
title: eo-n/ui
href: https://eo-n.vercel.app/
type: UI registry
summary: A Base UI-powered component registry for reusable React, Tailwind CSS, and shadcn-style interface patterns.
image: /images/eo-n.png
order: 1
---
```

Repo conventions to match:

- Tests use Vitest plus Testing Library, colocated under `tests/`, and import app
  modules with the `@/` alias. Follow the direct assertion style in
  `tests/project-page.test.tsx`.
- Content project frontmatter is plain YAML with quoted strings only when needed.
  For date strings, quote the value to keep the Content Collections schema simple
  and avoid YAML date coercion surprises.
- Keep app route helpers synchronous where they already are synchronous.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `pnpm install` | exit 0 |
| Lint | `pnpm lint` | exit 0 |
| Typecheck | `pnpm exec tsc --noEmit --incremental false` | exit 0, no output |
| Tests | `pnpm test` | exit 0, all test files pass |
| Build | `pnpm build` | exit 0; build lists `/`, both project pages, `/robots.txt`, and `/sitemap.xml` |

These commands were verified during recon on 2026-07-08, except `pnpm install`,
which should only be needed if dependencies are absent.

## Scope

**In scope** (the only files you should modify):

- `app/sitemap.ts`
- `.content-collections.ts`
- `content/projects/eo-n-ui.mdx`
- `content/projects/grydal.mdx`
- `tests/sitemap.test.ts` (create)
- `plans/README.md` (status row only when complete)

**Out of scope** (do NOT touch, even though they look related):

- `app/robots.ts` -- already points at `/sitemap.xml`; no behavior change needed.
- `app/projects/[slug]/page.tsx` -- project routing/metadata is not part of this
  fix.
- `next.config.ts` and image configuration.
- Any generated `.content-collections/`, `.next/`, or lockfile output.

## Git workflow

- Branch: `advisor/005-stabilize-sitemap-lastmodified`
- Commit message style observed in `git log`: short conventional-ish prefixes
  such as `feat:` and `ref:`. Use `fix: stabilize sitemap lastModified values`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add stable project modified dates to content data

In `.content-collections.ts`, add a `lastModified` field to the project schema.
Prefer an ISO date string contract, not `Date`, so `MetadataRoute.Sitemap` can
receive stable serializable values directly:

```ts
lastModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
```

Then add quoted `lastModified` frontmatter to each project MDX document. Use a
date that reflects when this content was last intentionally updated. If there is
no better project-specific source, use `"2026-07-07"` for the existing documents
because the previous plan reconciliation on that date verified the content-driven
project pages as done.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

### Step 2: Make sitemap dates come from source data

Update `app/sitemap.ts` so it no longer calls `new Date()` inside `sitemap()`.
Use the project `lastModified` value for project URLs. For the home page, derive
a stable value from the latest project date, because the home page lists the same
projects:

```ts
const homeLastModified = allProjects
  .map((project) => project.lastModified)
  .toSorted()
  .at(-1);
```

If `homeLastModified` is missing, omit the home page `lastModified` field rather
than falling back to the current clock. Keep `siteUrl` unchanged.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

### Step 3: Add a sitemap regression test

Create `tests/sitemap.test.ts`. Import `sitemap` from `@/app/sitemap` and
`allProjects` from `content-collections`. Cover these cases:

- the sitemap includes `https://aeonz.dev`;
- every project has an entry at `https://aeonz.dev/projects/<slug>`;
- each project entry's `lastModified` equals that project's frontmatter value;
- the home page `lastModified` equals the latest project `lastModified` value;
- no sitemap entry has a `Date` object produced from the current runtime clock.

Model the assertion style after `tests/project-page.test.tsx`: direct imports,
`describe`/`it`, and explicit expectations.

**Verify**: `pnpm test -- tests/sitemap.test.ts` -> exit 0 and the new sitemap
test file passes.

### Step 4: Run the full verification gate

Run the complete gate after the focused test passes.

**Verify**:

- `pnpm lint` -> exit 0.
- `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.
- `pnpm test` -> exit 0; existing tests plus `tests/sitemap.test.ts` pass.
- `pnpm build` -> exit 0; the route summary includes `/sitemap.xml`.

## Test plan

- New file: `tests/sitemap.test.ts`.
- Use `tests/project-page.test.tsx` as the structure pattern for importing app
  route helpers and asserting returned metadata-like data.
- The regression is specifically that `lastModified` must come from content
  source data, not `new Date()`.

## Done criteria

ALL must hold:

- [ ] `app/sitemap.ts` contains no `new Date()` calls.
- [ ] `.content-collections.ts` requires a stable `lastModified` field for
  project content.
- [ ] Both existing project MDX files define quoted ISO `lastModified` values.
- [ ] `tests/sitemap.test.ts` exists and fails against the old `new Date()`
  behavior but passes after the fix.
- [ ] `pnpm lint` exits 0.
- [ ] `pnpm exec tsc --noEmit --incremental false` exits 0.
- [ ] `pnpm test` exits 0.
- [ ] `pnpm build` exits 0 and includes `/sitemap.xml`.
- [ ] No files outside the in-scope list are modified, except ignored build
  artifacts produced by `pnpm build`.
- [ ] `plans/README.md` status row for plan 005 is updated from TODO to DONE.

## STOP conditions

Stop and report back (do not improvise) if:

- The current excerpts above do not match the live files.
- Content Collections rejects a string `lastModified` field even after quoted MDX
  frontmatter is used.
- Fixing the sitemap requires changing project route behavior or metadata output.
- A verification command fails twice after a reasonable local fix attempt.
- You discover a better authoritative content-updated date source already exists
  elsewhere in the repo; report it instead of adding a duplicate field.

## Maintenance notes

- Future project MDX files must include `lastModified`; the schema should make
  omission fail during content collection generation.
- Reviewers should check that sitemap dates only change when content or page data
  actually changes.
- If the home page later contains substantial independent content changes, add a
  separate stable `homeLastModified` source rather than using the latest project
  date forever.