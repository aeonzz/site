# Plan 001: Restore a working lint command

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md` - unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 905a34a..HEAD -- package.json eslint.config.mjs plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `905a34a`, 2026-07-07

## Why this matters

The repo advertises `pnpm lint`, but that command fails before checking any source. A broken lint script misleads humans and agents into thinking a quality gate exists while providing no signal. Restoring a working lint command makes future refactors and Content Collections changes easier to verify.

## Current state

Relevant files:

- `package.json` - defines package scripts and dependencies.
- `eslint.config.mjs` - flat ESLint config extending Next rules.
- `plans/README.md` - status index to update when this plan is complete.

Current excerpts:

```json
// package.json:5-10
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

```js
// eslint.config.mjs:1-14
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

Observed failure during audit:

```text
> site@0.1.0 lint C:\Users\COMPUTER\Desktop\christian\projects\site
> next lint

Invalid project directory provided, no such directory: C:\Users\COMPUTER\Desktop\christian\projects\site\lint
```

Repo conventions:

- This is a pnpm-managed Next app.
- Config uses ESM (`next.config.ts`, `eslint.config.mjs`).
- Keep script names simple: `dev`, `build`, `start`, `lint`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install dependencies if needed | `pnpm install` | exit 0 |
| Lint | `pnpm lint` | exit 0, source files linted |
| Typecheck | `pnpm exec tsc --noEmit --incremental false` | exit 0, no output |
| Build | `pnpm build` | exit 0, route table includes `/` |

## Scope

**In scope**:

- `package.json`
- `eslint.config.mjs` only if the script change exposes config incompatibility
- `plans/README.md`

**Out of scope**:

- Source formatting churn unrelated to lint enablement.
- Dependency upgrades unless the chosen lint command cannot run without them.
- Changing the app UI or Content Collections config.

## Git workflow

- Branch: `advisor/001-restore-working-lint-command`
- Commit message style: use the existing conventional style, e.g. `fix: restore lint script`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Replace the deprecated Next lint invocation

Update `package.json` so `lint` invokes ESLint directly against this codebase instead of `next lint`. Prefer:

```json
"lint": "eslint ."
```

If ESLint complains about ignored generated/build files, do not add broad source rewrites. Adjust the command or ESLint ignore settings narrowly so it checks app source and config while avoiding `node_modules`, `.next`, and `.content-collections`.

**Verify**: `pnpm lint` -> exit 0 or real lint diagnostics from source files, not the `Invalid project directory ... lint` error.

### Step 2: Keep typecheck and build green

Run the existing non-mutating typecheck and build checks to confirm the script change did not reveal config breakage.

**Verify**: `pnpm exec tsc --noEmit --incremental false` -> exit 0, no output.

**Verify**: `pnpm build` -> exit 0 and output includes a route table with `/`.

### Step 3: Update the plan index

Mark plan 001 as DONE in `plans/README.md` if all done criteria are satisfied.

**Verify**: `grep -n "001 | Restore a working lint command" plans/README.md` -> row status is `DONE`.

## Test plan

No new tests are required for this script-only fix. The verification is the lint command itself plus typecheck and build.

## Done criteria

- [ ] `pnpm lint` exits 0 and no longer runs `next lint`.
- [ ] `pnpm exec tsc --noEmit --incremental false` exits 0.
- [ ] `pnpm build` exits 0.
- [ ] No source files were modified solely to silence unrelated lint warnings.
- [ ] `plans/README.md` status row for 001 is updated.

## STOP conditions

Stop and report back if:

- `eslint.config.mjs` no longer matches the excerpt above and the correct lint approach is unclear.
- Making lint run requires upgrading Next, React, or ESLint major versions.
- `pnpm lint` reports many existing source issues that would require broad source edits; report the diagnostics instead of fixing them in this plan.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

When Next or ESLint versions change, keep `pnpm lint` as the single advertised lint gate. Reviewers should check that generated directories remain ignored and that the command actually scans project source, not just config files.
