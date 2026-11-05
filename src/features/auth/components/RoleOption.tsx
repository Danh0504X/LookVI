import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, type IconName } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';

type RoleOptionProps = {
  icon: IconName;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

/** Selectable card for the role choice. Selected = charcoal outline + filled check. */
export function RoleOption({ icon, title, description, selected, onPress }: RoleOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${title}. ${description}`}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && !selected && styles.cardPressed,
      ]}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={24} color={colors.textPrimary} />
      </View>
      <View style={styles.text}>
        <AppText variant="titleMd">{title}</AppText>
        <AppText variant="bodyMd" color="textSecondary" style={styles.description}>
          {description}
        </AppText>
      </View>
      <Icon
        name={selected ? 'check_circle' : 'radio_button_unchecked'}
        filled={selected}
        size={24}
        color={selected ? colors.primary : colors.borderStrong}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: { borderColor: colors.primary, borderWidth: 1.5 },
  cardPressed: { backgroundColor: colors.surfaceMuted },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  description: { marginTop: spacing.xxs },
});
