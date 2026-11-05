import { StyleSheet, View } from 'react-native';

import { AppText, Icon, type IconName } from '@/components/ui';
import type { Booking, MessageSender } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';
import { formatRelativeDay, formatTime } from '@/utils/dateTime';

type BannerCopy = { icon: IconName; title: string; message: string };

type StatusBannerProps = {
  booking: Booking;
  /** Who is looking at the booking. */
  viewer: MessageSender;
  /** The other side's name (artist for customers, customer for artists). */
  counterpartName: string;
};

function getCopy({ booking, viewer, counterpartName: other }: StatusBannerProps): BannerCopy {
  const when = `${formatRelativeDay(booking.startsAt)} at ${formatTime(booking.startsAt)}`;
  const artistView = viewer === 'artist';
  switch (booking.status) {
    case 'PENDING':
      return artistView
        ? {
            icon: 'mark_email_unread',
            title: 'New request',
            message: 'Accept to confirm the appointment, or decline if you can’t make it.',
          }
        : {
            icon: 'hourglass_top',
            title: `Waiting for ${other}`,
            message: 'Your request has been sent. This is not confirmed until the artist accepts.',
          };
    case 'CONFIRMED':
      return {
        icon: 'event_available',
        title: 'Booking confirmed',
        message: artistView
          ? `${other} expects you ${when}.`
          : `${other} will come to your address ${when}.`,
      };
    case 'COMPLETED':
      return {
        icon: 'task_alt',
        title: 'Completed',
        message: artistView ? 'Marked as done. Nice work!' : 'We hope you loved your look.',
      };
    case 'DECLINED':
      return artistView
        ? { icon: 'event_busy', title: 'Request declined', message: 'You declined this request.' }
        : {
            icon: 'event_busy',
            title: 'Request declined',
            message: `${other} can't take this request. Try another time or artist.`,
          };
    case 'CANCELLED': {
      const byMe = booking.cancelledBy === viewer;
      return {
        icon: 'cancel',
        title: 'Booking cancelled',
        message: byMe ? 'You cancelled this booking.' : `${other} cancelled this booking.`,
      };
    }
  }
}

/** Status summary at the top of a booking detail (customer or artist view). */
export function StatusBanner(props: StatusBannerProps) {
  const copy = getCopy(props);
  const closed = props.booking.status === 'DECLINED' || props.booking.status === 'CANCELLED';

  return (
    <View style={styles.banner} accessible accessibilityLabel={`${copy.title}. ${copy.message}`}>
      <View style={[styles.iconWrap, closed && styles.iconWrapClosed]}>
        <Icon name={copy.icon} size={22} color={closed ? colors.textSecondary : colors.accent} />
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
