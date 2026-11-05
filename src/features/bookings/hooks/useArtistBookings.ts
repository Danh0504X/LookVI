import type { Booking } from '@/domain/models';
import { useSession } from '@/features/session';
import { isSameDay } from '@/utils/dateTime';

import { getBookingGroup, sortBookings, type BookingGroup } from '../services/bookingRules';
import { useBookings } from './useBookings';

export type ArtistBookings = Record<BookingGroup, Booking[]> & {
  /** Confirmed appointments today, soonest first. */
  today: Booking[];
};

/** The signed-in artist's bookings: new requests, upcoming, history and today's schedule. */
export function useArtistBookings(): ArtistBookings {
  const { artistProfile } = useSession();
  const { bookings } = useBookings();
  const mine = bookings.filter((booking) => booking.artistId === artistProfile?.artistId);
  const byGroup = (group: BookingGroup) =>
    sortBookings(
      mine.filter((booking) => getBookingGroup(booking) === group),
      group,
    );
  const upcoming = byGroup('upcoming');
  const now = new Date();

  return {
    pending: byGroup('pending'),
    upcoming,
    history: byGroup('history'),
    today: upcoming.filter((booking) => isSameDay(new Date(booking.startsAt), now)),
  };
}
