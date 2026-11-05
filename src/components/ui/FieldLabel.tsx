import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { AppText } from './AppText';

type FieldLabelProps = {
  label: string;
  /** Optional text on the right, e.g. a character counter. */
  aside?: string;
};

/** Label row shared by form fields. */
export function FieldLabel({ label, aside }: FieldLabelProps) {
  return (
    <View style={styles.row}>
      <AppText variant="labelLg">{label}</AppText>
      {aside ? (
        <AppText variant="labelMd" color="textMuted">
          {aside}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
});
