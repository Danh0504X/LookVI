import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Linking, StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Avatar, Button, IconButton, SectionHeader } from '@/components/ui';
import { FREE_CANCELLATION_HOURS, type Booking } from '@/domain/models';
import { getAreaById, getPostById } from '@/features/catalog';
import { useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';
import { formatDuration, formatLongDate, formatTime } from '@/utils/dateTime';

import { BookingProgress } from '../components/BookingProgress';
import { DetailRow } from '../components/DetailRow';
import { PriceSummary } from '../components/PriceSummary';
import { StatusBanner } from '../components/StatusBanner';
import { useBookings } from '../hooks/useBookings';
import { useRequestActions } from '../hooks/useRequestActions';
import { canCancel, canComplete, isCancellationLocked } from '../services/bookingRules';
import { approxDistanceKm } from '../services/distance';

export function ArtistBookingDetailScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { getBooking } = useBookings();
  const { artistProfile } = useSession();
  const booking = bookingId ? getBooking(bookingId) : undefined;

  if (!booking || booking.artistId !== artistProfile?.artistId) {
    return (
      <PlaceholderScreen
        icon="event_busy"
        title="Booking not found"
        message="This booking is no longer available."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return <ArtistBookingDetail booking={booking} artistAreaId={artistProfile.areaId} />;
}

function ArtistBookingDetail({ booking, artistAreaId }: { booking: Booking; artistAreaId: string }) {
  const router = useRouter();
  const { cancelBooking, completeBooking } = useBookings();
  const { accept, decline } = useRequestActions();
  const area = getAreaById(booking.address.areaId);
  const post = booking.postId ? getPostById(booking.postId) : undefined;
  const distance = approxDistanceKm(booking, artistAreaId);
  const now = new Date();
  const fullAddress = [booking.address.line1, area?.name, area?.city].filter(Boolean).join(', ');

  const openChat = () =>
    router.push({ pathname: '/chat/[bookingId]', params: { bookingId: booking.id } });

  const openMaps = () =>
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    );

  const confirmComplete = () =>
    Alert.alert('Mark as completed?', `Confirm you finished ${booking.customerName}'s appointment.`, [
      { text: 'Not yet', style: 'cancel' },
      { text: 'Mark completed', onPress: () => completeBooking(booking.id) },
    ]);

  const confirmCancel = () =>
    Alert.alert(
      'Cancel this booking?',
      `${booking.customerName} will be notified. Cancelling is free until ${FREE_CANCELLATION_HOURS} hours before the appointment.`,
      [
        { text: 'Keep booking', style: 'cancel' },
        { text: 'Cancel booking', style: 'destructive', onPress: () => cancelBooking(booking.id, 'artist') },
      ],
    );

  let footer = null;
  if (booking.status === 'PENDING') {
    footer = (
      <View style={styles.row}>
        <Button label="Decline" variant="secondary" onPress={() => decline(booking)} style={styles.flex} />
        <Button label="Accept" onPress={() => accept(booking)} style={styles.flex} />
      </View>
    );
  } else if (booking.status === 'CONFIRMED') {
    const completable = canComplete(booking, now);
    footer = (
      <View style={styles.actions}>
        <Button label="Mark as completed" trailingIcon="check" onPress={confirmComplete} disabled={!completable} />
        {!completable ? (
          <AppText variant="labelMd" color="textMuted" align="center">
            Available once the appointment starts at {formatTime(booking.startsAt)}.
          </AppText>
        ) : null}
        {canCancel(booking, now) ? (
          <Button label="Cancel booking" variant="ghost" onPress={confirmCancel} />
        ) : null}
        {isCancellationLocked(booking, now) && !completable ? (
          <AppText variant="labelMd" color="textMuted" align="center">
            Free cancellation ended {FREE_CANCELLATION_HOURS} hours before the appointment.
          </AppText>
        ) : null}
      </View>
    );
  }

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
      <StatusBanner booking={booking} viewer="artist" counterpartName={booking.customerName} />

      <View style={styles.section}>
        <SectionHeader title="Customer" />
        <View style={styles.customer}>
          <Avatar source={booking.customerAvatar} name={booking.customerName} size={52} />
          <AppText variant="titleMd" style={styles.flex}>
            {booking.customerName}
          </AppText>
          <IconButton
            icon="chat_bubble"
            variant="surface"
            accessibilityLabel={`Message ${booking.customerName}`}
            onPress={openChat}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Progress" />
        <BookingProgress booking={booking} viewer="artist" />
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
            label={distance !== null ? `Address · ≈${distance} km from your base` : 'Address'}
            value={fullAddress}
            secondary={booking.address.line2 || undefined}
          />
          <Button label="Open in Maps" variant="secondary" trailingIcon="near_me" onPress={openMaps} />
        </View>
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
                Look reference: {booking.lookName}
              </AppText>
            ) : null}
            <AppText variant="labelMd" color="textMuted">
              {formatDuration(booking.durationMinutes)}
            </AppText>
          </View>
        </View>
        {booking.notes ? (
          <View style={styles.notes}>
            <AppText variant="labelSm" color="accent" uppercase>
              Note from {booking.customerName}
            </AppText>
            <AppText variant="bodyMd" color="textSecondary">
              “{booking.notes}”
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <SectionHeader title="Price" />
        <PriceSummary
          serviceName={booking.variantName}
          priceVnd={booking.priceVnd}
          note="Fixed when the request was sent. The customer pays after the service."
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.xxl },
  lastSection: { marginBottom: spacing.xl },
  customer: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  row: { flexDirection: 'row', gap: spacing.md },
  actions: { gap: spacing.sm },
  rows: { gap: spacing.lg },
  service: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  serviceImage: { width: 56, height: 72, borderRadius: radii.lg, backgroundColor: colors.surfaceSubtle },
  serviceText: { flex: 1, gap: spacing.xxs },
  notes: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.xs,
  },
});
