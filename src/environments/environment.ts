/**
 * Application configuration.
 *
 * This is the ONE clear place to configure the backend base URL. Do not
 * hardcode the backend URL anywhere else (components, services). The value is
 * wired into the app via the BACKEND_BASE_URL injection token in
 * `app.config.ts`, which keeps it overridable in tests.
 *
 * This is BUILD-TIME configuration: the value is baked into the bundle when the
 * app is built. Angular does NOT read `.env` files directly; `.env.example`
 * only documents the expected configuration. A RUNTIME configuration mechanism
 * (e.g. Docker entrypoint substitution) will be added in a later iteration.
 */
export const environment = {
  /** Base URL of the backend HTTP API the UI talks to. */
  backendBaseUrl: 'http://localhost:9000',
};
