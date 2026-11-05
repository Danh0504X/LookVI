import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type OccasionCardProps = {
  image: ImageRef;
  label: string;
  width: number;
  onPress: () => void;
};

/** "What are you getting ready for?" shortcut into Explore. */
export function OccasionCard({ image, label, width, onPress }: OccasionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} looks`}
      style={({ pressed }) => [{ width }, pressed && styles.pressed]}
    >
      <Image source={image} contentFit="cover" transition={150} style={styles.image} />
      <AppText variant="labelLg" align="center" numberOfLines={1} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.85 },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceSubtle,
  },
  label: { marginTop: spacing.sm },
});
