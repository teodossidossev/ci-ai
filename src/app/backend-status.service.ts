import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BACKEND_BASE_URL } from './backend.config';

/** Result of a backend connectivity check. */
export interface BackendStatus {
  /** True when the backend health endpoint responded successfully. */
  online: boolean;
}

/**
 * Small service responsible for backend communication.
 *
 * For now it implements only a connectivity (status) check against a health
 * endpoint. It deliberately does NOT call protected endpoints such as
 * `/posts`, because authentication is not implemented yet.
 *
 * The base URL comes from the injected BACKEND_BASE_URL token, and the health
 * path is a single constant below — both are easy to configure later and to
 * override in tests. No real backend is contacted in unit tests.
 */
@Injectable({ providedIn: 'root' })
export class BackendStatusService {
  /**
   * Path used for the connectivity check, relative to the base URL.
   *
   * NOTE: `/health` is a placeholder, NOT a confirmed part of the real backend
   * contract. Treat it as configurable: once the backend contract is agreed,
   * change this constant (or make it injectable) to match. It is intentionally
   * easy to override and is fully mocked in unit tests.
   */
  static readonly HEALTH_PATH = '/health';

  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BACKEND_BASE_URL);

  /**
   * Checks whether the backend is reachable.
   *
   * Resolves to `{ online: true }` on a successful response and
   * `{ online: false }` on any error, so callers can render a simple
   * online/offline state without handling raw HTTP errors themselves.
   */
  checkStatus(): Observable<BackendStatus> {
    const url = `${this.baseUrl}${BackendStatusService.HEALTH_PATH}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(() => ({ online: true })),
      catchError(() => of({ online: false })),
    );
  }
}
