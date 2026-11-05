import type { Booking } from '@/domain/models';
import { useSession } from '@/features/session';

import { getBookingGroup, sortBookings, type BookingGroup } from '../services/bookingRules';
import { useBookings } from './useBookings';

/** The signed-in customer's bookings, grouped into Pending / Upcoming / History. */
export function useCustomerBookings(): Record<BookingGroup, Booking[]> {
  const { account } = useSession();
  const { bookings } = useBookings();
  const mine = bookings.filter((booking) => booking.customerId === account?.id);

  const byGroup = (group: BookingGroup) =>
    sortBookings(
      mine.filter((booking) => getBookingGroup(booking) === group),
      group,
    );

  return { pending: byGroup('pending'), upcoming: byGroup('upcoming'), history: byGroup('history') };
}
