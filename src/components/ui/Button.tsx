import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** Icon shown after the label (e.g. `arrow_forward`). */
  trailingIcon?: IconName;
  /** Custom element before the label (e.g. a brand logo). */
  leading?: ReactNode;
  disabled?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Pill button. One `primary` per screen; `secondary` for alternative actions; `ghost` for
 * low-emphasis text actions such as "Skip for now".
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  trailingIcon,
  leading,
  disabled = false,
  accessibilityHint,
  style,
}: ButtonProps) {
  const contentColor = variant === 'primary' ? colors.onPrimary : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'primary' && pressed && styles.primaryPressed,
        variant === 'secondary' && styles.secondary,
        variant === 'secondary' && pressed && styles.secondaryPressed,
        variant === 'ghost' && styles.ghost,
        variant === 'ghost' && pressed && styles.ghostPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <AppText variant="labelLg" style={[styles.label, { color: contentColor }]}>
        {label}
      </AppText>
      {trailingIcon ? (
        <Icon name={trailingIcon} size={20} color={contentColor} style={styles.trailing} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.controlHeight,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  primaryPressed: { backgroundColor: colors.primaryPressed },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
  },
  secondaryPressed: { backgroundColor: colors.surfaceMuted },
  ghost: { minHeight: layout.minTouchTarget, backgroundColor: 'transparent' },
  ghostPressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
  label: { fontSize: 16, lineHeight: 20 },
  leading: { marginRight: spacing.md },
  trailing: { marginLeft: spacing.sm },
});
