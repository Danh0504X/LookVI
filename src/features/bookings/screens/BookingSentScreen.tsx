import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen } from '@/components/layout';
import { AppText, Button, Icon } from '@/components/ui';
import { FREE_CANCELLATION_HOURS } from '@/domain/models';
import { getAreaById, getArtistById } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';
import { formatLongDate, formatTime } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { ArtistSummary } from '../components/ArtistSummary';
import { BookingStatusBadge } from '../components/BookingStatusBadge';
import { DetailRow } from '../components/DetailRow';
import { useBookings } from '../hooks/useBookings';

/** "Request sent" confirmation, shown once right after submitting the form. */
export function BookingSentScreen() {
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
        action={{ label: 'Back to Home', onPress: () => router.replace('/home') }}
      />
    );
  }

  const area = getAreaById(booking.address.areaId);
  const goHome = () => {
    if (router.canDismiss()) router.dismissAll();
    router.navigate('/home');
  };

  return (
    <Screen
      footer={
        <View style={styles.actions}>
          <Button
            label="View booking"
            trailingIcon="arrow_forward"
            onPress={() =>
              router.replace({ pathname: '/booking/[bookingId]', params: { bookingId: booking.id } })
            }
          />
          <Button label="Back to Home" variant="ghost" onPress={goHome} />
        </View>
      }
    >
      <View style={styles.hero}>
        <View style={styles.check}>
          <Icon name="check" size={32} color={colors.onPrimary} />
        </View>
        <AppText variant="displayMd" align="center" accessibilityRole="header">
          Request sent
        </AppText>
        <AppText variant="bodyLg" color="textSecondary" align="center" style={styles.subtitle}>
          {artist.name} has received your request and will respond soon.
        </AppText>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <AppText variant="labelSm" color="textMuted" uppercase>
              Reference
            </AppText>
            <AppText variant="titleMd">#{booking.reference}</AppText>
          </View>
          <BookingStatusBadge status={booking.status} />
        </View>
        <ArtistSummary artist={artist} />
        <View style={styles.details}>
          <DetailRow
            icon="brush"
            label="Service"
            value={booking.variantName}
            secondary={booking.lookName ?? undefined}
          />
          <DetailRow
            icon="calendar_today"
            label="Date & time"
            value={formatLongDate(booking.startsAt)}
            secondary={formatTime(booking.startsAt)}
          />
          <DetailRow
            icon="location_on"
            label="Address"
            value={`${booking.address.line1}${area ? `, ${area.name}` : ''}`}
            secondary={booking.address.line2 || undefined}
          />
        </View>
        <View style={styles.total}>
          <View>
            <AppText variant="labelSm" color="textMuted" uppercase>
              Estimated total
            </AppText>
            <AppText variant="labelMd" color="textSecondary">
              Pay after the service
            </AppText>
          </View>
          <AppText variant="priceLg">{formatPrice(booking.priceVnd)}</AppText>
        </View>
      </View>

      <View style={styles.note}>
        <Icon name="info" size={20} color={colors.textSecondary} />
        <AppText variant="bodyMd" color="textSecondary" style={styles.noteText}>
          Track the status in Bookings. Free cancellation up to {FREE_CANCELLATION_HOURS} hours
          before the appointment.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: spacing.xxl },
  check: {
    width: 72,
    height: 72,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
    borderWidth: 8,
    borderColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  subtitle: { marginTop: spacing.sm, maxWidth: 320 },
  card: {
    marginTop: spacing.xxl,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.lg,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  details: { gap: spacing.md },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  note: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.lg },
  noteText: { flex: 1 },
  actions: { gap: spacing.xs },
});
