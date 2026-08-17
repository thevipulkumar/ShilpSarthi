'use client';

import { useSyncExternalStore } from 'react';

/**
 * Reads a value that lives outside React and does not change during the session:
 * localStorage, sessionStorage, or a one-shot time comparison.
 *
 * Why this rather than `useState` plus a mount effect: calling setState
 * synchronously in an effect body causes a second render pass on every mount,
 * and React 19's compiler lint rejects it. `useSyncExternalStore` is the
 * supported way to read an external source, and it handles the server-to-client
 * handover without a hydration mismatch.
 *
 * `getClient` must return a primitive, or a value that is referentially stable
 * across calls. Returning a fresh object each time will loop.
 */
const noopSubscribe = () => () => {};

export function useClientSnapshot<T>(getClient: () => T, getServer: () => T): T {
  return useSyncExternalStore(noopSubscribe, getClient, getServer);
}

/** Storage reads that must never throw, whatever the privacy mode. */
export function readLocal(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
