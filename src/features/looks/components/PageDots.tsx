import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

type PageDotsProps = { count: number; index: number };

/** Carousel position indicator on top of photos. */
export function PageDots({ count, index }: PageDotsProps) {
  if (count < 2) return null;
  return (
    <View
      style={styles.pill}
      accessible
      accessibilityLabel={`Photo ${index + 1} of ${count}`}
    >
      {Array.from({ length: count }, (_, dot) => (
        <View key={dot} style={[styles.dot, dot === index && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    height: 28,
    borderRadius: radii.full,
    backgroundColor: colors.overlayFill,
  },
  dot: { width: 6, height: 6, borderRadius: radii.full, backgroundColor: colors.overlayBorder },
  active: { width: 18, backgroundColor: colors.onPrimary },
});
