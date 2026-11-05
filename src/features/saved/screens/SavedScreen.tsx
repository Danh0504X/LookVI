import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { ArtistRow, LookCard } from '@/components/cards';
import { Screen } from '@/components/layout';
import { AppText, Button, Chip, IconButton, PageHeading, Rating } from '@/components/ui';
import {
  describePostCard,
  getArtistById,
  getPostById,
  toPostCards,
} from '@/features/catalog';
import { layout, spacing } from '@/theme';

import { useSaved } from '../useSaved';

type SavedTab = 'looks' | 'artists';

export function SavedScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { savedPostIds, savedArtistIds, togglePostSaved, toggleArtistSaved } = useSaved();
  const [tab, setTab] = useState<SavedTab>('looks');

  const looks = toPostCards(
    savedPostIds.flatMap((id) => {
      const post = getPostById(id);
      return post ? [post] : [];
    }),
  );
  const artists = savedArtistIds.flatMap((id) => {
    const artist = getArtistById(id);
    return artist ? [artist] : [];
  });
  const itemWidth = (width - layout.screenPadding * 2 - layout.gutter) / 2;

  return (
    <Screen bottomInset={false}>
      <View style={styles.heading}>
        <PageHeading title="Saved" />
      </View>

      <View style={styles.tabs}>
        <Chip
          label={`Looks (${looks.length})`}
          selected={tab === 'looks'}
          onPress={() => setTab('looks')}
        />
        <Chip
          label={`Artists (${artists.length})`}
          selected={tab === 'artists'}
          onPress={() => setTab('artists')}
        />
      </View>

      {tab === 'looks' ? (
        looks.length === 0 ? (
          <Empty
            title="No saved looks yet"
            message="Tap the heart on any look to keep it here."
            onExplore={() => router.navigate('/explore')}
          />
        ) : (
          <View style={styles.grid}>
            {looks.map((card) => (
              <View key={card.post.id} style={{ width: itemWidth }}>
                <LookCard
                  image={card.post.images[0] ?? card.artist.avatar}
                  title={card.post.lookName}
                  subtitle={describePostCard(card)}
                  saved
                  onToggleSave={() => togglePostSaved(card.post.id)}
                  onPress={() =>
                    router.push({ pathname: '/post/[postId]', params: { postId: card.post.id } })
                  }
                />
              </View>
            ))}
          </View>
        )
      ) : artists.length === 0 ? (
        <Empty
          title="No saved artists yet"
          message="Save artists from their profile to find them again quickly."
          onExplore={() => router.navigate('/explore')}
        />
      ) : (
        <View style={styles.list}>
          {artists.map((artist, index) => (
            <ArtistRow
              key={artist.id}
              avatar={artist.avatar}
              name={artist.name}
              accessibilityLabel={`${artist.name}, ${artist.specialty}`}
              showDivider={index < artists.length - 1}
              subtitle={
                <View style={styles.artistMeta}>
                  <AppText variant="bodyMd" color="textSecondary" numberOfLines={1}>
                    {artist.specialty}
                  </AppText>
                  <Rating value={artist.rating} reviewCount={artist.reviewCount} />
                </View>
              }
              trailing={
                <IconButton
                  icon="bookmark"
                  filled
                  selected
                  accessibilityLabel={`Remove ${artist.name} from saved`}
                  onPress={() => toggleArtistSaved(artist.id)}
                />
              }
              onPress={() =>
                router.push({ pathname: '/artist/[artistId]', params: { artistId: artist.id } })
              }
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

function Empty({ title, message, onExplore }: { title: string; message: string; onExplore: () => void }) {
  return (
    <View style={styles.empty}>
      <AppText variant="titleMd" align="center">
        {title}
      </AppText>
      <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.emptyText}>
        {message}
      </AppText>
      <Button label="Explore looks" variant="secondary" onPress={onExplore} style={styles.emptyAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: spacing.lg },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: layout.gutter,
    rowGap: spacing.xl,
    marginTop: spacing.xl,
  },
  list: { marginTop: spacing.md },
  artistMeta: { gap: spacing.xxs },
  empty: { alignItems: 'center', paddingTop: spacing.xxxl },
  emptyText: { marginTop: spacing.sm, maxWidth: 300 },
  emptyAction: { marginTop: spacing.xl, alignSelf: 'stretch' },
});
