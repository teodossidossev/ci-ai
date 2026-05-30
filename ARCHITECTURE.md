# Architecture

This document describes the architecture of the Forum MSE 2026 UI repository and how it
fits into the larger, multi-repository system.

## High-level frontend architecture

This repository will host a **simple Angular single-page application** that
serves as the user-facing frontend for a forum. The intended shape is
deliberately conventional:

- A standard Angular application shell (root component + routing).
- Feature views for the forum (e.g. a posts view, added later).
- A thin HTTP service layer that calls the backend's REST API.
- Plain Angular state handling (component state + services); no external state
  management library.

The frontend is responsible for **presentation and user interaction only**. It
holds no business rules and no persistent data of its own.

## Three-layer application context

The full product is split across three layers, each owned by a separate
repository:

```
+---------------------+        HTTP API        +---------------------+
|      UI (this)      |  ------------------->  |       Backend       |
|  Angular frontend   |  <-------------------  |  Business logic +   |
|  Presentation only  |        JSON            |    persistence      |
+---------------------+                        +---------------------+
            \                                            /
             \                                          /
              \             images / config            /
               v                                       v
            +-----------------------------------------------+
            |                  CI/CD repo                   |
            |  Orchestrates the full system: pulls UI +     |
            |  backend images, runs Docker Compose, runs    |
            |  UAT, publishes a tested release descriptor   |
            +-----------------------------------------------+
```

1. **UI layer (this repository).** The Angular frontend. Presentation and user
   interaction. Talks to the backend exclusively over an HTTP API.
2. **Backend layer (separate repository).** Owns business logic and
   persistence. Exposes an HTTP API consumed by the UI.
3. **Orchestration layer (CI/CD repository).** Owns full-system assembly: pulls
   the UI and backend Docker images, runs them together via Docker Compose,
   executes user acceptance testing (UAT), and publishes a tested compose
   release descriptor.

## How the UI talks to the backend

- The UI communicates with the backend **only through the backend's HTTP API**.
- Requests and responses are JSON over HTTP.
- The backend base URL is configured in one place
  ([`src/environments/environment.ts`](src/environments/environment.ts)) and
  injected through the `BACKEND_BASE_URL` token (see
  [`src/app/app.config.ts`](src/app/app.config.ts)). `.env.example` only
  documents the expected configuration; Angular does not read `.env` files.
- The UI must gracefully handle the full range of API outcomes: loading, empty,
  success, error, and unauthorized. See [`docs/requirements.md`](docs/requirements.md).

## Responsibility boundaries

The backend owns:

- Business logic and rules.
- Data persistence and storage.
- Authentication / authorization decisions.

The CI/CD repository owns:

- Full-system orchestration (Docker Compose of UI + backend).
- User acceptance testing across the assembled system.
- Publishing the tested compose release descriptor.

## What this repository must NOT contain

To keep the layers clean and the teaching example clear:

- **No backend code.** Business logic and persistence belong in the backend repo.
- **No product-level Docker Compose / UAT orchestration.** Assembling and
  acceptance-testing the whole system belongs in the CI/CD repo.

This repository may *later* contain its own frontend CI and a Docker image that
builds and serves the UI — but never the orchestration of the complete product.

## Generated frontend structure

The app is a standard Angular CLI project (standalone components, no NgModules),
generated with current-stable Angular and intentionally minimal:

```
src/
  main.ts                          # bootstraps the standalone App component
  index.html, styles.css           # document shell and global styles
  environments/
    environment.ts                 # THE place to configure backendBaseUrl
  app/
    app.ts / app.html / app.css    # root component: title, status card, posts placeholder
    app.config.ts                  # providers: HttpClient + BACKEND_BASE_URL token
    app.spec.ts                    # root component unit test
    backend.config.ts              # BACKEND_BASE_URL injection token
    backend-status.service.ts      # backend communication (status check only)
    backend-status.service.spec.ts # service unit test (success + error paths)
```

Key conventions:

- **Configuration boundary.** The backend URL lives only in `environment.ts` and
  reaches the service via the `BACKEND_BASE_URL` token — never hardcoded in
  component or service method bodies.
- **Thin service layer.** `BackendStatusService` is the only place that performs
  HTTP. For now it implements a single connectivity/status check and
  deliberately does not call protected endpoints (e.g. `/posts`) because there is
  no auth yet.
- **Status endpoint is a placeholder.** The status check targets a `/health`
  path (`BackendStatusService.HEALTH_PATH`) that is **not** a confirmed part of
  the real backend contract. It is intentionally configurable and is fully
  mocked in tests, so it can be aligned with the real contract later without
  touching component code.
- **Testing.** This repo uses the **Angular CLI's current default unit-test
  setup**, which is **Vitest** (`@angular/build:unit-test` builder) with `jsdom`.
  Tests use Angular's official HTTP testing utilities (`provideHttpClientTesting`
  / `HttpTestingController`) and never contact a real backend. Because the course
  focus is CI/CD rather than test-runner migration, we keep whatever runner the
  CLI ships by default and do not switch runners unless explicitly required.

## Deferred / not yet present

The following are planned but intentionally not implemented yet (see
[`docs/constraints.md`](docs/constraints.md)):

- Loading and display of forum posts.
- Authentication.
- Frontend CI (GitHub Actions).
- The UI Docker image and any runtime configuration mechanism.
