# Constraints and Non-Goals

This document lists the constraints that keep the Forum MSE 2026 UI small,
focused, and
suitable for teaching. Treat these as guardrails: anything here should not be
introduced without explicit discussion and approval.

## Scope constraints (this version)

- **No authentication implementation in the first version** unless explicitly
  requested. The UI recognizes and displays the "unauthorized" state, but does
  not implement login, tokens, or session handling yet.
- **No state management library.** No NgRx, NGXS, Akita, etc. Use plain Angular
  services and component state.
- **No UI component library.** No Angular Material, PrimeNG, Bootstrap component
  kits, etc. Use plain Angular templates and standard CSS.
- **No backend code.** Business logic and persistence live in the backend
  repository (see [`ARCHITECTURE.md`](../ARCHITECTURE.md)).

## Tooling constraints (this iteration)

- **No GitHub Actions yet.** Frontend CI will be added in a later iteration.
- **No Docker yet in this iteration.** A UI Docker image will be added later.
- **No unnecessary tooling.** Do not add linters, formatters, generators, or
  build plugins beyond what a standard Angular project provides by default.

## Guiding principles

- **Keep the repository suitable for teaching.** Favor clarity and readability
  over cleverness; favor small, understandable changes over large ones.
- **Prefer boring, standard Angular defaults.** When in doubt, choose the
  conventional Angular approach rather than a custom or exotic one.

## Relationship to other documents

- Functional requirements: [`docs/requirements.md`](requirements.md)
- User scenarios: [`docs/user-scenarios.md`](user-scenarios.md)
- Architecture and boundaries: [`ARCHITECTURE.md`](../ARCHITECTURE.md)
- How AI should work here: [`docs/ai-workflow.md`](ai-workflow.md)
