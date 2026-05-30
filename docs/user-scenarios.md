# User Scenarios

These scenarios describe how a user is expected to experience the Forum MSE 2026
UI. They
complement the functional requirements in [`docs/requirements.md`](requirements.md)
and are written from the user's point of view.

## Scenario 1 — User opens the forum UI
**Given** the user navigates to the forum UI in their browser,
**when** the page loads,
**then** they see the forum frontend shell (header/title and a main content
area), even before any backend data is loaded.

## Scenario 2 — User checks backend status
**Given** the forum UI is open,
**when** the UI checks the backend connectivity,
**then** the user sees a clear status indicator showing the backend is reachable
("online"), based on a call to the backend's HTTP API.

## Scenario 3 — User sees the backend is unavailable
**Given** the forum UI is open and the backend cannot be reached,
**when** the connectivity check fails,
**then** the user sees a clear "backend unavailable" / offline message rather
than a blank screen or a silent failure.

## Scenario 4 — User sees that authentication is required
**Given** the forum UI attempts to load data from the backend,
**when** the backend responds that the request is unauthorized (e.g. 401/403),
**then** the user sees a clear "authentication required" message.

> Note: the first version does not implement authentication itself (see
> [`docs/constraints.md`](constraints.md)); it only recognizes and communicates
> the unauthorized state.

## Scenario 5 (future) — User sees forum posts
**Given** the forum UI is open and the backend is reachable,
**when** the UI loads forum posts,
**then** the user sees the list of posts on success, an empty-state message when
there are none, a loading indicator while fetching, and an error message if the
request fails.
