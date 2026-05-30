# Forum MSE 2026 UI

> **Repository name:** `ci-ai` &nbsp;·&nbsp; **Project identity:** Forum MSE 2026 UI

The **Angular forum UI** — a simple user interface for a forum application,
built as a teaching project for a multi-repo CI/CD course.

This repository contains **only the frontend**. The forum's business logic and
data live in a separate backend repository, and the full-system orchestration
(running everything together, integration/UAT testing, release) lives in a
dedicated CI/CD repository.

## Purpose

- Provide a deliberately small, easy-to-follow Angular UI for a forum.
- Serve as the **frontend repository** in a multi-repo CI/CD teaching setup.
- Demonstrate how an AI-ready, well-documented repository is structured *before*
  any application code exists.

## Where this repo fits

This UI is one of three cooperating repositories:

| Repository | Responsibility |
| ---------- | -------------- |
| **UI repo** (this one) | Frontend code, frontend CI, frontend Docker image |
| **Backend repo** | Backend code, backend CI, backend Docker image |
| **CI/CD repo** | Pulls UI + backend images, runs Docker Compose, runs UAT, publishes a tested compose release descriptor |

The UI talks to the backend over an HTTP API. It does **not** contain backend
code, and it does **not** own product-level orchestration (Docker Compose / UAT)
— that belongs to the CI/CD repository.

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the full picture.

## Current status

This repository is in its **foundation** phase:

- ✅ Documentation and AI-ready scaffolding (this iteration)
- ⬜ Angular application (not generated yet)
- ⬜ Frontend CI via GitHub Actions (not added yet)
- ⬜ Docker image for the UI (not added yet)

No Angular project has been generated yet. The current contents are
intentionally limited to documentation and configuration placeholders.

## What will be added later

- The Angular application shell and forum UI.
- Backend connectivity / status display.
- Loading of forum posts.
- Frontend CI (GitHub Actions).
- A Docker image for the UI.

These are intentionally deferred. See [`docs/constraints.md`](docs/constraints.md)
for what is explicitly out of scope right now.

## How this repo is used in the course

This repository is meant to be worked on incrementally, with humans and AI
assistants collaborating:

1. Read the documentation first — it defines purpose, scope, and constraints.
2. Make small, reviewable changes on branches.
3. Let CI (added later) and human review gate every merge.

If you are an AI assistant working in this repo, start with
[`docs/ai-workflow.md`](docs/ai-workflow.md).

## Documentation map

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — high-level architecture and boundaries
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute
- [`docs/ai-workflow.md`](docs/ai-workflow.md) — how AI should work here
- [`docs/requirements.md`](docs/requirements.md) — functional requirements
- [`docs/user-scenarios.md`](docs/user-scenarios.md) — user scenarios
- [`docs/constraints.md`](docs/constraints.md) — constraints and non-goals
- [`docs/adr/`](docs/adr/) — architecture decision records

## License

[MIT](LICENSE)
