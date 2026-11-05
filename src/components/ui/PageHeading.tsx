import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

type PageHeadingProps = {
  /** Small uppercase overline in the accent colour. */
  eyebrow?: string;
  /** A string, or nodes when part of the title needs its own style (e.g. italics). */
  title: ReactNode;
  subtitle?: string;
  size?: 'lg' | 'md';
  align?: 'left' | 'center';
};

/** Eyebrow + editorial title + supporting line, used at the top of full-page flows. */
export function PageHeading({ eyebrow, title, subtitle, size = 'md', align = 'left' }: PageHeadingProps) {
  return (
    <View style={align === 'center' ? styles.center : null}>
      {eyebrow ? (
        <View style={styles.eyebrowRow}>
          {align === 'left' ? <View style={styles.eyebrowRule} /> : null}
          <AppText variant="labelSm" color="accent" uppercase>
            {eyebrow}
          </AppText>
        </View>
      ) : null}
      <AppText
        variant={size === 'lg' ? 'displayLg' : 'displayMd'}
        align={align}
        accessibilityRole="header"
      >
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="bodyLg" color="textSecondary" align={align} style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  eyebrowRule: { width: 28, height: 1, backgroundColor: colors.accent },
  subtitle: { marginTop: spacing.md },
});
