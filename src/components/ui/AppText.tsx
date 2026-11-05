import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, type ColorToken, typography, type TypographyToken } from '@/theme';

type AppTextProps = TextProps & {
  variant?: TypographyToken;
  color?: ColorToken;
  align?: 'auto' | 'left' | 'center' | 'right';
  uppercase?: boolean;
};

/** Text bound to the Lookvi type scale and colour tokens. Use instead of raw `Text`. */
export function AppText({
  variant = 'bodyMd',
  color = 'textPrimary',
  align,
  uppercase = false,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[
        typography[variant],
        { color: colors[color] },
        align ? { textAlign: align } : null,
        uppercase ? styles.uppercase : null,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  uppercase: { textTransform: 'uppercase' },
});
