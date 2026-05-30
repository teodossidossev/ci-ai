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

- ✅ Documentation and AI-ready scaffolding
- ✅ Angular application skeleton (this iteration): simple page, backend status
  card, posts placeholder, and a backend status service
- ⬜ Frontend CI via GitHub Actions (not added yet)
- ⬜ Docker image for the UI (not added yet)

The app currently renders a single page and performs a backend connectivity
check. It does **not** yet load forum posts and has **no** authentication.

## Requirements

- **Node.js** `^20.19 || ^22.12 || >=24` (developed on Node 22). The exact
  supported range is enforced by Angular 21.
- **npm** 10+ (this repo uses npm; a `package-lock.json` is committed).

## Getting started

```bash
# Install dependencies (clean, reproducible install from the lockfile)
npm ci

# Start the dev server at http://localhost:4200
npm start

# Lint
npm run lint

# Run unit tests once (CI mode, no watch)
npm run test:ci

# Run unit tests in watch mode
npm test

# Production build (output in dist/)
npm run build:prod
```

## Testing

Unit tests use the **Angular CLI's current default unit-test setup**, which is
**Vitest** (via the `@angular/build:unit-test` builder) with `jsdom`. Tests use
Angular's official HTTP testing utilities (`provideHttpClientTesting` /
`HttpTestingController`) and never contact a real backend.

This repo deliberately keeps whatever test runner the Angular CLI ships by
default. The focus of the course is **CI/CD**, not test-runner migration, so we
do not swap Vitest for Karma/Jasmine (or vice versa) unless explicitly required.

## Backend URL configuration

The backend base URL is configured in **one clear place**:
[`src/environments/environment.ts`](src/environments/environment.ts)
(`backendBaseUrl`, default `http://localhost:9000`).

That value is wired into the app via the `BACKEND_BASE_URL` injection token in
[`src/app/app.config.ts`](src/app/app.config.ts), so it is never hardcoded
inside components or service methods and can be overridden in tests.

The status check calls a health path (`/health`) that is an **intentional,
configurable placeholder** — it is **not** a confirmed part of the real backend
contract yet. It lives in `BackendStatusService.HEALTH_PATH` so it is easy to
change once the contract is agreed, and it is fully mocked in unit tests.

> **Note:** This is **build-time** configuration. Angular does **not** read
> `.env` files automatically. [`.env.example`](.env.example) only *documents*
> the expected configuration. A **runtime** configuration mechanism (e.g. Docker
> entrypoint substitution) will be added in a later iteration.

## What will be added later

- Loading and display of forum posts (once the backend exposes the API).
- Authentication (not implemented yet).
- Frontend CI (**GitHub Actions** — not added yet).
- A **Docker** image for the UI (not added yet).

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
