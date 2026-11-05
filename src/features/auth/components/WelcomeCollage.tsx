import { Image } from 'expo-image';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { mockImages } from '@/data/mock';
import { colors, layout, radii, spacing } from '@/theme';

const MAX_HEIGHT = 380;

/** Editorial three-photo collage from the Stitch welcome screen. Decorative. */
export function WelcomeCollage() {
  const { width } = useWindowDimensions();
  const contentWidth = width - layout.screenPadding * 2;
  const height = Math.min(contentWidth * 0.9, MAX_HEIGHT);
  const smallHeight = (height - spacing.md) / 2;

  return (
    <View
      style={[styles.row, { height }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Makeup looks by Lookvi artists"
    >
      <Image source={mockImages.portrait02} contentFit="cover" style={[styles.photo, styles.large]} />
      <View style={styles.column}>
        <Image
          source={mockImages.portrait04}
          contentFit="cover"
          style={[styles.photo, { height: smallHeight }]}
        />
        <Image
          source={mockImages.portrait03}
          contentFit="cover"
          style={[styles.photo, { height: smallHeight }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  photo: { borderRadius: radii.xl, backgroundColor: colors.surfaceSubtle },
  large: { flex: 1.4 },
  column: { flex: 1, gap: spacing.md },
});
