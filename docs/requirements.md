# Functional Requirements

These are the functional requirements for the Forum MSE 2026 UI. They are
intentionally
modest: this is a teaching frontend, not a production product. See
[`docs/constraints.md`](constraints.md) for what is deliberately excluded.

Requirements are grouped into what the first version should do and what comes
later.

## First version

### FR-1 — Render the forum frontend shell
The application renders a basic forum UI shell: a recognizable application
layout (header / title and a main content area) that the rest of the UI lives
in. This works even before any backend data is available.

### FR-2 — Display backend connectivity / status
The UI shows the user whether the backend is reachable (e.g. an "online" /
"offline" indicator based on a status/health call to the backend's HTTP API).
The backend base URL comes from configuration (see [`.env.example`](../.env.example)).

### FR-3 — Handle the full range of UI states
For any data the UI loads from the backend, it must clearly handle and display:

- **Loading** — a request is in progress.
- **Empty** — the request succeeded but there is no data to show.
- **Success** — data was loaded and is displayed.
- **Error** — the request failed (network error, server error, etc.).
- **Unauthorized** — the backend indicates authentication is required
  (e.g. a 401/403 response).

These states apply to the status check now, and to forum posts later.

## Later

### FR-4 — Load and display forum posts
The UI loads forum posts from the backend's HTTP API and displays them, reusing
the loading / empty / success / error / unauthorized handling from FR-3.

## Non-functional intent

### NFR-1 — Keep the UI intentionally simple
The UI is kept deliberately small and conventional for teaching purposes:
standard Angular defaults, no extra frameworks, no state management library, no
UI component library. Simplicity and readability take priority over features.
See [`docs/constraints.md`](constraints.md).
