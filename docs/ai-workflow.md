# AI Workflow

This document describes how AI assistants are expected to work in this
repository. It applies to both browser-based AI (chat that suggests code you
copy in) and terminal/agent AI (tools that can read, edit, and run commands
directly).

The goal: AI is a useful collaborator, but humans stay in control, and the
repository stays small, clean, and teaching-friendly.

## Core rules

1. **Work in branches.** Never change `main` directly. Create a descriptive
   branch for each logical unit of work.
2. **Inspect before changing.** Read the relevant files and docs to understand
   the current state before proposing or making edits.
3. **Make small, logical changes.** One concern per change. Avoid sweeping
   refactors or unrelated edits bundled together.
4. **Report changed files.** After making changes, clearly list every file that
   was created or modified.
5. **Report validation commands.** State which commands were (or should be) run
   to validate the change — build, test, lint, etc. Report their results
   honestly, including failures.
6. **Do not touch secrets.** Never read, write, or print secret values. Only
   `.env.example` (safe public placeholders) belongs in the repo; real `.env`
   files are git-ignored.
7. **Do not push without explicit permission.** Committing locally on a branch
   is fine; pushing to a remote requires explicit human approval.
8. **Do not introduce dependencies without justification.** New libraries,
   frameworks, or tools must be justified and approved. Prefer standard Angular
   defaults (see [`docs/constraints.md`](constraints.md)).
9. **Require human review before merge.** No AI-generated change merges without
   a human reviewing it.

## Browser AI vs. terminal/agent AI

These two modes have different capabilities and therefore different
responsibilities.

### Browser AI (chat-based)

- Cannot directly modify the repository; it produces suggestions a human copies
  in.
- Should still follow the scope and constraints docs, and clearly mark which
  files its suggestions touch.
- The human applying the suggestion is responsible for branch, validation, and
  review.

### Terminal / agent AI (direct access)

- Can read files, make edits, and run commands directly.
- Must follow all core rules above, especially: work in branches, inspect first,
  keep changes small, report changed files and validation commands, never touch
  secrets, and never push without permission.
- Must not run destructive or outward-facing commands without explicit approval.

## Reporting format

When an AI assistant finishes a unit of work, it should report:

- **Files created** — list of new files.
- **Files modified** — list of changed files.
- **Validation** — commands run and their outcomes.
- **Scope notes** — anything intentionally left out, and why.

## What stays out of scope

AI assistants must respect the boundaries in [`ARCHITECTURE.md`](../ARCHITECTURE.md)
and [`docs/constraints.md`](constraints.md): no backend code, no product-level
orchestration, no GitHub Actions or Docker in this iteration, and no extra
tooling beyond what the task requires.
