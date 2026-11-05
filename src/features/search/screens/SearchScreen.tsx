import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, View } from 'react-native';

import { Screen } from '@/components/layout';
import { exploreHref } from '@/features/explore';
import { showDemoNotice } from '@/utils/demoNotice';

import { SearchHeader } from '../components/SearchHeader';
import { SearchResults } from '../components/SearchResults';
import { SearchResultTabs } from '../components/SearchResultTabs';
import { SearchSuggestions } from '../components/SearchSuggestions';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { browseCatalog, isSearchTab, searchCatalog, type SearchTab } from '../services/searchService';

/**
 * One search feature covering every Stitch search state: discovery (empty query) and
 * results with All / Styles / Posts / Artists tabs that share the same query.
 */
export function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const history = useSearchHistory();

  // Opened from "View all" on Home: browse a tab without typing.
  const browseTab = isSearchTab(params.tab) ? params.tab : null;
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<SearchTab>(browseTab ?? 'all');

  const hasQuery = query.trim().length > 0;
  const showResults = hasQuery || browseTab !== null;
  const results = hasQuery ? searchCatalog(query) : browseCatalog();

  const commitQuery = (value = query) => {
    history.addRecentSearch(value);
    Keyboard.dismiss();
  };

  const runSearch = (value: string) => {
    setQuery(value);
    setTab('all');
    commitQuery(value);
  };

  return (
    <Screen
      padded={false}
      bottomInset={false}
      header={
        <View>
          <SearchHeader
            query={query}
            onChangeQuery={setQuery}
            onSubmit={() => commitQuery()}
            onBack={() => router.back()}
            onOpenFilters={() => showDemoNotice('Search filters')}
            autoFocus={browseTab === null}
          />
          {showResults ? <SearchResultTabs active={tab} onChange={setTab} /> : null}
        </View>
      }
    >
      {showResults ? (
        <SearchResults
          results={results}
          tab={tab}
          query={query}
          onChangeTab={setTab}
          onSelectStyle={(result) => {
            commitQuery();
            router.navigate(exploreHref({ kind: 'style', styleId: result.style.id }));
          }}
          onSelectPost={(card) => {
            commitQuery();
            router.push({ pathname: '/post/[postId]', params: { postId: card.post.id } });
          }}
          onSelectArtist={() => {
            commitQuery();
            showDemoNotice('Artist profiles');
          }}
        />
      ) : (
        <SearchSuggestions
          recentSearches={history.recentSearches}
          onSelect={runSearch}
          onRemoveRecent={history.removeRecentSearch}
          onClearRecent={history.clearRecentSearches}
        />
      )}
    </Screen>
  );
}
