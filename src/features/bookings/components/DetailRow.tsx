import { StyleSheet, View } from 'react-native';

import { AppText, Icon, type IconName } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';

type DetailRowProps = {
  icon: IconName;
  label: string;
  value: string;
  secondary?: string;
};

/** Icon + label + value line used in booking summaries. */
export function DetailRow({ icon, label, value, secondary }: DetailRowProps) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}${secondary ? `, ${secondary}` : ''}`}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={20} color={colors.textSecondary} />
      </View>
      <View style={styles.text}>
        <AppText variant="labelMd" color="textMuted">
          {label}
        </AppText>
        <AppText variant="bodyLg">{value}</AppText>
        {secondary ? (
          <AppText variant="bodyMd" color="textSecondary">
            {secondary}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: spacing.xxs },
});
