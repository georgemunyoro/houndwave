import App from "./App.svelte";

import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

// Initialize the Sentry SDK here
Sentry.init({
  dsn: __myapp.env.SENTRY_URL,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      mask: false,
    }),
  ],
});

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
