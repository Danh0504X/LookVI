import { createContext, useMemo, useState, type ReactNode } from 'react';

import { mockRecentSearches } from '@/data/mock';

const MAX_RECENT = 8;

export type SearchHistoryContextValue = {
  recentSearches: readonly string[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
};

export const SearchHistoryContext = createContext<SearchHistoryContextValue | null>(null);

/** Recent searches for the demo session (seeded from the Stitch design, in memory). */
export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [recentSearches, setRecentSearches] = useState<readonly string[]>(mockRecentSearches);

  const value = useMemo<SearchHistoryContextValue>(
    () => ({
      recentSearches,
      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        setRecentSearches((current) =>
          [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
            0,
            MAX_RECENT,
          ),
        );
      },
      removeRecentSearch: (query) =>
        setRecentSearches((current) => current.filter((item) => item !== query)),
      clearRecentSearches: () => setRecentSearches([]),
    }),
    [recentSearches],
  );

  return <SearchHistoryContext.Provider value={value}>{children}</SearchHistoryContext.Provider>;
}
