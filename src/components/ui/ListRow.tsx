import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type ListRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  /** Right-side content before the chevron (badge, count). */
  trailing?: ReactNode;
  onPress: () => void;
  /** Red title and icon, no chevron (e.g. Log out). */
  destructive?: boolean;
  showDivider?: boolean;
};

/** Settings-style navigation row. */
export function ListRow({
  icon,
  title,
  subtitle,
  trailing,
  onPress,
  destructive = false,
  showDivider = true,
}: ListRowProps) {
  const tint = destructive ? colors.error : colors.textSecondary;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      style={({ pressed }) => [styles.row, showDivider && styles.divider, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={20} color={tint} />
      </View>
      <View style={styles.text}>
        <AppText variant="labelLg" color={destructive ? 'error' : 'textPrimary'}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="labelMd" color="textMuted" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing}
      {!destructive ? <Icon name="chevron_right" size={22} color={colors.borderStrong} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: layout.minTouchTarget + spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  pressed: { opacity: 0.6 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, minWidth: 0, gap: spacing.xxs },
});
