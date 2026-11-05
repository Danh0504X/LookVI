import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { colors, radii, spacing } from '@/theme';

import { Screen } from './Screen';

type PlaceholderScreenProps = {
  icon: IconName;
  title: string;
  message: string;
  action?: { label: string; onPress: () => void };
};

/**
 * Honest stand-in for a destination that is not built yet, so the demo never pretends a
 * missing feature exists.
 */
export function PlaceholderScreen({ icon, title, message, action }: PlaceholderScreenProps) {
  return (
    <Screen scroll={false} contentStyle={styles.content}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={28} color={colors.accent} />
      </View>
      <AppText variant="headlineLg" align="center" accessibilityRole="header">
        {title}
      </AppText>
      <AppText variant="bodyLg" color="textSecondary" align="center" style={styles.message}>
        {message}
      </AppText>
      {action ? (
        <Button
          label={action.label}
          onPress={action.onPress}
          variant="secondary"
          style={styles.action}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: 'center', alignItems: 'center' },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  message: { marginTop: spacing.md, maxWidth: 320 },
  action: { marginTop: spacing.xxl, alignSelf: 'stretch' },
});
