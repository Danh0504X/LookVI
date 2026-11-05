import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type StyleCardProps = {
  image: ImageRef;
  name: string;
  /** e.g. "From 450.000₫" */
  priceLabel: string | null;
  /** e.g. "6 looks" */
  countLabel: string;
  onPress: () => void;
};

/** Card for a makeup style (category), with cover photo and starting price. */
export function StyleCard({ image, name, priceLabel, countLabel, onPress }: StyleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name} style, ${countLabel}${priceLabel ? `, ${priceLabel}` : ''}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={image} contentFit="cover" transition={150} style={styles.image} />
      <AppText variant="labelLg" numberOfLines={1} style={styles.name}>
        {name}
      </AppText>
      <View style={styles.meta}>
        <AppText variant="labelMd" color="textMuted">
          {countLabel}
        </AppText>
        {priceLabel ? (
          <AppText variant="labelMd" color="textSecondary">
            {priceLabel}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  pressed: { opacity: 0.85 },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceSubtle,
  },
  name: { marginTop: spacing.sm, fontSize: 15, lineHeight: 20 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xxs },
});
