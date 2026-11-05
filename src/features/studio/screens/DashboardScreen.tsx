import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Avatar, Button, SectionHeader, Wordmark } from '@/components/ui';
import type { Booking } from '@/domain/models';
import {
  approxDistanceKm,
  RequestCard,
  useArtistBookings,
  useRequestActions,
} from '@/features/bookings';
import { spacing } from '@/theme';
import { formatLongDate, formatRelativeDay, formatTime } from '@/utils/dateTime';
import { showDemoNotice } from '@/utils/demoNotice';

import { StatCard } from '../components/StatCard';
import { useArtistIdentity } from '../hooks/useArtistIdentity';

/** Artist home: requests waiting, upcoming work and today's schedule. */
export function DashboardScreen() {
  const router = useRouter();
  const identity = useArtistIdentity();
  const bookings = useArtistBookings();
  const { accept, decline } = useRequestActions();

  if (!identity) return null;
  const { profile } = identity;
  const firstName = profile.displayName.split(' ')[0] ?? profile.displayName;
  const nextUpcoming = bookings.upcoming[0];
  const newest = bookings.pending[0];

  const open = (booking: Booking) =>
    router.push({ pathname: '/request/[bookingId]', params: { bookingId: booking.id } });

  return (
    <Screen bottomInset={false}>
      <View style={styles.brand}>
        <Wordmark size="sm" />
        <AppText variant="labelSm" color="textMuted" uppercase>
          Artist
        </AppText>
      </View>

      <View style={styles.greeting}>
        <View style={styles.greetingText}>
          <AppText variant="labelSm" color="textMuted" uppercase>
            {formatLongDate(new Date())}
          </AppText>
          <AppText variant="displayMd" accessibilityRole="header">
            Hello, {firstName}
          </AppText>
        </View>
        <Avatar source={profile.avatar} name={profile.displayName} size={56} />
      </View>

      <View style={styles.stats}>
        <StatCard
          label="New requests"
          value={bookings.pending.length}
          caption={bookings.pending.length > 0 ? 'Awaiting your response' : 'All caught up'}
          icon="mark_email_unread"
          highlight={bookings.pending.length > 0}
          onPress={() => router.navigate('/requests')}
        />
        <StatCard
          label="Upcoming"
          value={bookings.upcoming.length}
          caption={
            nextUpcoming
              ? `Next ${formatRelativeDay(nextUpcoming.startsAt).toLowerCase()} ${formatTime(nextUpcoming.startsAt)}`
              : 'Nothing scheduled'
          }
          icon="event"
          onPress={() => router.navigate('/requests')}
        />
      </View>

      <View style={styles.quickActions}>
        <Button
          label="My services"
          variant="secondary"
          onPress={() => router.push('/services')}
          style={styles.flex}
        />
        <Button
          label="New post"
          variant="secondary"
          onPress={() => showDemoNotice('Publishing new looks')}
          style={styles.flex}
        />
      </View>

      {newest ? (
        <View style={styles.section}>
          <SectionHeader
            title="New request"
            editorial
            action={
              bookings.pending.length > 1
                ? { label: `View all (${bookings.pending.length})`, onPress: () => router.navigate('/requests') }
                : undefined
            }
          />
          <RequestCard
            booking={newest}
            distanceKm={approxDistanceKm(newest, profile.areaId)}
            onPress={() => open(newest)}
            onAccept={() => accept(newest)}
            onDecline={() => decline(newest)}
          />
        </View>
      ) : null}

      <View style={[styles.section, styles.lastSection]}>
        <SectionHeader title="Today's schedule" editorial />
        {bookings.today.length === 0 ? (
          <AppText variant="bodyMd" color="textSecondary">
            Nothing scheduled today.
          </AppText>
        ) : (
          <View style={styles.list}>
            {bookings.today.map((booking) => (
              <RequestCard
                key={booking.id}
                booking={booking}
                distanceKm={approxDistanceKm(booking, profile.areaId)}
                onPress={() => open(booking)}
              />
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingTop: spacing.md },
  greeting: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl, gap: spacing.lg },
  greetingText: { flex: 1, gap: spacing.xs },
  stats: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  quickActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  flex: { flex: 1 },
  section: { marginTop: spacing.xxl },
  lastSection: { marginBottom: spacing.xl },
  list: { gap: spacing.lg },
});
