/** Tiny class-name joiner. Not worth a dependency. */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}

/** Formats a duration into the countdown parts, floored at zero. */
export function splitDuration(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: clamped <= 0,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
