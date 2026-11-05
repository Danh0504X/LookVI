import { StyleSheet, View } from 'react-native';

import { AppText, SectionHeader } from '@/components/ui';
import type { PostCardData } from '@/features/catalog';
import { layout, spacing } from '@/theme';

import type { ArtistResult, SearchResults as Results, SearchTab, StyleResult } from '../services/searchService';
import { ArtistList, PostList, StyleGrid } from './ResultLists';

const ALL_TAB_LIMIT = { styles: 2, posts: 3, artists: 3 } as const;

type SearchResultsProps = {
  results: Results;
  tab: SearchTab;
  query: string;
  onChangeTab: (tab: SearchTab) => void;
  onSelectStyle: (result: StyleResult) => void;
  onSelectPost: (card: PostCardData) => void;
  onSelectArtist: (result: ArtistResult) => void;
};

export function SearchResults({
  results,
  tab,
  query,
  onChangeTab,
  onSelectStyle,
  onSelectPost,
  onSelectArtist,
}: SearchResultsProps) {
  const label = query.trim() ? `“${query.trim()}”` : 'this search';

  if (tab === 'all') {
    const nothing =
      results.styles.length === 0 && results.posts.length === 0 && results.artists.length === 0;
    if (nothing) {
      return (
        <Empty
          title={`No results for ${label}`}
          hint="Try a style like Soft Glam, an occasion like Party Makeup, or an artist's name."
        />
      );
    }
    return (
      <View style={styles.container}>
        {results.styles.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title="Styles"
              editorial
              action={{ label: 'See all', onPress: () => onChangeTab('styles') }}
            />
            <StyleGrid items={results.styles.slice(0, ALL_TAB_LIMIT.styles)} onSelect={onSelectStyle} />
          </View>
        ) : null}
        {results.posts.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title="Posts"
              editorial
              action={{ label: 'See all', onPress: () => onChangeTab('posts') }}
            />
            <PostList posts={results.posts.slice(0, ALL_TAB_LIMIT.posts)} onSelect={onSelectPost} />
          </View>
        ) : null}
        {results.artists.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader
              title="Artists"
              editorial
              action={{ label: 'See all', onPress: () => onChangeTab('artists') }}
            />
            <ArtistList
              artists={results.artists.slice(0, ALL_TAB_LIMIT.artists)}
              showPrice
              onSelect={onSelectArtist}
            />
          </View>
        ) : null}
      </View>
    );
  }

  if (tab === 'styles') {
    return results.styles.length > 0 ? (
      <View style={styles.container}>
        <StyleGrid items={results.styles} onSelect={onSelectStyle} />
      </View>
    ) : (
      <Empty title={`No styles match ${label}`} />
    );
  }

  if (tab === 'posts') {
    return results.posts.length > 0 ? (
      <View style={styles.container}>
        <PostList posts={results.posts} onSelect={onSelectPost} />
      </View>
    ) : (
      <Empty title={`No posts match ${label}`} />
    );
  }

  return results.artists.length > 0 ? (
    <View style={styles.container}>
      <ArtistList artists={results.artists} showPrice={false} onSelect={onSelectArtist} />
    </View>
  ) : (
    <Empty title={`No artists match ${label}`} />
  );
}

function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <View style={styles.empty}>
      <AppText variant="titleMd" align="center">
        {title}
      </AppText>
      {hint ? (
        <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.hint}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.md },
  section: { marginBottom: spacing.xxl },
  empty: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.xxxl },
  hint: { marginTop: spacing.sm },
});
