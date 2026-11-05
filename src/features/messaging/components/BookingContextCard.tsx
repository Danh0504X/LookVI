import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import type { Booking } from '@/domain/models';
import { BookingStatusBadge, STATUS_LABELS } from '@/features/bookings';
import { colors, radii, spacing } from '@/theme';
import { formatShortDate, formatTime } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

type BookingContextCardProps = {
  booking: Booking;
  onPress: () => void;
};

/** The booking this conversation belongs to, pinned above the messages. */
export function BookingContextCard({ booking, onPress }: BookingContextCardProps) {
  const statusLabel = STATUS_LABELS[booking.status];
  const when = `${formatShortDate(booking.startsAt)} · ${formatTime(booking.startsAt)}`;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Booking ${booking.reference}, ${when}, ${statusLabel}. Opens booking details`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Icon name="calendar_today" size={20} color={colors.accent} />
      </View>
      <View style={styles.text}>
        <View style={styles.titleRow}>
          <AppText variant="labelLg">{when}</AppText>
          <BookingStatusBadge status={booking.status} />
        </View>
        <AppText variant="labelMd" color="textSecondary" numberOfLines={1}>
          {booking.variantName} · {formatPrice(booking.priceVnd)}
        </AppText>
      </View>
      <Icon name="chevron_right" size={22} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceMuted,
  },
  pressed: { opacity: 0.8 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: spacing.xxs },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
});
