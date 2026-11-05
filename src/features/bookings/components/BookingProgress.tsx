import { StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import type { Booking } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';
import { formatShortDate, formatTime } from '@/utils/dateTime';

type Step = { label: string; time: string | null; done: boolean; current: boolean; closed?: boolean };

const stamp = (iso: string | null) => (iso ? `${formatShortDate(iso)} · ${formatTime(iso)}` : null);

/** Shortened progress (confirmed): Requested → Confirmed → Completed, or the closing step. */
function getSteps(booking: Booking): Step[] {
  const requested: Step = { label: 'Request sent', time: stamp(booking.requestedAt), done: true, current: false };

  if (booking.status === 'DECLINED' || booking.status === 'CANCELLED') {
    const confirmed: Step[] = booking.confirmedAt
      ? [{ label: 'Confirmed', time: stamp(booking.confirmedAt), done: true, current: false }]
      : [];
    const label =
      booking.status === 'DECLINED'
        ? 'Declined by artist'
        : booking.cancelledBy === 'artist'
          ? 'Cancelled by artist'
          : 'Cancelled by you';
    return [requested, ...confirmed, { label, time: stamp(booking.closedAt), done: true, current: true, closed: true }];
  }

  return [
    requested,
    {
      label: 'Confirmed by artist',
      time: stamp(booking.confirmedAt),
      done: booking.status !== 'PENDING',
      current: booking.status === 'PENDING',
    },
    {
      label: 'Completed',
      time: stamp(booking.completedAt),
      done: booking.status === 'COMPLETED',
      current: booking.status === 'CONFIRMED',
    },
  ];
}

export function BookingProgress({ booking }: { booking: Booking }) {
  const steps = getSteps(booking);

  return (
    <View accessibilityRole="list">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <View key={step.label} style={styles.step} accessible accessibilityLabel={`${step.label}${step.done ? ', done' : step.current ? ', in progress' : ''}`}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.marker,
                  step.done && !step.closed && styles.markerDone,
                  step.closed && styles.markerClosed,
                  step.current && !step.done && styles.markerCurrent,
                ]}
              >
                {step.done ? (
                  <Icon
                    name={step.closed ? 'close' : 'check'}
                    size={14}
                    color={step.closed ? colors.textSecondary : colors.onPrimary}
                  />
                ) : null}
              </View>
              {!last ? <View style={[styles.line, step.done && styles.lineDone]} /> : null}
            </View>
            <View style={[styles.text, !last && styles.textSpacing]}>
              <AppText variant="labelLg" color={step.done || step.current ? 'textPrimary' : 'textMuted'}>
                {step.label}
              </AppText>
              {step.time ? (
                <AppText variant="labelMd" color="textMuted">
                  {step.time}
                </AppText>
              ) : step.current ? (
                <AppText variant="labelMd" color="accent">
                  In progress
                </AppText>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const MARKER = 22;

const styles = StyleSheet.create({
  step: { flexDirection: 'row', gap: spacing.md },
  rail: { alignItems: 'center', width: MARKER },
  marker: {
    width: MARKER,
    height: MARKER,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  markerClosed: { backgroundColor: colors.surfaceSubtle, borderColor: colors.surfaceSubtle },
  markerCurrent: { borderColor: colors.accent, borderWidth: 2 },
  line: { flex: 1, width: 1.5, backgroundColor: colors.border, marginVertical: spacing.xxs },
  lineDone: { backgroundColor: colors.primary },
  text: { flex: 1, gap: spacing.xxs },
  textSpacing: { paddingBottom: spacing.lg },
});
