import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Chip, Icon, PageHeading } from '@/components/ui';
import type { Booking } from '@/domain/models';
import { useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';

import { RequestCard } from '../components/RequestCard';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { useRequestActions } from '../hooks/useRequestActions';
import type { BookingGroup } from '../services/bookingRules';
import { approxDistanceKm } from '../services/distance';

const TABS: { value: BookingGroup; label: string }[] = [
  { value: 'pending', label: 'New' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'history', label: 'History' },
];

const EMPTY: Record<BookingGroup, string> = {
  pending: 'No new requests right now.',
  upcoming: 'No confirmed appointments yet.',
  history: 'Completed, declined and cancelled bookings appear here.',
};

/** Artist "Bookings" tab: incoming requests, upcoming appointments and history. */
export function ArtistRequestsScreen() {
  const router = useRouter();
  const { artistProfile } = useSession();
  const groups = useArtistBookings();
  const { accept, decline } = useRequestActions();
  const [tab, setTab] = useState<BookingGroup>(groups.pending.length > 0 ? 'pending' : 'upcoming');
  const bookings = groups[tab];

  const open = (booking: Booking) =>
    router.push({ pathname: '/request/[bookingId]', params: { bookingId: booking.id } });

  return (
    <Screen bottomInset={false}>
      <View style={styles.heading}>
        <PageHeading title="Bookings" />
      </View>

      <View style={styles.tabs}>
        {TABS.map((item) => (
          <Chip
            key={item.value}
            label={`${item.label} (${groups[item.value].length})`}
            selected={tab === item.value}
            onPress={() => setTab(item.value)}
          />
        ))}
      </View>

      {tab === 'pending' && bookings.length > 0 ? (
        <View style={styles.note}>
          <Icon name="info" size={18} color={colors.textSecondary} />
          <AppText variant="labelMd" color="textSecondary" style={styles.noteText}>
            Accepting confirms the appointment for the customer.
          </AppText>
        </View>
      ) : null}

      {bookings.length === 0 ? (
        <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.empty}>
          {EMPTY[tab]}
        </AppText>
      ) : (
        <View style={styles.list}>
          {bookings.map((booking) => (
            <RequestCard
              key={booking.id}
              booking={booking}
              distanceKm={approxDistanceKm(booking, artistProfile?.areaId)}
              onPress={() => open(booking)}
              onAccept={() => accept(booking)}
              onDecline={() => decline(booking)}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: spacing.lg },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
  },
  noteText: { flex: 1 },
  list: { marginTop: spacing.lg, gap: spacing.lg, paddingBottom: spacing.lg },
  empty: { marginTop: spacing.xxxl },
});
