import { Alert } from 'react-native';

import type { Booking } from '@/domain/models';

import { useBookings } from './useBookings';

/** Accept / decline with confirmation for the destructive path. */
export function useRequestActions() {
  const { respondToRequest } = useBookings();

  return {
    accept: (booking: Booking) => respondToRequest(booking.id, 'accept'),
    decline: (booking: Booking) =>
      Alert.alert(
        `Decline ${booking.customerName}'s request?`,
        'The customer will be told you can’t take this booking.',
        [
          { text: 'Keep request', style: 'cancel' },
          {
            text: 'Decline',
            style: 'destructive',
            onPress: () => respondToRequest(booking.id, 'decline'),
          },
        ],
      ),
  };
}
