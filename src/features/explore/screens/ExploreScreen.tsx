import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { LookCard } from '@/components/cards';
import { Screen } from '@/components/layout';
import { AppText } from '@/components/ui';
import { describePostCard, getPosts, toPostCards } from '@/features/catalog';
import { CustomerHeader } from '@/features/location';
import { useSaved } from '@/features/saved';
import { layout, spacing } from '@/theme';

import { ExploreListHeader } from '../components/ExploreListHeader';
import { applyFilter, filterKey, parseFilter } from '../services/discoveryFilters';

export function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ filter?: string }>();
  const { isPostSaved, togglePostSaved } = useSaved();
  const { width } = useWindowDimensions();
  // Fixed column width so an odd last card does not stretch across the row.
  const itemWidth = (width - layout.screenPadding * 2 - layout.gutter) / 2;

  // The active filter lives in the route params so Home and Search can deep-link into it.
  const filter = parseFilter(params.filter);
  const cards = toPostCards(applyFilter(getPosts(), filter));

  return (
    <Screen header={<CustomerHeader />} scroll={false} padded={false} bottomInset={false}>
      <FlatList
        data={cards}
        keyExtractor={(card) => card.post.id}
        numColumns={2}
        ListHeaderComponent={
          <ExploreListHeader
            activeFilter={filter}
            onSelectFilter={(next) => router.setParams({ filter: filterKey(next) })}
            onOpenSearch={() => router.push('/explore/search')}
          />
        }
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }}>
            <LookCard
              image={item.post.images[0] ?? item.artist.avatar}
              title={item.post.lookName}
              subtitle={describePostCard(item)}
              saved={isPostSaved(item.post.id)}
              onToggleSave={() => togglePostSaved(item.post.id)}
              onPress={() =>
                router.push({ pathname: '/post/[postId]', params: { postId: item.post.id } })
              }
            />
          </View>
        )}
        columnWrapperStyle={styles.columns}
        ItemSeparatorComponent={() => <View style={styles.rowGap} />}
        ListEmptyComponent={
          <AppText variant="bodyLg" color="textSecondary" align="center" style={styles.empty}>
            No looks in this category yet.
          </AppText>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xxl },
  columns: { paddingHorizontal: layout.screenPadding, gap: layout.gutter },
  rowGap: { height: spacing.xl },
  empty: { marginTop: spacing.xxl, paddingHorizontal: layout.screenPadding },
});
