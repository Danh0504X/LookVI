import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Avatar, Button, Icon } from '@/components/ui';
import type { Booking } from '@/domain/models';
import { getAreaById } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';
import { formatDuration, formatRelativeDay, formatTime } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { BookingStatusBadge } from './BookingStatusBadge';

type RequestCardProps = {
  booking: Booking;
  /** Approximate distance from the artist's base, in km. */
  distanceKm: number | null;
  onPress: () => void;
  /** Shown for PENDING requests only. */
  onAccept?: () => void;
  onDecline?: () => void;
};

/** A booking as the artist sees it: customer, service, time, place, notes, actions. */
export function RequestCard({ booking, distanceKm, onPress, onAccept, onDecline }: RequestCardProps) {
  const area = getAreaById(booking.address.areaId);
  const service = booking.lookName ? `${booking.variantName} · ${booking.lookName}` : booking.variantName;
  const when = `${formatRelativeDay(booking.startsAt)} · ${formatTime(booking.startsAt)}`;
  const pending = booking.status === 'PENDING';

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${booking.customerName}, ${service}, ${when}. Opens details`}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <View style={styles.header}>
          <Avatar source={booking.customerAvatar} name={booking.customerName} size={48} />
          <View style={styles.headerText}>
            <AppText variant="titleMd" numberOfLines={1}>
              {booking.customerName}
            </AppText>
            <AppText variant="bodyMd" color="textSecondary" numberOfLines={1}>
              {service}
            </AppText>
          </View>
          <View style={styles.price}>
            <AppText variant="priceLg">{formatPrice(booking.priceVnd)}</AppText>
            <AppText variant="labelMd" color="textMuted">
              {formatDuration(booking.durationMinutes)}
            </AppText>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Icon name="calendar_today" size={18} color={colors.textSecondary} />
            <AppText variant="labelLg" style={styles.flex}>
              {when}
            </AppText>
            {!pending ? <BookingStatusBadge status={booking.status} /> : null}
          </View>
          <View style={styles.infoRow}>
            <Icon name="location_on" size={18} color={colors.textSecondary} />
            <AppText variant="bodyMd" color="textSecondary" numberOfLines={1} style={styles.flex}>
              {booking.address.line1}
              {area ? `, ${area.name}` : ''}
              {distanceKm !== null ? ` · ≈${distanceKm} km` : ''}
            </AppText>
          </View>
          {booking.notes ? (
            <View style={styles.infoRow}>
              <Icon name="notes" size={18} color={colors.textSecondary} />
              <AppText variant="bodyMd" color="textSecondary" numberOfLines={2} style={styles.flex}>
                “{booking.notes}”
              </AppText>
            </View>
          ) : null}
        </View>
      </Pressable>

      {pending && onAccept && onDecline ? (
        <View style={styles.actions}>
          <Button label="Decline" variant="secondary" onPress={onDecline} style={styles.flex} />
          <Button label="Accept" onPress={onAccept} style={styles.flex} />
        </View>
      ) : null}
    </View>
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
  main: { gap: spacing.md },
  pressed: { opacity: 0.7 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  headerText: { flex: 1, minWidth: 0, gap: spacing.xxs },
  price: { alignItems: 'flex-end', gap: spacing.xxs },
  info: { padding: spacing.md, borderRadius: radii.lg, backgroundColor: colors.surfaceMuted, gap: spacing.sm },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  flex: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.md },
});
