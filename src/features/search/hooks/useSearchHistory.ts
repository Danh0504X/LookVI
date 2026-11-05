import { useContext } from 'react';

import { SearchHistoryContext, type SearchHistoryContextValue } from '../SearchHistoryProvider';

export function useSearchHistory(): SearchHistoryContextValue {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used inside <SearchHistoryProvider>.');
  }
  return context;
}
