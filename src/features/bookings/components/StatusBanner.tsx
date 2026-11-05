import { StyleSheet, View } from 'react-native';

import { AppText, Icon, type IconName } from '@/components/ui';
import type { Artist, Booking } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';
import { formatRelativeDay, formatTime } from '@/utils/dateTime';

type BannerCopy = { icon: IconName; title: string; message: string };

function getCopy(booking: Booking, artist: Artist): BannerCopy {
  const when = `${formatRelativeDay(booking.startsAt)} at ${formatTime(booking.startsAt)}`;
  switch (booking.status) {
    case 'PENDING':
      return {
        icon: 'hourglass_top',
        title: `Waiting for ${artist.name}`,
        message: 'Your request has been sent. This is not confirmed until the artist accepts.',
      };
    case 'CONFIRMED':
      return {
        icon: 'event_available',
        title: 'Booking confirmed',
        message: `${artist.name} will come to your address ${when}.`,
      };
    case 'COMPLETED':
      return { icon: 'task_alt', title: 'Completed', message: 'We hope you loved your look.' };
    case 'DECLINED':
      return {
        icon: 'event_busy',
        title: 'Request declined',
        message: `${artist.name} can't take this request. Try another time or artist.`,
      };
    case 'CANCELLED':
      return {
        icon: 'cancel',
        title: 'Booking cancelled',
        message:
          booking.cancelledBy === 'artist'
            ? `${artist.name} cancelled this booking.`
            : 'You cancelled this booking.',
      };
  }
}

/** Status summary at the top of the booking detail. */
export function StatusBanner({ booking, artist }: { booking: Booking; artist: Artist }) {
  const copy = getCopy(booking, artist);
  const closed = booking.status === 'DECLINED' || booking.status === 'CANCELLED';

  return (
    <View style={styles.banner} accessible accessibilityLabel={`${copy.title}. ${copy.message}`}>
      <View style={[styles.iconWrap, closed && styles.iconWrapClosed]}>
        <Icon
          name={copy.icon}
          size={22}
          color={closed ? colors.textSecondary : colors.accent}
        />
      </View>
      <View style={styles.text}>
        <AppText variant="titleMd">{copy.title}</AppText>
        <AppText variant="bodyMd" color="textSecondary">
          {copy.message}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceMuted,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapClosed: { backgroundColor: colors.surfaceSubtle },
  text: { flex: 1, gap: spacing.xs },
});
