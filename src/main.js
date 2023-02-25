import App from "./App.svelte";

import * as Sentry from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";

// Initialize the Sentry SDK here
Sentry.init({
  dsn: process.env.SENTRY_URL,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
