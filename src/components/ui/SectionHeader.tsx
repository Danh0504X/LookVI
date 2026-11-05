import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { AppText } from './AppText';

type SectionHeaderProps = {
  title: string;
  /** Editorial serif title (Playfair) instead of the default UI title. */
  editorial?: boolean;
  action?: { label: string; onPress: () => void };
};

/** Section title with an optional text action ("See all", "View all"). */
export function SectionHeader({ title, editorial = false, action }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText variant={editorial ? 'headlineSm' : 'titleMd'} accessibilityRole="header">
        {title}
      </AppText>
      {action ? (
        <AppText
          variant="labelLg"
          color="textSecondary"
          onPress={action.onPress}
          accessibilityRole="button"
          suppressHighlighting
          style={styles.action}
        >
          {action.label}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  action: { paddingVertical: spacing.sm, paddingLeft: spacing.lg },
});
