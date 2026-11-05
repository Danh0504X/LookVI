import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import type { ImageRef } from '@/domain/models';
import { colors } from '@/theme';

import { AppText } from './AppText';

type AvatarProps = {
  /** Photo; when missing, the initials of `name` are shown instead. */
  source?: ImageRef | null;
  name?: string;
  size?: number;
  /** Describes the person; omit when a visible name is next to the avatar. */
  accessibilityLabel?: string;
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function Avatar({ source, name, size = 48, accessibilityLabel }: AvatarProps) {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  if (!source) {
    return (
      <View
        style={[styles.fallback, shape]}
        accessible={Boolean(accessibilityLabel)}
        accessibilityLabel={accessibilityLabel}
      >
        <AppText variant="labelLg" color="textSecondary" style={{ fontSize: size * 0.36 }}>
          {name ? initialsOf(name) : ''}
        </AppText>
      </View>
    );
  }

  return (
    <Image
      source={source}
      contentFit="cover"
      transition={150}
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      style={[styles.image, shape]}
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.surfaceSubtle },
  fallback: { backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
});
