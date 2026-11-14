const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2018-06-10" -> "10 Jun 2018". Parsed by hand so SSR and client agree. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[(m ?? 1) - 1]} ${y}`;
}

export function toTime(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

export function yearOf(iso: string): number {
  return Number(iso.slice(0, 4));
}

/** Whole days between two ISO dates. */
export function daysBetween(a: string, b: string): number {
  return Math.round((toTime(b) - toTime(a)) / 86_400_000);
}

/** Fraction (0..1) of `iso` along [start, end], clamped. */
export function fractionOf(iso: string, start: string, end: string): number {
  const span = toTime(end) - toTime(start);
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (toTime(iso) - toTime(start)) / span));
}
