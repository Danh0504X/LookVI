import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, layout, radii, spacing, typography } from '@/theme';

import { AppText } from './AppText';
import { FieldLabel } from './FieldLabel';
import { Icon, type IconName } from './Icon';

type TextFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  label: string;
  helper?: string;
  /** Validation message; replaces the helper and highlights the field. */
  error?: string | null;
  trailingIcon?: IconName;
  /** Shows "count/max" next to the label when `maxLength` is set. */
  showCounter?: boolean;
};

export function TextField({
  label,
  helper,
  error,
  trailingIcon,
  showCounter = false,
  multiline,
  maxLength,
  value,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const counter =
    showCounter && maxLength !== undefined ? `${value?.length ?? 0}/${maxLength}` : undefined;

  return (
    <View>
      <FieldLabel label={label} aside={counter} />
      <View
        style={[
          styles.box,
          multiline && styles.boxMultiline,
          focused && styles.boxFocused,
          error ? styles.boxError : null,
        ]}
      >
        <TextInput
          {...inputProps}
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          accessibilityLabel={label}
          accessibilityHint={error ?? helper}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[styles.input, multiline && styles.inputMultiline]}
        />
        {trailingIcon ? <Icon name={trailingIcon} size={22} color={colors.textMuted} /> : null}
      </View>
      {error || helper ? (
        <AppText variant="labelMd" color={error ? 'error' : 'textMuted'} style={styles.helper}>
          {error ?? helper}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: layout.controlHeight,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  boxMultiline: { alignItems: 'flex-start', paddingVertical: spacing.md },
  boxFocused: { borderColor: colors.primary },
  boxError: { borderColor: colors.error },
  input: {
    ...typography.bodyLg,
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: spacing.md,
  },
  inputMultiline: { minHeight: 96, paddingVertical: 0 },
  helper: { marginTop: spacing.sm },
});
