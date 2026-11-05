import { StyleSheet } from 'react-native';

import { colors, fontFamilies } from '@/theme';

import { AppText } from './AppText';

type WordmarkProps = {
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = { sm: 24, md: 28, lg: 36 } as const;

/** The editorial "lookvi." wordmark from the Stitch designs. */
export function Wordmark({ size = 'md' }: WordmarkProps) {
  const fontSize = SIZES[size];
  return (
    <AppText
      accessibilityLabel="Lookvi"
      style={[styles.text, { fontSize, lineHeight: fontSize * 1.2 }]}
    >
      lookvi.
    </AppText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamilies.serif,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
});
