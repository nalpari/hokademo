<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Package manager

This repo uses **pnpm** (pinned via `packageManager` in package.json). Use `pnpm install` / `pnpm add` / `pnpm dev` — never `npm`, or you'll regenerate a `package-lock.json`.

# Worktrees

- Create worktrees under `~/.worktrees/<project-name>/<landmark-name>`; this project's name is `haka-demo`.
- Name each worktree after a world tourist landmark, using lowercase English words separated by hyphens (for example, `eiffel-tower`).
- Name its branch after a Pokémon, using its lowercase English name (for example, `pikachu`).
- If a worktree path or branch name is already in use, choose another landmark or Pokémon; never overwrite an existing one.
- Example: `git worktree add ~/.worktrees/haka-demo/eiffel-tower -b pikachu`.
