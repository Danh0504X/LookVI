import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import type { Artist, Booking } from '@/domain/models';
import { getAreaById } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';
import { formatRelativeDay, formatTime } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { BookingStatusBadge } from './BookingStatusBadge';

type BookingCardProps = {
  booking: Booking;
  artist: Artist;
  onPress: () => void;
};

/** Booking summary in the Bookings tab. */
export function BookingCard({ booking, artist, onPress }: BookingCardProps) {
  const area = getAreaById(booking.address.areaId);
  const service = booking.lookName ? `${booking.variantName} · ${booking.lookName}` : booking.variantName;
  const when = `${formatRelativeDay(booking.startsAt)} · ${formatTime(booking.startsAt)}`;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Booking ${booking.reference} with ${artist.name}, ${service}, ${when}, ${booking.status.toLowerCase()}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <AppText variant="labelMd" color="textMuted">
          #{booking.reference}
        </AppText>
        <BookingStatusBadge status={booking.status} />
      </View>

      <View style={styles.body}>
        <Image source={artist.avatar} contentFit="cover" style={styles.avatar} />
        <View style={styles.bodyText}>
          <AppText variant="titleMd" numberOfLines={1}>
            {artist.name}
          </AppText>
          <AppText variant="bodyMd" color="textSecondary" numberOfLines={1}>
            {service}
          </AppText>
        </View>
        <AppText variant="priceLg">{formatPrice(booking.priceVnd)}</AppText>
      </View>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Icon name="calendar_today" size={18} color={colors.textSecondary} />
          <AppText variant="labelLg">{when}</AppText>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location_on" size={18} color={colors.textSecondary} />
          <AppText variant="bodyMd" color="textSecondary" numberOfLines={1} style={styles.flex}>
            {booking.address.line1}
            {area ? `, ${area.name}` : ''}
          </AppText>
        </View>
      </View>

      {booking.status === 'PENDING' ? (
        <View style={styles.footer}>
          <Icon name="hourglass_top" size={16} color={colors.accent} />
          <AppText variant="labelMd" color="textSecondary">
            Awaiting artist confirmation
          </AppText>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  body: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 52, height: 52, borderRadius: radii.lg, backgroundColor: colors.surfaceSubtle },
  bodyText: { flex: 1, minWidth: 0, gap: spacing.xxs },
  info: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.sm,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  flex: { flex: 1 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
