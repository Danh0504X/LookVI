import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { colors, layout, radii, spacing } from '@/theme';

type TopBarProps = {
  onBack?: () => void;
  /** Centered content (wordmark or title). */
  center?: ReactNode;
  /** Right-side content. */
  right?: ReactNode;
};

/** Minimal top bar: optional back button, centered content, optional right slot. */
export function TopBar({ onBack, center, right }: TopBarProps) {
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Icon name="arrow_back" size={24} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.center}>{center}</View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    paddingHorizontal: layout.screenPadding - spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: { width: layout.minTouchTarget },
  right: { alignItems: 'flex-end' },
  center: { flex: 1, alignItems: 'center' },
  backButton: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.surfaceSubtle },
});
