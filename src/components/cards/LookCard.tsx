import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { IconButton } from '@/components/ui/IconButton';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type LookCardProps = {
  image: ImageRef;
  title: string;
  /** e.g. "Linh Nguyen · from 550.000₫" */
  subtitle: string;
  saved: boolean;
  onToggleSave: () => void;
  onPress: () => void;
};

/** Image-first card for the discovery grids (3:4 photo, title, one meta line). */
export function LookCard({ image, title, subtitle, saved, onToggleSave, onPress }: LookCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View>
        <Image source={image} contentFit="cover" transition={150} style={styles.image} />
        <IconButton
          icon="favorite"
          filled={saved}
          selected={saved}
          iconColor={saved ? colors.accent : colors.textPrimary}
          accessibilityLabel={saved ? `Remove ${title} from saved` : `Save ${title}`}
          onPress={onToggleSave}
          variant="overlayLight"
          size={32}
          iconSize={18}
          style={styles.save}
        />
      </View>
      <AppText variant="labelLg" numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
      <AppText variant="labelMd" color="textMuted" numberOfLines={1}>
        {subtitle}
      </AppText>
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
  save: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  title: { marginTop: spacing.sm, fontSize: 15, lineHeight: 20 },
});
