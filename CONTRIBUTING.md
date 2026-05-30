# Contributing

Thanks for contributing to the Forum MSE 2026 UI. This is a teaching repository, so
clarity and small, reviewable changes matter more than speed or cleverness.

## Before you start

1. Read [`README.md`](README.md) for purpose and status.
2. Read [`ARCHITECTURE.md`](ARCHITECTURE.md) for boundaries (what does and does
   not belong here).
3. Read [`docs/constraints.md`](docs/constraints.md) for what is intentionally
   out of scope.
4. If you are an AI assistant, also read [`docs/ai-workflow.md`](docs/ai-workflow.md).

## Workflow

- **Work on a branch.** Never commit directly to `main`.
- **Inspect before you change.** Understand the current state of the repo first.
- **Make small, logical changes.** One concern per branch / pull request.
- **Keep it boring.** Prefer standard Angular defaults over custom tooling.
- **Document scope changes.** If a change affects architecture or scope, update
  the relevant doc (or add an ADR under [`docs/adr/`](docs/adr/)).

## Pull requests

Every pull request should:

- Describe what changed and why.
- List the files that were changed.
- List the validation commands that were run (for example, build/test/lint once
  the Angular app exists).
- Stay within the boundaries described in `ARCHITECTURE.md`.

**Human review is required before any merge.**

## Scope reminders

- No backend code in this repository.
- No product-level Docker Compose / UAT orchestration here.
- Do not add dependencies, state management libraries, or UI component libraries
  without explicit justification and review.
- Do not add GitHub Actions or Docker in this iteration.

## Secrets and configuration

- Never commit secrets. `.env` is git-ignored; only `.env.example` (with safe,
  public placeholders) is tracked.
- Do not push to remotes without explicit permission from a maintainer.
