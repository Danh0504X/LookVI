import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';

type NextAppointmentCardProps = {
  when: string;
  description: string;
  onPress: () => void;
};

/** Shortcut to the soonest confirmed booking. */
export function NextAppointmentCard({ when, description, onPress }: NextAppointmentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Next appointment ${when}, ${description}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Icon name="event_available" size={22} color={colors.accent} />
      </View>
      <View style={styles.text}>
        <AppText variant="labelMd" color="textMuted">
          Next appointment · {when}
        </AppText>
        <AppText variant="labelLg" numberOfLines={1}>
          {description}
        </AppText>
      </View>
      <Icon name="arrow_forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, minWidth: 0, gap: spacing.xxs },
});
