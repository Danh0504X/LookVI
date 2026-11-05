import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { VariantOption } from '@/components/cards';
import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Button, Chip, IconButton } from '@/components/ui';
import type { Artist } from '@/domain/models';
import {
  getArtistById,
  getPostsByArtist,
  getReviewsForArtist,
  getServiceForArtist,
} from '@/features/catalog';
import { useSaved } from '@/features/saved';
import { colors, spacing } from '@/theme';
import { formatDuration } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { ArtistProfileHeader } from '../components/ArtistProfileHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { ReviewItem } from '../components/ReviewItem';

type ProfileTab = 'services' | 'portfolio' | 'reviews';

export function ArtistProfileScreen() {
  const router = useRouter();
  const { artistId } = useLocalSearchParams<{ artistId: string }>();
  const artist = artistId ? getArtistById(artistId) : undefined;

  if (!artist) {
    return (
      <PlaceholderScreen
        icon="person_off"
        title="Artist not found"
        message="This artist is no longer on Lookvi."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return <ArtistProfile artist={artist} />;
}

function ArtistProfile({ artist }: { artist: Artist }) {
  const router = useRouter();
  const { isArtistSaved, toggleArtistSaved } = useSaved();
  const service = getServiceForArtist(artist.id);
  const variants = service?.variants ?? [];
  const posts = getPostsByArtist(artist.id);
  const reviews = getReviewsForArtist(artist.id);

  const [tab, setTab] = useState<ProfileTab>('services');
  const [variantId, setVariantId] = useState(variants[0]?.id ?? null);
  const selected = variants.find((variant) => variant.id === variantId) ?? null;
  const saved = isArtistSaved(artist.id);

  const tabs: { value: ProfileTab; label: string }[] = [
    { value: 'services', label: `Services (${variants.length})` },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'reviews', label: `Reviews (${artist.reviewCount})` },
  ];

  return (
    <Screen
      header={
        <TopBar
          onBack={() => router.back()}
          right={
            <IconButton
              icon="bookmark"
              filled={saved}
              selected={saved}
              accessibilityLabel={saved ? `Remove ${artist.name} from saved` : `Save ${artist.name}`}
              onPress={() => toggleArtistSaved(artist.id)}
            />
          }
        />
      }
      footer={
        selected ? (
          <View style={styles.footer}>
            <View style={styles.footerPrice}>
              <AppText variant="labelMd" color="textMuted">
                {selected.name}
              </AppText>
              <AppText variant="priceLg">{formatPrice(selected.priceVnd)}</AppText>
            </View>
            <Button
              label="Book"
              trailingIcon="arrow_forward"
              style={styles.bookButton}
              onPress={() =>
                router.push({
                  pathname: '/book/[artistId]',
                  params: { artistId: artist.id, variantId: selected.id },
                })
              }
            />
          </View>
        ) : null
      }
    >
      <ArtistProfileHeader artist={artist} />

      <View style={styles.tabs}>
        {tabs.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={tab === item.value}
            onPress={() => setTab(item.value)}
          />
        ))}
      </View>

      {tab === 'services' ? (
        <View style={styles.list} accessibilityRole="radiogroup">
          {variants.map((variant) => (
            <VariantOption
              key={variant.id}
              name={variant.name}
              details={`${formatDuration(variant.durationMinutes)} · ${variant.description}`}
              price={formatPrice(variant.priceVnd)}
              selected={variant.id === variantId}
              onPress={() => setVariantId(variant.id)}
            />
          ))}
          <AppText variant="labelMd" color="textMuted">
            At-home service. Travel is included in every price.
          </AppText>
        </View>
      ) : null}

      {tab === 'portfolio' ? (
        <View style={styles.list}>
          <PortfolioGrid
            posts={posts}
            onSelect={(post) =>
              router.push({ pathname: '/post/[postId]', params: { postId: post.id } })
            }
          />
        </View>
      ) : null}

      {tab === 'reviews' ? (
        <View>
          {reviews.length === 0 ? (
            <AppText variant="bodyMd" color="textSecondary" style={styles.list}>
              No reviews yet.
            </AppText>
          ) : (
            <>
              <AppText variant="labelMd" color="textMuted" style={styles.reviewsNote}>
                Most recent reviews from completed bookings
              </AppText>
              {reviews.map((review, index) => (
                <ReviewItem key={review.id} review={review} showDivider={index < reviews.length - 1} />
              ))}
            </>
          )}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  list: { marginTop: spacing.lg, gap: spacing.md, paddingBottom: spacing.lg },
  reviewsNote: { marginTop: spacing.lg },
  footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  footerPrice: { flex: 1 },
  bookButton: { flex: 1 },
});
