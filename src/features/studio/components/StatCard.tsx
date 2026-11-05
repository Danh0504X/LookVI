import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, type IconName } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';

type StatCardProps = {
  label: string;
  value: number;
  caption: string;
  icon: IconName;
  highlight?: boolean;
  onPress: () => void;
};

/** Compact number tile on the artist dashboard. */
export function StatCard({ label, value, caption, icon, highlight = false, onPress }: StatCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${value} ${label}, ${caption}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <AppText variant="labelMd" color="textSecondary">
          {label}
        </AppText>
        <Icon name={icon} size={18} color={highlight ? colors.accent : colors.textMuted} />
      </View>
      <AppText variant="displayMd">{value}</AppText>
      <AppText variant="labelMd" color="textMuted" numberOfLines={1}>
        {caption}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
