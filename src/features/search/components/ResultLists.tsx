import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { ArtistRow, PostRow, StyleCard } from '@/components/cards';
import { AppText, Rating } from '@/components/ui';
import type { PostCardData } from '@/features/catalog';
import { layout, spacing } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';

import type { ArtistResult, StyleResult } from '../services/searchService';

export function StyleGrid({
  items: results,
  onSelect,
}: {
  items: readonly StyleResult[];
  onSelect: (result: StyleResult) => void;
}) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - layout.screenPadding * 2 - layout.gutter) / 2;

  return (
    <View style={styles.grid}>
      {results.map((result) => (
        <View key={result.style.id} style={{ width: itemWidth }}>
          <StyleCard
            image={result.cover}
            name={result.style.name}
            countLabel={`${result.lookCount} ${result.lookCount === 1 ? 'look' : 'looks'}`}
            priceLabel={result.fromPriceVnd === null ? null : `From ${formatPrice(result.fromPriceVnd)}`}
            onPress={() => onSelect(result)}
          />
        </View>
      ))}
    </View>
  );
}

export function PostList({
  posts,
  onSelect,
}: {
  posts: readonly PostCardData[];
  onSelect: (card: PostCardData) => void;
}) {
  return (
    <View>
      {posts.map((card, index) => (
        <PostRow
          key={card.post.id}
          image={card.post.images[0] ?? card.artist.avatar}
          caption={card.post.caption}
          author={card.artist.name}
          showDivider={index < posts.length - 1}
          onPress={() => onSelect(card)}
        />
      ))}
    </View>
  );
}

export function ArtistList({
  artists,
  showPrice,
  onSelect,
}: {
  artists: readonly ArtistResult[];
  /** Compact rows with a "From" price (All tab) instead of specialty and area. */
  showPrice: boolean;
  onSelect: (result: ArtistResult) => void;
}) {
  return (
    <View>
      {artists.map((result, index) => {
        const { artist, areaName, fromPriceVnd } = result;
        const details = [artist.specialty, areaName].filter(Boolean).join(' · ');
        return (
          <ArtistRow
            key={artist.id}
            avatar={artist.avatar}
            name={artist.name}
            avatarShape="circle"
            accessibilityLabel={`${artist.name}, rated ${artist.rating}, ${details}`}
            showDivider={index < artists.length - 1}
            onPress={() => onSelect(result)}
            subtitle={
              showPrice ? (
                <Rating value={artist.rating} />
              ) : (
                <View style={styles.meta}>
                  <Rating value={artist.rating} reviewCount={artist.reviewCount} />
                  <AppText variant="labelMd" color="textMuted" numberOfLines={1} style={styles.details}>
                    {details}
                  </AppText>
                </View>
              )
            }
            trailing={
              showPrice && fromPriceVnd !== null ? (
                <>
                  <AppText variant="labelMd" color="textMuted">
                    From
                  </AppText>
                  <AppText variant="labelLg">{formatPrice(fromPriceVnd)}</AppText>
                </>
              ) : undefined
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: layout.gutter, rowGap: spacing.xl },
  meta: { gap: spacing.xxs },
  details: { flexShrink: 1 },
});
