import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { Icon } from './Icon';

type SearchFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  value: string;
  onChangeText: (text: string) => void;
};

/** Rounded search input with a leading search icon and a clear button. */
export function SearchField({
  value,
  onChangeText,
  placeholder = 'Search',
  ...inputProps
}: SearchFieldProps) {
  return (
    <View style={styles.box}>
      <Icon name="search" size={22} color={colors.textMuted} />
      <TextInput
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel={placeholder}
        style={styles.input}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={10}
        >
          <Icon name="close" size={20} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: { ...typography.bodyLg, flex: 1, color: colors.textPrimary, paddingVertical: 0 },
});
