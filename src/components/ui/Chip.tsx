import { Pressable, StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { AppText } from './AppText';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

/** Pill used for filters and single-choice options. Selected = charcoal fill. */
export function Chip({ label, selected = false, onPress, accessibilityLabel }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      hitSlop={{ top: 6, bottom: 6 }}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed && !selected && styles.pressed,
      ]}
    >
      <AppText variant="labelLg" color={selected ? 'onPrimary' : 'textSecondary'}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.primary },
  unselected: { backgroundColor: colors.surfaceSubtle },
  pressed: { backgroundColor: colors.border },
});
