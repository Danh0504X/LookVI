import type { Booking } from '@/domain/models';
import { addDays, startOfDay } from '@/utils/dateTime';

import { bookingEndsAt, isActive } from './bookingRules';

/** Demo availability rules (real calendars come with a backend). */
const SLOT_TIMES = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:15', '18:30', '19:45'];
export const BOOKABLE_DAYS = 14;
/** Requests must start at least this many hours from now. */
export const MIN_LEAD_HOURS = 2;

export function getBookableDays(now: Date = new Date()): Date[] {
  const today = startOfDay(now);
  return Array.from({ length: BOOKABLE_DAYS }, (_, index) => addDays(today, index));
}

/** Small deterministic hash so each artist/day has a stable set of unavailable slots. */
function hash(text: string): number {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(value);
}

type SlotQuery = {
  artistId: string;
  day: Date;
  durationMinutes: number;
  bookings: readonly Booking[];
  now?: Date;
};

/**
 * Start times an artist can take on a day: not too soon, not blocked in the artist's demo
 * calendar, and not overlapping the artist's pending or confirmed bookings.
 */
export function getAvailableSlots({
  artistId,
  day,
  durationMinutes,
  bookings,
  now = new Date(),
}: SlotQuery): Date[] {
  const earliest = now.getTime() + MIN_LEAD_HOURS * 3_600_000;
  const taken = bookings.filter((booking) => booking.artistId === artistId && isActive(booking));
  const dayKey = day.toDateString();

  return SLOT_TIMES.flatMap((slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const start = new Date(day);
    start.setHours(hours ?? 0, minutes ?? 0, 0, 0);
    const end = new Date(start.getTime() + durationMinutes * 60_000);

    if (start.getTime() < earliest) return [];
    if (hash(`${artistId}|${dayKey}|${slot}`) % 4 === 0) return [];
    const overlaps = taken.some(
      (booking) => start < bookingEndsAt(booking) && new Date(booking.startsAt) < end,
    );
    return overlaps ? [] : [start];
  });
}
