import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

export type Option<T extends string> = { value: T; label: string };

type OptionSheetProps<T extends string> = {
  visible: boolean;
  title: string;
  options: readonly Option<T>[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  onClose: () => void;
};

/** Bottom sheet with a single-choice list. */
export function OptionSheet<T extends string>({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: OptionSheetProps<T>) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        style={styles.scrim}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close"
      />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.handle} />
        <AppText variant="titleMd" style={styles.title} accessibilityRole="header">
          {title}
        </AppText>
        <ScrollView bounces={false}>
          {options.map((option) => {
            const selected = option.value === selectedValue;
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              >
                <AppText variant="bodyLg" style={styles.rowLabel}>
                  {option.label}
                </AppText>
                {selected ? <Icon name="check" size={22} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: colors.scrim },
  sheet: {
    maxHeight: '70%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xxl,
    borderTopRightRadius: radii.xxl,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  title: { marginBottom: spacing.sm },
  row: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: { opacity: 0.6 },
  rowLabel: { flex: 1 },
});
