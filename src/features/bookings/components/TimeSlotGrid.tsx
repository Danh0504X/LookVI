import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, layout, radii, spacing } from '@/theme';
import { formatTime } from '@/utils/dateTime';

type TimeSlotGridProps = {
  slots: readonly Date[];
  selected: Date | null;
  onSelect: (slot: Date) => void;
};

/** Arrival time options for the selected day. */
export function TimeSlotGrid({ slots, selected, onSelect }: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <AppText variant="bodyMd" color="textSecondary">
        No times left on this day. Try another date.
      </AppText>
    );
  }

  return (
    <View style={styles.grid} accessibilityRole="radiogroup">
      {slots.map((slot) => {
        const active = selected?.getTime() === slot.getTime();
        const label = formatTime(slot);
        return (
          <Pressable
            key={slot.getTime()}
            onPress={() => onSelect(slot)}
            accessibilityRole="radio"
            accessibilityLabel={label}
            accessibilityState={{ checked: active }}
            style={({ pressed }) => [
              styles.slot,
              active && styles.slotActive,
              pressed && !active && styles.slotPressed,
            ]}
          >
            <AppText variant="labelLg" color={active ? 'onPrimary' : 'textPrimary'}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slot: {
    width: '31.5%',
    minHeight: layout.minTouchTarget,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotPressed: { backgroundColor: colors.surfaceMuted },
});
