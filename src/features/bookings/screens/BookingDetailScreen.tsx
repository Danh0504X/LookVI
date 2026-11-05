import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Button, SectionHeader } from '@/components/ui';
import { FREE_CANCELLATION_HOURS, type Artist, type Booking } from '@/domain/models';
import { getAreaById, getArtistById, getPostById } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';
import { formatDuration, formatLongDate, formatTime } from '@/utils/dateTime';
import { showDemoNotice } from '@/utils/demoNotice';

import { ArtistSummary } from '../components/ArtistSummary';
import { BookingProgress } from '../components/BookingProgress';
import { DetailRow } from '../components/DetailRow';
import { PriceSummary } from '../components/PriceSummary';
import { StatusBanner } from '../components/StatusBanner';
import { useBookings } from '../hooks/useBookings';
import { canCancel, isActive, isCancellationLocked } from '../services/bookingRules';

export function BookingDetailScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { getBooking } = useBookings();
  const booking = bookingId ? getBooking(bookingId) : undefined;
  const artist = booking ? getArtistById(booking.artistId) : undefined;

  if (!booking || !artist) {
    return (
      <PlaceholderScreen
        icon="event_busy"
        title="Booking not found"
        message="This booking is no longer available."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return <BookingDetail booking={booking} artist={artist} />;
}

function BookingDetail({ booking, artist }: { booking: Booking; artist: Artist }) {
  const router = useRouter();
  const { cancelBooking } = useBookings();
  const area = getAreaById(booking.address.areaId);
  const post = booking.postId ? getPostById(booking.postId) : undefined;
  const now = new Date();
  const cancellable = canCancel(booking, now);
  const locked = isCancellationLocked(booking, now);

  const confirmCancel = () =>
    Alert.alert(
      'Cancel this booking?',
      `${artist.name} will be notified. Cancelling is free until ${FREE_CANCELLATION_HOURS} hours before the appointment.`,
      [
        { text: 'Keep booking', style: 'cancel' },
        {
          text: 'Cancel booking',
          style: 'destructive',
          onPress: () => cancelBooking(booking.id, 'customer'),
        },
      ],
    );

  const footer = isActive(booking) ? (
    <View style={styles.actions}>
      <Button
        label="Message artist"
        variant="secondary"
        onPress={() => showDemoNotice('Chat with artists')}
      />
      {cancellable ? (
        <Button label="Cancel booking" variant="ghost" onPress={confirmCancel} />
      ) : null}
      {locked ? (
        <AppText variant="labelMd" color="textMuted" align="center" style={styles.lockedNote}>
          Free cancellation ended {FREE_CANCELLATION_HOURS} hours before the appointment.
        </AppText>
      ) : null}
    </View>
  ) : (
    <Button
      label="Book again"
      onPress={() =>
        router.push({
          pathname: '/book/[artistId]',
          params: { artistId: artist.id, variantId: booking.variantId, ...(booking.postId ? { postId: booking.postId } : {}) },
        })
      }
    />
  );

  return (
    <Screen
      header={
        <TopBar
          onBack={() => router.back()}
          center={<AppText variant="titleMd">Booking #{booking.reference}</AppText>}
        />
      }
      footer={footer}
    >
      <StatusBanner booking={booking} artist={artist} />

      <View style={styles.section}>
        <SectionHeader title="Progress" />
        <BookingProgress booking={booking} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Artist" />
        <ArtistSummary artist={artist} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Service" />
        <View style={styles.service}>
          {post?.images[0] ? (
            <Image source={post.images[0]} contentFit="cover" style={styles.serviceImage} />
          ) : null}
          <View style={styles.serviceText}>
            <AppText variant="titleMd">{booking.variantName}</AppText>
            {booking.lookName ? (
              <AppText variant="bodyMd" color="textSecondary">
                {booking.lookName}
              </AppText>
            ) : null}
            <AppText variant="labelMd" color="textMuted">
              {formatDuration(booking.durationMinutes)}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Schedule & address" />
        <View style={styles.rows}>
          <DetailRow
            icon="calendar_today"
            label="Date & time"
            value={formatLongDate(booking.startsAt)}
            secondary={`${formatTime(booking.startsAt)} · about ${formatDuration(booking.durationMinutes)}`}
          />
          <DetailRow
            icon="location_on"
            label="Address"
            value={`${booking.address.line1}${area ? `, ${area.name}, ${area.city}` : ''}`}
            secondary={booking.address.line2 || undefined}
          />
          {booking.notes ? <DetailRow icon="notes" label="Your notes" value={booking.notes} /> : null}
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <SectionHeader title="Price" />
        <PriceSummary
          serviceName={booking.variantName}
          priceVnd={booking.priceVnd}
          note="Price fixed when you sent the request. Pay after the service."
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.xxl },
  lastSection: { marginBottom: spacing.xl },
  service: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  serviceImage: { width: 56, height: 72, borderRadius: radii.lg, backgroundColor: colors.surfaceSubtle },
  serviceText: { flex: 1, gap: spacing.xxs },
  rows: { gap: spacing.lg },
  actions: { gap: spacing.xs },
  lockedNote: { marginTop: spacing.sm },
});
