import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/theme';

/**
 * Temporary bootstrap screen used only to verify project initialization.
 * Replace it with the real entry route once the Stitch designs are implemented.
 */
export default function BootstrapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Lookvi
      </Text>
      <Text style={styles.subtitle}>Mobile application initialized successfully.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
