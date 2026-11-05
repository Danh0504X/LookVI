import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlaceholderScreen } from '@/components/layout';
import { IconButton } from '@/components/ui';
import { getPostById, toPostCard, type PostCardData } from '@/features/catalog';
import { useSaved } from '@/features/saved';
import { colors, layout, spacing } from '@/theme';

import { LookInfoPanel } from '../components/LookInfoPanel';
import { PageDots } from '../components/PageDots';

/** Full-screen, image-first look detail. One screen for every post (keyed by `postId`). */
export function LookDetailScreen() {
  const router = useRouter();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const post = postId ? getPostById(postId) : undefined;
  const card = post ? toPostCard(post) : null;

  if (!card) {
    return (
      <PlaceholderScreen
        icon="image_not_supported"
        title="Look not found"
        message="This look is no longer available."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return <LookDetail card={card} />;
}

function LookDetail({ card }: { card: PostCardData }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isPostSaved, togglePostSaved } = useSaved();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [page, setPage] = useState(0);
  const { post } = card;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <View style={styles.root} onLayout={handleLayout}>
      <StatusBar style="light" />
      {size.width > 0 ? (
        <FlatList
          data={post.images}
          keyExtractor={(_, index) => String(index)}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) =>
            setPage(Math.round(event.nativeEvent.contentOffset.x / size.width))
          }
          renderItem={({ item, index }) => (
            <Image
              source={item}
              contentFit="cover"
              transition={150}
              accessibilityLabel={`${post.lookName}, photo ${index + 1}`}
              style={{ width: size.width, height: size.height }}
            />
          )}
        />
      ) : null}

      <View style={[styles.topBar, { top: insets.top + spacing.sm }]}>
        <IconButton
          icon="arrow_back"
          variant="overlay"
          accessibilityLabel="Back"
          onPress={() => router.back()}
        />
        <PageDots count={post.images.length} index={page} />
        <View style={styles.topBarSpacer} />
      </View>

      <LookInfoPanel
        card={card}
        saved={isPostSaved(post.id)}
        bottomInset={insets.bottom}
        onToggleSave={() => togglePostSaved(post.id)}
        onOpenArtist={() =>
          router.push({ pathname: '/artist/[artistId]', params: { artistId: card.artist.id } })
        }
        onBook={() =>
          router.push({
            pathname: '/book/[artistId]',
            params: { artistId: card.artist.id, postId: post.id },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  topBar: {
    position: 'absolute',
    left: layout.screenPadding,
    right: layout.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarSpacer: { width: 44 },
});
