import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import type { ImageRef } from '@/domain/models';
import { colors } from '@/theme';

type AvatarProps = {
  source: ImageRef;
  size?: number;
  /** Describes the person; omit when a visible name is next to the avatar. */
  accessibilityLabel?: string;
};

export function Avatar({ source, size = 48, accessibilityLabel }: AvatarProps) {
  return (
    <Image
      source={source}
      contentFit="cover"
      transition={150}
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.surfaceSubtle },
});
