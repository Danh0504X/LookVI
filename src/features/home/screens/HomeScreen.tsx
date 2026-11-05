import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { ArtistRow } from '@/components/cards';
import { Screen } from '@/components/layout';
import { AppText, Chip, Rating, SectionHeader } from '@/components/ui';
import { mockImages } from '@/data/mock';
import { OCCASION_LABELS, type ImageRef, type Occasion } from '@/domain/models';
import { exploreHref } from '@/features/explore';
import { CustomerHeader } from '@/features/location';
import { useSession } from '@/features/session';
import { layout, spacing } from '@/theme';

import { OccasionCard } from '../components/OccasionCard';
import { getHomeArtists, type HomeArtistFilter } from '../services/homeArtists';

const OCCASION_CARDS: { occasion: Occasion; image: ImageRef }[] = [
  { occasion: 'personal', image: mockImages.portrait01 },
  { occasion: 'party', image: mockImages.portrait04 },
  { occasion: 'event', image: mockImages.portrait05 },
];

const ARTIST_FILTERS: { value: HomeArtistFilter; label: string }[] = [
  { value: 'accepting', label: 'Accepting requests' },
  { value: 'near', label: 'Near you' },
];

export function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { customerProfile } = useSession();
  const [artistFilter, setArtistFilter] = useState<HomeArtistFilter>('accepting');

  const areaId = customerProfile?.areaId ?? null;
  const artists = getHomeArtists(artistFilter, areaId);
  const occasionWidth = (width - layout.screenPadding * 2 - spacing.md * 2) / 3;

  return (
    <Screen header={<CustomerHeader />} bottomInset={false}>
      <View style={styles.section}>
        <SectionHeader title="What are you getting ready for?" />
        <View style={styles.occasions}>
          {OCCASION_CARDS.map(({ occasion, image }) => (
            <OccasionCard
              key={occasion}
              image={image}
              label={OCCASION_LABELS[occasion]}
              width={occasionWidth}
              onPress={() => router.navigate(exploreHref({ kind: 'occasion', occasion }))}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Makeup artists"
          action={{
            label: 'View all',
            onPress: () =>
              router.navigate({ pathname: '/explore/search', params: { tab: 'artists' } }),
          }}
        />
        <View style={styles.filters}>
          {ARTIST_FILTERS.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              selected={artistFilter === filter.value}
              onPress={() => setArtistFilter(filter.value)}
            />
          ))}
        </View>

        {artistFilter === 'near' && !areaId ? (
          <AppText variant="labelMd" color="textMuted" style={styles.hint}>
            Set your area at the top to see who travels to you.
          </AppText>
        ) : null}

        {artists.length === 0 ? (
          <AppText variant="bodyMd" color="textSecondary" style={styles.hint}>
            No artists travel to your area yet. Try another area.
          </AppText>
        ) : (
          artists.map((artist, index) => (
            <ArtistRow
              key={artist.id}
              avatar={artist.avatar}
              name={artist.name}
              accessibilityLabel={`${artist.name}, ${artist.specialty}, rated ${artist.rating}`}
              subtitle={
                <AppText variant="bodyMd" color="textSecondary" numberOfLines={1}>
                  {artist.specialty}
                </AppText>
              }
              trailing={<Rating value={artist.rating} reviewCount={artist.reviewCount} />}
              showDivider={index < artists.length - 1}
              onPress={() =>
                router.push({ pathname: '/artist/[artistId]', params: { artistId: artist.id } })
              }
            />
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.xl },
  occasions: { flexDirection: 'row', gap: spacing.md },
  filters: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  hint: { marginVertical: spacing.sm },
});
