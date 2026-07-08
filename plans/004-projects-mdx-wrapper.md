# Plan 004: Move Projects into a Content Collections MDX wrapper

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md` - unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 905a34a..HEAD -- .content-collections.ts app/page.tsx components/project-card.tsx components content package.json pnpm-lock.yaml tsconfig.json plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/002-establish-verification-baseline.md`
- **Category**: direction
- **Planned at**: commit `905a34a`, 2026-07-07

## Why this matters

The Writing section already uses Content Collections MDX from `content/posts`, but Projects are still hardcoded inside `app/page.tsx`. Moving Projects into a `content/projects` MDX collection makes editable site content follow one pattern. A wrapper component keeps the homepage clean and gives project MDX files a stable rendering contract.

## Current state

Relevant files:

- `.content-collections.ts` - defines only the `posts` MDX collection.
- `app/page.tsx` - hardcodes the Projects array and renders Writing from Content Collections.
- `components/project-card.tsx` - existing card shell for project links and screenshots.
- `content/posts/hello-world.mdx` - example MDX content file and frontmatter style.
- `plans/README.md` - status index to update.

Current excerpts:

```ts
// .content-collections.ts:5-27
const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    content: z.string(),
  }),
  transform: async (post, context) => {
    const body = await compileMDX(context, post);

    return {
      ...post,
      body,
      slug: post._meta.path,
    };
  },
});

export default defineConfig({
  content: [posts],
});
```

```tsx
// app/page.tsx:43-67
<div className="py-10 flex flex-col px-3 gap-4">
  <h3 className="text-sm font-medium leading-none mb-3">Projects</h3>
  {[
    {
      val: "eo-n/ui",
      href: "https://eo-n.vercel.app/",
      type: "UI registry",
      image: "/images/eo-n.png",
    },
    {
      val: "grydal",
      href: "https://grydal.vercel.app/",
      type: "Image gallery",
      image: "/images/grydal.png",
    },
  ].map(({ val, href, type, image }, i) => (
    <ProjectCard key={i} href={href} type={type} image={image}>
      <div className="space-y-1 flex flex-col">
        <span className="font-semibold text-base">{val}</span>
        <span className="block text-xs text-muted-foreground">
          {type}
        </span>
      </div>
    </ProjectCard>
  ))}
</div>
```

```tsx
// components/project-card.tsx:5-27
function ProjectCard({
  children,
  type,
  image,
  ...props
}: React.ComponentProps<typeof Link> & { type: string; image: string }) {
  return (
    <Link
      prefetch
      className="w-full p-3 text-sm bg-card border border-border text-card-foreground hover:bg-muted transition-all duration-600 ease-out-quad font-medium relative overflow-hidden group"
      target="_blank"
      {...props}
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-15 aspect-video bg-muted border border-border overflow-hidden">
            <Image
              src={image}
              alt={type}
              fill
              sizes="(min-width: 768px) 120px, 96px"
              className="object-cover"
            />
          </div>
          {children}
        </div>
```

```mdx
<!-- content/posts/hello-world.mdx:1-5 -->
---
title: Hello World
summary: My first note powered by Content Collections and MDX.
date: "2026-07-07"
---
```

Repo conventions:

- Content files live under `content/`.
- MDX collection transforms compile `content` into a `body` field with `compileMDX(context, document)`.
- Homepage imports generated collection exports from `content-collections`.
- Presentational wrappers live under `components/`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Lint | `pnpm lint` | exit 0 |
| Typecheck | `pnpm exec tsc --noEmit --incremental false` | exit 0, no output |
| Tests | `pnpm test` | exit 0 |
| Build | `pnpm build` | exit 0; Content Collections builds 2 collections |

## Suggested executor toolkit

- If available, use the `frontend-design` skill only if you decide the wrapper needs visual refinement. Preserve the current compact card aesthetic unless the user asks for a redesign.

## Scope

**In scope**:

- `.content-collections.ts`
- `app/page.tsx`
- `components/project-mdx-card.tsx` (create)
- `content/projects/eo-n-ui.mdx` (create)
- `content/projects/grydal.mdx` (create)
- Existing tests from plan 002, if they need narrow updates for the new project source
- `plans/README.md`

**Out of scope**:

- Removing or renaming `content/posts`.
- Creating `/projects` routes.
- Redesigning the homepage layout.
- Changing project URLs, image files, or labels beyond moving them into MDX/frontmatter.
- Broad dependency updates.

## Git workflow

- Branch: `advisor/004-projects-mdx-wrapper`
- Commit message style: use conventional style, e.g. `feat: source projects from mdx`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a `projects` MDX collection

In `.content-collections.ts`, define a second collection using the existing posts pattern. Suggested schema:

```ts
const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    href: z.string().url(),
    type: z.string(),
    image: z.string(),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (project, context) => {
    const body = await compileMDX(context, project);

    return {
      ...project,
      body,
    };
  },
});
```

Then export both collections:

```ts
export default defineConfig({
  content: [posts, projects],
});
```

**Verify**: `pnpm build` -> exit 0 or fails only because no `content/projects` files exist yet. If it fails for any other reason, stop and report.

