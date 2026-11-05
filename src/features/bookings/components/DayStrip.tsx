import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, layout, radii, spacing } from '@/theme';
import { formatLongDate, formatWeekdayShort, isSameDay } from '@/utils/dateTime';

type DayStripProps = {
  days: readonly Date[];
  selected: Date;
  isAvailable: (day: Date) => boolean;
  onSelect: (day: Date) => void;
};

/** Horizontal calendar strip (Stitch design system: 48×64 day cards). */
export function DayStrip({ days, selected, isAvailable, onSelect }: DayStripProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroller}
    >
      {days.map((day) => {
        const active = isSameDay(day, selected);
        const available = isAvailable(day);
        return (
          <Pressable
            key={day.toDateString()}
            onPress={() => onSelect(day)}
            disabled={!available}
            accessibilityRole="button"
            accessibilityLabel={`${formatLongDate(day)}${available ? '' : ', fully booked'}`}
            accessibilityState={{ selected: active, disabled: !available }}
            style={[styles.day, active && styles.dayActive, !available && styles.dayDisabled]}
          >
            <AppText variant="labelMd" color={active ? 'onPrimary' : 'textMuted'}>
              {formatWeekdayShort(day)}
            </AppText>
            <AppText variant="titleMd" color={active ? 'onPrimary' : 'textPrimary'}>
              {day.getDate()}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Bleed to the screen edges so the strip scrolls under the margins.
  scroller: { marginHorizontal: -layout.screenPadding },
  row: { paddingHorizontal: layout.screenPadding, gap: spacing.sm },
  day: {
    width: 52,
    height: 68,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
  },
  dayActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayDisabled: { opacity: 0.35 },
});
