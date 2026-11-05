/** Date/time formatting for the English UI (Hermes supports `Intl` on iOS and Android). */

const longDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const shortDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
const weekdayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

const toDate = (value: Date | string) => (typeof value === 'string' ? new Date(value) : value);

/** "Saturday, Nov 8, 2026" */
export const formatLongDate = (value: Date | string) => longDate.format(toDate(value));

/** "Sat, Nov 8" */
export const formatShortDate = (value: Date | string) => shortDate.format(toDate(value));

/** "6:30 PM" */
export const formatTime = (value: Date | string) => time.format(toDate(value));

/** "Sat" */
export const formatWeekdayShort = (value: Date | string) => weekdayShort.format(toDate(value));

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** "Today", "Tomorrow" or "Sat, Nov 8". */
export function formatRelativeDay(value: Date | string, now: Date = new Date()): string {
  const date = toDate(value);
  if (isSameDay(date, now)) return 'Today';
  if (isSameDay(date, addDays(now, 1))) return 'Tomorrow';
  return formatShortDate(date);
}

/** "75 min" or "1 h 15 min" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}
