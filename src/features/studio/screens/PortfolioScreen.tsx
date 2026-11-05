import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Button, Chip, PageHeading } from '@/components/ui';
import { OCCASION_LABELS, type Occasion, type Post } from '@/domain/models';
import { getEligibleVariants, getPostOffer, getPostsByArtist, useServices } from '@/features/catalog';
import { colors, layout, radii, spacing } from '@/theme';
import { showDemoNotice } from '@/utils/demoNotice';
import { formatPrice } from '@/utils/formatPrice';

import { useArtistIdentity } from '../hooks/useArtistIdentity';

type Filter = 'all' | Occasion;
const FILTERS: Filter[] = ['all', 'personal', 'party', 'event'];

const supports = (post: Post, occasion: Occasion) =>
  getEligibleVariants(post).some((variant) => variant.occasion === occasion);

/** The artist's own posts, with the service each one is linked to. */
export function PortfolioScreen() {
  // Linked prices are read from the service store through catalog helpers; opt out of
  // automatic memoization so a package edit (which re-renders via useServices) shows at once.
  'use no memo';
  const router = useRouter();
  const { width } = useWindowDimensions();
  const identity = useArtistIdentity();
  useServices();
  const [filter, setFilter] = useState<Filter>('all');

  if (!identity) return null;
  const posts = getPostsByArtist(identity.profile.artistId);
  const visible = filter === 'all' ? posts : posts.filter((post) => supports(post, filter));
  const itemWidth = (width - layout.screenPadding * 2 - layout.gutter) / 2;

  const label = (value: Filter) => {
    const count = value === 'all' ? posts.length : posts.filter((post) => supports(post, value)).length;
    const name = value === 'all' ? 'All' : OCCASION_LABELS[value].replace(' Makeup', '');
    return `${name} (${count})`;
  };

  return (
    <Screen bottomInset={false}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <PageHeading title="Portfolio" subtitle={`${posts.length} published looks`} />
        </View>
        <Button
          label="New post"
          variant="secondary"
          onPress={() => showDemoNotice('Publishing new looks')}
        />
      </View>

      <View style={styles.filters}>
        {FILTERS.map((value) => (
          <Chip key={value} label={label(value)} selected={filter === value} onPress={() => setFilter(value)} />
        ))}
      </View>

      {visible.length === 0 ? (
        <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.empty}>
          No looks linked to this package yet.
        </AppText>
      ) : (
        <View style={styles.grid}>
          {visible.map((post) => {
            const offer = getPostOffer(post);
            const cover = post.images[0];
            return (
              <Pressable
                key={post.id}
                onPress={() => router.push({ pathname: '/post/[postId]', params: { postId: post.id } })}
                accessibilityRole="button"
                accessibilityLabel={`${post.lookName}${offer ? `, linked to ${offer.name}` : ', not linked to a service'}`}
                style={({ pressed }) => [{ width: itemWidth }, pressed && styles.pressed]}
              >
                {cover ? <Image source={cover} contentFit="cover" style={styles.image} /> : null}
                <AppText variant="labelLg" numberOfLines={1} style={styles.title}>
                  {post.lookName}
                </AppText>
                <AppText variant="labelMd" color={offer ? 'textSecondary' : 'textMuted'} numberOfLines={1}>
                  {offer ? `${offer.name} · from ${formatPrice(offer.priceVnd)}` : 'Not linked to a service'}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md, paddingTop: spacing.lg },
  flex: { flex: 1 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: layout.gutter,
    rowGap: spacing.xl,
    marginTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  pressed: { opacity: 0.85 },
  image: { width: '100%', aspectRatio: 3 / 4, borderRadius: radii.xl, backgroundColor: colors.surfaceSubtle },
  title: { marginTop: spacing.sm, fontSize: 15, lineHeight: 20 },
  empty: { marginTop: spacing.xxxl },
});
