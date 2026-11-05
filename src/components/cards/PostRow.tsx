import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type PostRowProps = {
  image: ImageRef;
  caption: string;
  author: string;
  onPress: () => void;
  showDivider?: boolean;
};

/** Text-led row for a post (thumbnail, caption, author). */
export function PostRow({ image, caption, author, onPress, showDivider = true }: PostRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${caption}, by ${author}`}
      style={({ pressed }) => [styles.row, showDivider && styles.divider, pressed && styles.pressed]}
    >
      <Image source={image} contentFit="cover" style={styles.thumb} />
      <View style={styles.text}>
        <AppText variant="labelLg" numberOfLines={2} style={styles.caption}>
          {caption}
        </AppText>
        <AppText variant="labelMd" color="textMuted" numberOfLines={1}>
          {author}
        </AppText>
      </View>
      <Icon name="chevron_right" size={22} color={colors.borderStrong} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.md },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  pressed: { opacity: 0.7 },
  thumb: { width: 64, height: 80, borderRadius: radii.lg, backgroundColor: colors.surfaceSubtle },
  text: { flex: 1, minWidth: 0, gap: spacing.xs },
  caption: { fontSize: 15, lineHeight: 20 },
});
