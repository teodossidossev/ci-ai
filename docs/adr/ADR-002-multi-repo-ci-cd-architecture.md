# ADR-002: Multi-repo CI/CD architecture

- **Status:** Accepted
- **Date:** 2026-05-30

## Context

The forum product consists of three concerns:

1. A user-facing **frontend** (Angular UI).
2. A **backend** that owns business logic and persistence and exposes an HTTP
   API.
3. **Full-system orchestration**: assembling the frontend and backend together,
   running them, performing user acceptance testing (UAT), and publishing a
   tested release.

We need to decide how to organize these concerns across repositories. The two
broad options are a single monorepo or multiple dedicated repositories.

## Decision

We use **three separate repositories**, one per concern:

| Repository | Responsibility |
| ---------- | -------------- |
| **UI repo** (this one) | Frontend code, frontend CI, frontend Docker image |
| **Backend repo** | Backend code, backend CI, backend Docker image |
| **CI/CD repo** | Pulls UI + backend images, runs Docker Compose, runs UAT, publishes a tested compose release descriptor |

The UI and backend each build and publish their own Docker image. The CI/CD
repository consumes those images and owns the orchestration and acceptance
testing of the complete system.

## Rationale

- **Separation of concerns.** Each repository has a single, well-defined
  responsibility and its own CI pipeline.
- **Independent build and release.** Frontend and backend evolve and ship on
  their own schedules, each producing a versioned image.
- **Clear orchestration ownership.** Putting Docker Compose and UAT in a
  dedicated CI/CD repo prevents the UI or backend repos from accidentally taking
  on full-system responsibilities.
- **Teaching value.** A multi-repo CI/CD setup is the explicit subject of the
  course; the structure itself is part of what students learn.

## Consequences

- The UI repo must not contain backend code or product-level orchestration
  (Docker Compose / UAT). See [ADR-001](ADR-001-frontend-repository-purpose.md)
  and [`ARCHITECTURE.md`](../../ARCHITECTURE.md).
- Integration between layers happens via published Docker images and the HTTP
  API contract, coordinated by the CI/CD repository.
- Cross-cutting changes may require coordinated work across more than one
  repository.
- The trade-off versus a monorepo (more repos to manage, cross-repo
  coordination) is accepted in exchange for clearer boundaries and a realistic
  CI/CD teaching model.
