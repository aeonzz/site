# Plan 002: Establish a minimal test and verification baseline

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md` - unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 905a34a..HEAD -- package.json app/page.tsx components/avatar.tsx components/external-link.tsx components/project-card.tsx .content-collections.ts content/posts/hello-world.mdx plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/001-restore-working-lint-command.md`
- **Category**: tests
- **Planned at**: commit `905a34a`, 2026-07-07

## Why this matters

The site currently has build and TypeScript checks, but no test script or visible tests. That leaves future changes to the homepage, Content Collections transforms, MDX rendering, and components without a fast regression signal. A small baseline should prove the homepage renders key content and that Content Collections data is usable, without overbuilding a test system.

## Current state

Relevant files:

- `package.json` - has `dev`, `build`, `start`, and currently broken `lint`, but no `test` script.
- `app/page.tsx` - renders the homepage, hardcoded projects, and Content Collections posts.
- `.content-collections.ts` - defines the MDX posts collection.
- `content/posts/hello-world.mdx` - sample MDX document feeding the Writing section.
- `components/*.tsx` - simple presentational components used by the page.

Current excerpts:

```json
// package.json:5-10
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint app components .content-collections.ts next.config.ts postcss.config.mjs eslint.config.mjs"
}
```

```tsx
// app/page.tsx:5-11
import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";

const posts = allPosts.toSorted(
  (postA, postB) =>
    new Date(postB.date).getTime() - new Date(postA.date).getTime(),
);
```

```tsx
// app/page.tsx:69-88
<div className="flex flex-col px-3 gap-4">
  <h3 className="text-sm font-medium leading-none mb-3">Writing</h3>
  {posts.map((post) => (
    <article key={post._meta.path} className="space-y-4">
      <header className="space-y-1">
        <time className="block text-xs font-medium text-muted-foreground">
          {new Intl.DateTimeFormat("en", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(new Date(post.date))}
        </time>
        <h3 className="font-semibold text-base">{post.title}</h3>
        <p className="text-xs leading-5 text-muted-foreground">
          {post.summary}
        </p>
      </header>
      <div className="space-y-5 text-sm leading-7 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_h2]:pt-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-7">
        <MDXContent code={post.body} />
      </div>
    </article>
  ))}
</div>
```

```ts
// .content-collections.ts:5-23
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
```

Repo conventions:

- Keep components small and colocated under `components/`.
- App Router pages live under `app/` and use server components by default.
- Package manager is pnpm.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install new dev dependencies | `pnpm add -D <test deps>` | exit 0 and lockfile updated |
| Lint | `pnpm lint` | exit 0 |
| Typecheck | `pnpm exec tsc --noEmit --incremental false` | exit 0, no output |
| Test | `pnpm test` | exit 0, all tests pass |
| Build | `pnpm build` | exit 0, route table includes `/` |

## Scope

**In scope**:

- `package.json`
- `pnpm-lock.yaml`
- Test config files needed for the chosen runner, such as `vitest.config.ts` or equivalent
- Test setup files if needed
- New test files for homepage/content/component smoke coverage
- `plans/README.md`

**Out of scope**:

- Large UI refactors.
- Changing Content Collections behavior beyond testability requirements.
- Adding browser E2E infrastructure unless a lightweight component/server-render test cannot cover the current app.
- Fixing unrelated dependency audit advisories.

## Git workflow

- Branch: `advisor/002-establish-verification-baseline`
- Commit message style: use conventional style, e.g. `test: add homepage verification baseline`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Choose and install the smallest suitable test runner

Use a lightweight runner that works well with React/Next TypeScript code. Vitest with React Testing Library is a reasonable default for this repo, but if a current Next 16 testing recommendation in the project docs points elsewhere, follow that instead.

Add scripts like:

```json
"test": "vitest run",
"test:watch": "vitest"
```

**Verify**: `pnpm test` -> exits nonzero only because no tests exist, or exits 0 with an explicit no-test behavior depending on the runner. Do not proceed if the runner cannot start.

### Step 2: Add a homepage smoke test

Add a test that renders the homepage module and asserts stable user-visible text appears:

- `Hi, I am Christian`
- `Projects`
- `Writing`
- `Hello World`
- `Content Collections + MDX`

Mock or use generated Content Collections output only if necessary. Prefer using the real generated `content-collections` import if `pnpm build` or Content Collections generation makes it available in tests. If the test environment cannot load compiled MDX without complex bundling, isolate the content rendering behind a small helper and test the helper separately; do not rewrite the app broadly.

**Verify**: `pnpm test` -> exit 0 and the new homepage test passes.

### Step 3: Add one component-level regression test

Add a focused test for `ProjectCard` or `ExternalLink` that verifies the important rendered attributes/classes without snapshotting the whole tree. For `ProjectCard`, assert it renders a link to the provided `href`, uses `target="_blank"`, and includes the child label.

**Verify**: `pnpm test` -> exit 0 and includes both homepage and component tests.

### Step 4: Run the full local verification set

Run lint, typecheck, test, and build.

**Verify**: `pnpm lint` -> exit 0.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

**Verify**: `pnpm test` -> exit 0.

**Verify**: `pnpm build` -> exit 0.

### Step 5: Update the plan index

Mark plan 002 as DONE in `plans/README.md` if all done criteria are satisfied.

**Verify**: `grep -n "002 | Establish a minimal test" plans/README.md` -> row status is `DONE`.

## Test plan

This plan creates the baseline tests. Minimum coverage:

- Homepage smoke test for profile text, section headings, and MDX-rendered post content.
- Component test for `ProjectCard` or `ExternalLink` behavior.
- Avoid broad snapshots; assert meaningful text/attributes.

## Done criteria

- [ ] `package.json` has a working `test` script.
- [ ] At least one homepage/content smoke test exists and passes.
- [ ] At least one component-level test exists and passes.
- [ ] `pnpm lint` exits 0.
- [ ] `pnpm exec tsc --noEmit --incremental false` exits 0.
- [ ] `pnpm test` exits 0.
- [ ] `pnpm build` exits 0.
- [ ] `plans/README.md` status row for 002 is updated.

## STOP conditions

Stop and report back if:

- `pnpm lint` fails because the lint script has drifted back to `next lint` or another non-working command.
- The chosen test runner requires a major framework migration or invasive app rewrites.
- MDX/Content Collections loading in tests requires brittle generated-file hacks; propose a smaller seam and report.
- A step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

Keep this baseline small. Future feature work should add tests near the behavior it changes rather than turning this plan's smoke tests into broad snapshots. Reviewers should ensure the test command is documented and remains cheap enough to run before every handoff.
