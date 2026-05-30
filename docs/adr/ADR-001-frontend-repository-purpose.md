# ADR-001: Frontend repository purpose

- **Status:** Accepted
- **Date:** 2026-05-30

## Context

We are building a forum application as part of a multi-repository CI/CD teaching
course. The application has a clear front-of-house concern — a user-facing
Angular UI — that is distinct from the forum's business logic and data
persistence.

We need to decide where the frontend lives and what it is responsible for.

## Decision

This repository exists as a **dedicated frontend (UI) repository**. Its sole
purpose is the Angular user interface for the forum:

- It owns frontend code, frontend CI (added later), and the frontend Docker
  image (added later).
- It communicates with the backend exclusively over the backend's HTTP API.
- It does **not** contain backend code (business logic, persistence).
- It does **not** own full-system orchestration (Docker Compose, UAT) — that
  belongs to the CI/CD repository.

## Rationale

- **Clear ownership and boundaries.** A dedicated UI repo makes the
  presentation layer's responsibilities unambiguous and easy to teach.
- **Independent lifecycle.** The frontend can be built, tested, versioned, and
  shipped (as its own image) independently of the backend.
- **Teaching clarity.** Students can reason about the frontend in isolation
  without backend concerns leaking in.
- **Fits the multi-repo CI/CD model.** Each layer (UI, backend, orchestration)
  is a separate repository, which is the explicit subject of the course (see
  [ADR-002](ADR-002-multi-repo-ci-cd-architecture.md)).

## Consequences

- The repository must stay focused: presentation only, no backend logic, no
  product-level orchestration.
- Cross-layer integration (running UI + backend together, UAT) happens in the
  CI/CD repository, not here.
- The repo starts as documentation only and grows incrementally; see
  [`README.md`](../../README.md) and [`docs/constraints.md`](../constraints.md).
