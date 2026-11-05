import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

type RatingProps = {
  value: number;
  reviewCount?: number;
  /** "(142)" or "(142 reviews)". */
  countStyle?: 'short' | 'long';
  /** Light text for use on photos. */
  onImage?: boolean;
};

/** Filled star + average + optional review count. */
export function Rating({ value, reviewCount, countStyle = 'short', onImage = false }: RatingProps) {
  const count =
    reviewCount === undefined
      ? null
      : countStyle === 'long'
        ? `(${reviewCount} reviews)`
        : `(${reviewCount})`;

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Rated ${value.toFixed(1)} out of 5${reviewCount === undefined ? '' : `, ${reviewCount} reviews`}`}
    >
      <Icon name="star" filled size={16} color={onImage ? colors.accentSoft : colors.accent} />
      <AppText variant="labelLg" style={onImage ? styles.onImage : null}>
        {value.toFixed(1)}
      </AppText>
      {count ? (
        <AppText variant="bodyMd" color="textMuted" style={onImage ? styles.onImageMuted : null}>
          {count}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  onImage: { color: colors.onPrimary },
  onImageMuted: { color: colors.onImageMuted },
});
