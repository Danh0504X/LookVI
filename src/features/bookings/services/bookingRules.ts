import { FREE_CANCELLATION_HOURS, type Booking, type BookingStatus } from '@/domain/models';

export type BookingGroup = 'pending' | 'upcoming' | 'history';

export const BOOKING_GROUPS: { value: BookingGroup; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'history', label: 'History' },
];

export const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  DECLINED: 'Declined',
  CANCELLED: 'Cancelled',
};

/**
 * Pending = waiting for the artist. Upcoming = confirmed (stays here until the artist marks
 * it completed). History = completed, declined or cancelled.
 */
export function getBookingGroup(booking: Booking): BookingGroup {
  if (booking.status === 'PENDING') return 'pending';
  if (booking.status === 'CONFIRMED') return 'upcoming';
  return 'history';
}

/** Soonest first for active bookings; most recent first for history. */
export function sortBookings(bookings: readonly Booking[], group: BookingGroup): Booking[] {
  const direction = group === 'history' ? -1 : 1;
  return [...bookings].sort((a, b) => direction * a.startsAt.localeCompare(b.startsAt));
}

export const isActive = (booking: Booking) =>
  booking.status === 'PENDING' || booking.status === 'CONFIRMED';

/** Last moment a booking can be cancelled for free. */
export function cancellationDeadline(booking: Booking): Date {
  return new Date(new Date(booking.startsAt).getTime() - FREE_CANCELLATION_HOURS * 3_600_000);
}

/** Confirmed rule: free cancellation by either side until 2 hours before the start. */
export function canCancel(booking: Booking, now: Date = new Date()): boolean {
  return isActive(booking) && now < cancellationDeadline(booking);
}

/** Active, but inside the 2-hour window: the cancel action is locked. */
export function isCancellationLocked(booking: Booking, now: Date = new Date()): boolean {
  return isActive(booking) && now >= cancellationDeadline(booking);
}

export function bookingEndsAt(booking: Pick<Booking, 'startsAt' | 'durationMinutes'>): Date {
  return new Date(new Date(booking.startsAt).getTime() + booking.durationMinutes * 60_000);
}
