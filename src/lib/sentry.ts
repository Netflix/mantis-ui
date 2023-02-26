import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function initializeSentry(dsn: string) {
  Sentry.init({
    dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    ignoreErrors: [
      /^ResizeObserver loop/, // See https://github.com/WICG/ResizeObserver/issues/38
    ],
  });
}

export function setSentryTag(tagName: string, tagValue: string) {
  Sentry.setTag(tagName, tagValue);
}

export function setSentryUser(email: string) {
  Sentry.setUser({ email });
}
