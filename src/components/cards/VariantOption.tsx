import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { colors, radii, spacing } from '@/theme';

type VariantOptionProps = {
  name: string;
  /** e.g. "60 min · Glass skin, defined eyes and lashes" */
  details: string;
  /** e.g. "550.000₫" */
  price: string;
  selected: boolean;
  onPress: () => void;
};

/** Selectable service package. Selected = charcoal outline + filled radio (no colour fill). */
export function VariantOption({ name, details, price, selected, onPress }: VariantOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${name}, ${price}, ${details}`}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && !selected && styles.pressed,
      ]}
    >
      <View style={styles.text}>
        <AppText variant="titleMd">{name}</AppText>
        <AppText variant="bodyMd" color="textSecondary" style={styles.details}>
          {details}
        </AppText>
      </View>
      <View style={styles.trailing}>
        <AppText variant="priceLg">{price}</AppText>
        <Icon
          name={selected ? 'radio_button_checked' : 'radio_button_unchecked'}
          filled={selected}
          size={22}
          color={selected ? colors.primary : colors.borderStrong}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: { borderColor: colors.primary, borderWidth: 1.5 },
  pressed: { backgroundColor: colors.surfaceMuted },
  text: { flex: 1 },
  details: { marginTop: spacing.xs },
  trailing: { alignItems: 'flex-end', justifyContent: 'space-between', gap: spacing.sm },
});
