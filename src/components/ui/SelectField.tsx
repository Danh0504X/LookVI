import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { FieldLabel } from './FieldLabel';
import { Icon, type IconName } from './Icon';
import { OptionSheet, type Option } from './OptionSheet';

type SelectFieldProps<T extends string> = {
  label: string;
  value: T | null;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  leadingIcon?: IconName;
  helper?: string;
};

/** Field that opens a bottom sheet of options. */
export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
  leadingIcon,
  helper,
}: SelectFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <View>
      <FieldLabel label={label} />
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected?.label ?? placeholder}`}
        accessibilityHint="Opens a list of options"
        style={({ pressed }) => [styles.box, pressed && styles.boxPressed]}
      >
        {leadingIcon ? <Icon name={leadingIcon} size={22} color={colors.accent} /> : null}
        <AppText
          variant="bodyLg"
          color={selected ? 'textPrimary' : 'textMuted'}
          style={styles.value}
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
        </AppText>
        <Icon name="expand_more" size={22} color={colors.textMuted} />
      </Pressable>
      {helper ? (
        <AppText variant="labelMd" color="textMuted" style={styles.helper}>
          {helper}
        </AppText>
      ) : null}
      <OptionSheet
        visible={open}
        title={label}
        options={options}
        selectedValue={value}
        onSelect={onChange}
        onClose={() => setOpen(false)}
      />
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
    gap: spacing.md,
  },
  boxPressed: { backgroundColor: colors.surfaceMuted },
  value: { flex: 1 },
  helper: { marginTop: spacing.sm },
});
