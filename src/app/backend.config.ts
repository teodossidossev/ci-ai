import { InjectionToken } from '@angular/core';

/**
 * Injection token carrying the backend base URL.
 *
 * Services inject this token instead of reading configuration directly, so the
 * value can be provided once in `app.config.ts` (from `environment.ts`) and
 * easily overridden in unit tests.
 */
export const BACKEND_BASE_URL = new InjectionToken<string>('BACKEND_BASE_URL');
