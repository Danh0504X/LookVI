import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { AppText } from './AppText';

export type BadgeTone = 'accent' | 'dark' | 'neutral' | 'muted';

type BadgeProps = { label: string; tone?: BadgeTone };

const TONES: Record<BadgeTone, { backgroundColor: string; color: string; dot: string | null }> = {
  /** Waiting / needs attention. */
  accent: { backgroundColor: colors.accentSoft, color: colors.textPrimary, dot: colors.accent },
  /** Confirmed / positive. */
  dark: { backgroundColor: colors.primary, color: colors.onPrimary, dot: null },
  neutral: { backgroundColor: colors.surfaceSubtle, color: colors.textSecondary, dot: null },
  /** Closed states (declined, cancelled). */
  muted: { backgroundColor: colors.surfaceMuted, color: colors.textMuted, dot: null },
};

/** Small status pill. */
export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const style = TONES[tone];
  return (
    <View style={[styles.pill, { backgroundColor: style.backgroundColor }]}>
      {style.dot ? <View style={[styles.dot, { backgroundColor: style.dot }]} /> : null}
      <AppText variant="labelMd" style={{ color: style.color }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + spacing.xxs,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  dot: { width: 6, height: 6, borderRadius: radii.full },
});