### Step 2: Create MDX files for the existing projects

Create `content/projects/eo-n-ui.mdx`:

```mdx
---
title: eo-n/ui
href: https://eo-n.vercel.app/
type: UI registry
image: /images/eo-n.png
order: 1
---

UI registry
```

Create `content/projects/grydal.mdx`:

```mdx
---
title: grydal
href: https://grydal.vercel.app/
type: Image gallery
image: /images/grydal.png
order: 2
---

Image gallery
```

Keep the body short for now; the wrapper will render it as the card description.

**Verify**: `pnpm build` -> exit 0 and output says Content Collections built 2 collections and 3 documents, or equivalent wording for 2 collections.

### Step 3: Create the wrapper component

Create `components/project-mdx-card.tsx`. It should wrap one project document in the existing `ProjectCard` shell and render the MDX body. Keep props explicit enough that the generated collection type is not hard-coded if that causes import friction.

Target shape:

```tsx
import { ProjectCard } from "@/components/project-card";
import { MDXContent } from "@content-collections/mdx/react";

type ProjectMdxCardProps = {
  project: {
    _meta: { path: string };
    title: string;
    href: string;
    type: string;
    image: string;
    body: string;
  };
};

function ProjectMdxCard({ project }: ProjectMdxCardProps) {
  return (
    <ProjectCard href={project.href} type={project.type} image={project.image}>
      <div className="space-y-1 flex flex-col">
        <span className="font-semibold text-base">{project.title}</span>
        <div className="text-xs text-muted-foreground [&_p]:leading-5">
          <MDXContent code={project.body} />
        </div>
      </div>
    </ProjectCard>
  );
}

export { ProjectMdxCard };
```

If plan 003 has already added `sizes` to `ProjectCard`, preserve it. Do not duplicate card styling in this wrapper.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

### Step 4: Replace the hardcoded Projects array on the homepage

Update `app/page.tsx`:

- Import `ProjectMdxCard`.
- Import `allProjects` alongside `allPosts` from `content-collections`.
- Sort projects by `order` once near the top of the file.
- Replace the inline project array/map with `projects.map((project) => <ProjectMdxCard key={project._meta.path} project={project} />)`.

Target top-of-file shape:

```tsx
import { ProjectMdxCard } from "@/components/project-mdx-card";
import { allPosts, allProjects } from "content-collections";

const projects = allProjects.toSorted(
  (projectA, projectB) => projectA.order - projectB.order,
);
```

Keep the `Writing` section behavior unchanged.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

### Step 5: Update tests from plan 002 if present

If plan 002 created homepage tests, update assertions so they still verify both project names and MDX body text are present. Add a targeted wrapper test if it is cheap and follows the existing test style.

**Verify**: `pnpm test` -> exit 0. If plan 002 is not complete and no test command exists, stop and report that this plan's dependency is unmet.

### Step 6: Run full verification

Run the local gates.

**Verify**: `pnpm lint` -> exit 0.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0.

**Verify**: `pnpm test` -> exit 0.

**Verify**: `pnpm build` -> exit 0 and Content Collections reports 2 collections.

### Step 7: Update the plan index

Mark plan 004 as DONE in `plans/README.md` if all done criteria are satisfied.

**Verify**: `grep -n "004 | Move Projects into" plans/README.md` -> row status is `DONE`.

## Test plan

- Update the homepage smoke test from plan 002 to assert `eo-n/ui`, `grydal`, `UI registry`, and `Image gallery` still render.
- If adding a wrapper test, render `ProjectMdxCard` with a minimal fake project object and assert the link, title, and MDX body text are present.
- Run `pnpm test`, `pnpm lint`, typecheck, and build.

## Done criteria

- [ ] `.content-collections.ts` defines both `posts` and `projects` collections.
- [ ] `content/projects/eo-n-ui.mdx` and `content/projects/grydal.mdx` exist with valid frontmatter.
- [ ] `components/project-mdx-card.tsx` exists and wraps project MDX in `ProjectCard`.
- [ ] `app/page.tsx` no longer contains the hardcoded projects array.
- [ ] `app/page.tsx` renders projects from `allProjects` sorted by `order`.
- [ ] `pnpm lint` exits 0.
- [ ] `pnpm exec tsc --noEmit --incremental false` exits 0.
- [ ] `pnpm test` exits 0.
- [ ] `pnpm build` exits 0 and builds 2 Content Collections.
- [ ] `plans/README.md` status row for 004 is updated.

## STOP conditions

Stop and report back if:

- Plan 002 is not complete and no `pnpm test` command exists.
- The generated `content-collections` export name for projects is not `allProjects` after build; inspect generated types and report before improvising.
- The project wrapper needs a client component boundary to render MDX; that would be unexpected and should be reviewed.
- Implementing this requires changing the existing `ProjectCard` public API in a way that affects other callers.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

Future project additions should be new files under `content/projects`, not edits to `app/page.tsx`. Reviewers should check that the wrapper stays presentation-only and that the collection schema remains the source of truth for project metadata.
