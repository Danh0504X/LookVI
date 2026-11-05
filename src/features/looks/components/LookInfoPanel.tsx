import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, IconButton, Rating } from '@/components/ui';
import { OCCASION_LABELS } from '@/domain/models';
import type { PostCardData } from '@/features/catalog';
import { colors, fontFamilies, layout, radii, spacing } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';

type LookInfoPanelProps = {
  card: PostCardData;
  saved: boolean;
  bottomInset: number;
  /** Omitted when the viewer cannot save (artist role). */
  onToggleSave?: () => void;
  /** Omitted when the artist profile is not reachable (artist role). */
  onOpenArtist?: () => void;
  /** Omitted when booking is not available (artist role). */
  onBook?: () => void;
};

/** Bottom overlay of the look detail: artist, title, description, offer and Book. */
export function LookInfoPanel({
  card,
  saved,
  bottomInset,
  onToggleSave,
  onOpenArtist,
  onBook,
}: LookInfoPanelProps) {
  const { post, artist, offer } = card;

  return (
    <View style={[styles.panel, { paddingBottom: bottomInset + spacing.lg }]}>
      <View style={styles.artistRow}>
        <Pressable
          onPress={onOpenArtist}
          disabled={!onOpenArtist}
          accessibilityRole={onOpenArtist ? 'button' : undefined}
          accessibilityLabel={onOpenArtist ? `View ${artist.name}'s profile` : artist.name}
          style={styles.artist}
        >
          <Image source={artist.avatar} contentFit="cover" style={styles.avatar} />
          <View style={styles.artistText}>
            <View style={styles.nameRow}>
              <AppText variant="labelLg" style={styles.onImage} numberOfLines={1}>
                {artist.name}
              </AppText>
              {artist.verified ? (
                <Icon name="verified" filled size={16} color={colors.onPrimary} />
              ) : null}
            </View>
            <Rating value={artist.rating} reviewCount={artist.reviewCount} countStyle="long" onImage />
          </View>
        </Pressable>
        {onToggleSave ? (
          <IconButton
            icon="favorite"
            filled={saved}
            selected={saved}
            iconColor={saved ? colors.accentSoft : colors.onPrimary}
            variant="overlay"
            accessibilityLabel={saved ? 'Remove from saved' : 'Save look'}
            onPress={onToggleSave}
          />
        ) : null}
      </View>

      <AppText variant="displayMd" style={[styles.onImage, styles.title]} accessibilityRole="header">
        {post.lookName}
      </AppText>
      <AppText variant="bodyMd" style={styles.description} numberOfLines={3}>
        {post.description}
      </AppText>

      <View style={styles.actions}>
        {offer ? (
          <View
            style={styles.offer}
            accessible
            accessibilityLabel={`${OCCASION_LABELS[offer.occasion]}, from ${formatPrice(offer.priceVnd)}`}
          >
            <AppText variant="labelMd" style={styles.onImageMuted} numberOfLines={1}>
              {OCCASION_LABELS[offer.occasion]}
            </AppText>
            <AppText variant="labelLg" style={styles.onImage} numberOfLines={1}>
              From {formatPrice(offer.priceVnd)}
            </AppText>
          </View>
        ) : (
          <View style={styles.spacer} />
        )}
        {onBook ? (
          <Pressable
            onPress={onBook}
            accessibilityRole="button"
            accessibilityLabel={`Book ${artist.name}`}
            style={({ pressed }) => [styles.book, pressed && styles.bookPressed]}
          >
            <AppText variant="labelLg" style={styles.bookLabel}>
              Book
            </AppText>
            <Icon name="arrow_forward" size={20} color={colors.textPrimary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 120,
    // Native CSS gradient (React Native 0.76+, New Architecture): keeps text legible on photos.
    backgroundImage:
      'linear-gradient(180deg, rgba(27, 22, 23, 0) 0%, rgba(27, 22, 23, 0.55) 40%, rgba(27, 22, 23, 0.9) 100%)',
  },
  artistRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  artist: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1, minWidth: 0 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.onPrimary,
  },
  artistText: { flex: 1, minWidth: 0, gap: spacing.xxs },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  onImage: { color: colors.onPrimary },
  onImageMuted: { color: colors.onImageMuted },
  title: { marginTop: spacing.lg, fontFamily: fontFamilies.serifMedium },
  description: { color: colors.onImageMuted, marginTop: spacing.sm },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xl },
  offer: {
    flex: 1,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: colors.overlayFill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.overlayBorder,
  },
  spacer: { flex: 1 },
  book: {
    height: layout.minTouchTarget,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.full,
    backgroundColor: colors.accentSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  bookPressed: { opacity: 0.85 },
  bookLabel: { color: colors.textPrimary, fontSize: 16, lineHeight: 20 },
});
