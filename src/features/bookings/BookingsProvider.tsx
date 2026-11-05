import { createContext, useMemo, useState, type ReactNode } from 'react';

import { createMockBookings } from '@/data/mock';
import type { Booking, BookingRequest, CancelledBy } from '@/domain/models';

export type BookingsContextValue = {
  bookings: readonly Booking[];
  getBooking: (id: string) => Booking | undefined;
  /** Creates a PENDING booking and returns it (ids and timestamps assigned here). */
  requestBooking: (request: BookingRequest) => Booking;
  cancelBooking: (id: string, by: CancelledBy) => void;
};

export const BookingsContext = createContext<BookingsContextValue | null>(null);

function nextReference(bookings: readonly Booking[]): string {
  const numbers = bookings.map((booking) => Number(booking.reference.replace(/\D/g, '')) || 0);
  return `LV${Math.max(1000, ...numbers) + 1}`;
}

/**
 * In-memory bookings shared by both roles. Mounted at the app root (outside the session) so
 * a request sent as a customer is still there after switching to the artist role.
 */
export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<readonly Booking[]>(() => createMockBookings(new Date()));

  const value = useMemo<BookingsContextValue>(
    () => ({
      bookings,
      getBooking: (id) => bookings.find((booking) => booking.id === id),
      requestBooking: (request) => {
        const reference = nextReference(bookings);
        const booking: Booking = {
          ...request,
          id: `booking-${reference.toLowerCase()}`,
          reference,
          status: 'PENDING',
          cancelledBy: null,
          requestedAt: new Date().toISOString(),
          confirmedAt: null,
          completedAt: null,
          closedAt: null,
        };
        setBookings((current) => [booking, ...current]);
        return booking;
      },
      cancelBooking: (id, by) =>
        setBookings((current) =>
          current.map((booking) =>
            booking.id === id &&
            (booking.status === 'PENDING' || booking.status === 'CONFIRMED')
              ? { ...booking, status: 'CANCELLED', cancelledBy: by, closedAt: new Date().toISOString() }
              : booking,
          ),
        ),
    }),
    [bookings],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}
