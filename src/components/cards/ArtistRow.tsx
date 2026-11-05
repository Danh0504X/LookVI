import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type ArtistRowProps = {
  avatar: ImageRef;
  name: string;
  /** Second line (specialty, or rating + specialty). */
  subtitle: ReactNode;
  /** Right-aligned content (rating, price). */
  trailing?: ReactNode;
  /** Rounded-square portrait (Home) or circle (Search). */
  avatarShape?: 'rounded' | 'circle';
  accessibilityLabel: string;
  onPress: () => void;
  showDivider?: boolean;
};

/** List row for an artist. */
export function ArtistRow({
  avatar,
  name,
  subtitle,
  trailing,
  avatarShape = 'rounded',
  accessibilityLabel,
  onPress,
  showDivider = true,
}: ArtistRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.row, showDivider && styles.divider, pressed && styles.pressed]}
    >
      <Image
        source={avatar}
        contentFit="cover"
        style={[styles.avatar, avatarShape === 'circle' ? styles.circle : styles.rounded]}
      />
      <View style={styles.text}>
        <AppText variant="titleMd" numberOfLines={1}>
          {name}
        </AppText>
        <View style={styles.subtitle}>{subtitle}</View>
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Pressable>
  );
}

const AVATAR = 60;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  pressed: { opacity: 0.7 },
  avatar: { width: AVATAR, height: AVATAR, backgroundColor: colors.surfaceSubtle },
  rounded: { borderRadius: radii.lg },
  circle: { borderRadius: AVATAR / 2 },
  text: { flex: 1, minWidth: 0 },
  subtitle: { marginTop: spacing.xxs },
  trailing: { alignItems: 'flex-end' },
});
