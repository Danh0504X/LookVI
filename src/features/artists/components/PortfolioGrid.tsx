import { Image } from 'expo-image';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/ui';
import type { Post } from '@/domain/models';
import { colors, layout, radii, spacing } from '@/theme';

type PortfolioGridProps = {
  posts: readonly Post[];
  onSelect: (post: Post) => void;
};

const COLUMNS = 3;
const GAP = spacing.xs;

/** Instagram-style square grid of an artist's posts. */
export function PortfolioGrid({ posts, onSelect }: PortfolioGridProps) {
  const { width } = useWindowDimensions();
  const size = (width - layout.screenPadding * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

  if (posts.length === 0) {
    return (
      <AppText variant="bodyMd" color="textSecondary">
        No looks published yet.
      </AppText>
    );
  }

  return (
    <View style={styles.grid}>
      {posts.map((post) => {
        const cover = post.images[0];
        return (
          <Pressable
            key={post.id}
            onPress={() => onSelect(post)}
            accessibilityRole="button"
            accessibilityLabel={post.lookName}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            {cover ? (
              <Image source={cover} contentFit="cover" transition={150} style={[styles.tile, { width: size, height: size }]} />
            ) : (
              <View style={[styles.tile, { width: size, height: size }]} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  tile: { borderRadius: radii.sm, backgroundColor: colors.surfaceSubtle },
  pressed: { opacity: 0.8 },
});
