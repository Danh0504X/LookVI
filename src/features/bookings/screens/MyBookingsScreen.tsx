import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Button, Chip, PageHeading } from '@/components/ui';
import { getArtistById } from '@/features/catalog';
import { spacing } from '@/theme';

import { BookingCard } from '../components/BookingCard';
import { useCustomerBookings } from '../hooks/useCustomerBookings';
import { BOOKING_GROUPS, type BookingGroup } from '../services/bookingRules';

const EMPTY_COPY: Record<BookingGroup, { title: string; message: string }> = {
  pending: {
    title: 'No pending requests',
    message: 'Requests you send to artists wait here until they respond.',
  },
  upcoming: {
    title: 'No upcoming appointments',
    message: 'Confirmed bookings appear here.',
  },
  history: {
    title: 'No past bookings',
    message: 'Completed, declined and cancelled bookings appear here.',
  },
};

export function MyBookingsScreen() {
  const router = useRouter();
  const groups = useCustomerBookings();
  // Open on the most relevant group.
  const [group, setGroup] = useState<BookingGroup>(
    groups.pending.length > 0 ? 'pending' : 'upcoming',
  );
  const bookings = groups[group];

  return (
    <Screen bottomInset={false}>
      <View style={styles.heading}>
        <PageHeading title="Bookings" />
      </View>

      <View style={styles.tabs}>
        {BOOKING_GROUPS.map((item) => (
          <Chip
            key={item.value}
            label={`${item.label} (${groups[item.value].length})`}
            selected={group === item.value}
            onPress={() => setGroup(item.value)}
          />
        ))}
      </View>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <AppText variant="titleMd" align="center">
            {EMPTY_COPY[group].title}
          </AppText>
          <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.emptyText}>
            {EMPTY_COPY[group].message}
          </AppText>
          {group !== 'history' ? (
            <Button
              label="Explore looks"
              variant="secondary"
              onPress={() => router.navigate('/explore')}
              style={styles.emptyAction}
            />
          ) : null}
        </View>
      ) : (
        <View style={styles.list}>
          {bookings.map((booking) => {
            const artist = getArtistById(booking.artistId);
            if (!artist) return null;
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                artist={artist}
                onPress={() =>
                  router.push({ pathname: '/booking/[bookingId]', params: { bookingId: booking.id } })
                }
              />
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: spacing.lg },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  list: { marginTop: spacing.xl, gap: spacing.lg },
  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyText: { marginTop: spacing.sm, maxWidth: 300 },
  emptyAction: { marginTop: spacing.xl, alignSelf: 'stretch' },
});
