import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BACKEND_BASE_URL } from './backend.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    // The backend base URL is configured in one clear place: environment.ts.
    { provide: BACKEND_BASE_URL, useValue: environment.backendBaseUrl },
  ],
};
