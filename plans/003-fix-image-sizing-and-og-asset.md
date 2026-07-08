# Plan 003: Fix project-card image sizing and Open Graph metadata asset

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md` - unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 905a34a..HEAD -- components/project-card.tsx app/layout.tsx public plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `905a34a`, 2026-07-07

## Why this matters

The homepage renders project screenshots with `next/image` using `fill`, but no `sizes` prop. Next warns about this at runtime and may serve larger images than the card actually needs. The metadata also points social previews at `/og-image.jpg`, but that file is absent from `public/`, so crawlers can request a missing image.

## Current state

Relevant files:

- `components/project-card.tsx` - renders project links and screenshot images.
- `app/layout.tsx` - declares Open Graph and Twitter image metadata.
- `public/` - static assets served from the site root.
- `plans/README.md` - status index to update.

Current excerpts:

```tsx
// components/project-card.tsx:20-21
<div className="relative h-15 aspect-video bg-muted border border-border overflow-hidden">
  <Image src={image} alt={type} fill className="object-cover" />
</div>
```

```tsx
// app/layout.tsx:23-39
images: [
  {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Aeonz Open Graph Image",
  },
],
...
twitter: {
  card: "summary_large_image",
  title: "Aeonz",
  description: "Discover the projects and designs by Aeonz.",
  images: ["/og-image.jpg"],
  creator: "@aeonz",
},
```

Observed public assets during audit:

```text
public/avatar.png
public/file.svg
public/globe.svg
public/images/eo-n.png
public/images/grydal.png
public/next.svg
public/vercel.svg
public/window.svg
```

Repo conventions:

- Static images live under `public/`.
- Project cards use Tailwind utility classes and `next/image`.
- Keep component changes local and avoid restyling unrelated UI.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Lint | `pnpm lint` | exit 0 if plan 001 is complete |
| Typecheck | `pnpm exec tsc --noEmit --incremental false` | exit 0, no output |
| Build | `pnpm build` | exit 0, route table includes `/` |
| Optional dev smoke | `pnpm dev` | app starts; browser console no longer reports missing `sizes` for project images |

## Scope

**In scope**:

- `components/project-card.tsx`
- `app/layout.tsx`
- `public/og-image.jpg` or an alternate existing static asset if metadata is updated to point there
- `plans/README.md`

**Out of scope**:

- Redesigning project cards.
- Moving projects into MDX; that is plan 004.
- Changing global metadata unrelated to the image asset.
- Adding remote image hosts.

## Git workflow

- Branch: `advisor/003-fix-image-sizing-and-og-asset`
- Commit message style: use conventional style, e.g. `fix: add project image sizes and og asset`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a `sizes` prop to the fill image

Update the `Image` in `components/project-card.tsx` to include a `sizes` value matching the card thumbnail. The thumbnail is a small fixed-height, aspect-video image inside a max-width 42rem page. A conservative value is acceptable, for example:

```tsx
<Image
  src={image}
  alt={type}
  fill
  sizes="(min-width: 768px) 120px, 96px"
  className="object-cover"
/>
```

Adjust exact pixel values if the live layout has a clearer fixed width, but keep the change local to the image.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

### Step 2: Fix the Open Graph image reference

Choose one of these approaches:

1. Add a real `public/og-image.jpg` with dimensions matching the metadata (`1200x630`) or a suitable static preview image.
2. If a different committed asset should be the preview, update both `openGraph.images` and `twitter.images` to that existing path and ensure dimensions/alt text are accurate.

Do not leave metadata pointing at a file that does not exist.

**Verify**: `test -f public/og-image.jpg || grep -n "images:" app/layout.tsx` -> confirms either the file exists or metadata no longer points to `/og-image.jpg`.

### Step 3: Run local verification

Run available checks.

**Verify**: `pnpm lint` -> exit 0 if plan 001 is complete. If plan 001 is not complete, record that lint is blocked by plan 001 and continue with typecheck/build.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

**Verify**: `pnpm build` -> exit 0.

### Step 4: Update the plan index

Mark plan 003 as DONE in `plans/README.md` if all done criteria are satisfied.

**Verify**: `grep -n "003 | Fix project-card image sizing" plans/README.md` -> row status is `DONE`.

## Test plan

No automated test is required for this small metadata/image fix. If plan 002 has already added tests, run them with `pnpm test`. Manual browser smoke in dev is useful to confirm the warning disappears.

## Done criteria

- [ ] `components/project-card.tsx` passes a `sizes` prop to the `fill` image.
- [ ] Metadata no longer points to a missing Open Graph/Twitter image asset.
- [ ] `pnpm exec tsc --noEmit --incremental false` exits 0.
- [ ] `pnpm build` exits 0.
- [ ] `pnpm lint` exits 0 if plan 001 is complete, or its blocker is noted.
- [ ] `plans/README.md` status row for 003 is updated.

## STOP conditions

Stop and report back if:

- The project-card layout has changed enough that the proposed `sizes` value is obviously wrong and cannot be estimated locally.
- There is no acceptable OG asset and creating one requires design direction from the user.
- The fix appears to require changing unrelated metadata or page layout.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

Any future `Image` using `fill` should include `sizes` at creation time. If the site brand or domain changes, revisit `metadataBase`, Open Graph title/description, and preview image together.
