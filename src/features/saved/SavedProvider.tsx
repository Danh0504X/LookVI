import { createContext, useMemo, useState, type ReactNode } from 'react';

import { mockSavedArtistIds, mockSavedPostIds } from '@/data/mock';

export type SavedContextValue = {
  /** Most recently saved first. */
  savedPostIds: readonly string[];
  /** Most recently saved first. */
  savedArtistIds: readonly string[];
  isPostSaved: (postId: string) => boolean;
  togglePostSaved: (postId: string) => void;
  isArtistSaved: (artistId: string) => boolean;
  toggleArtistSaved: (artistId: string) => void;
};

export const SavedContext = createContext<SavedContextValue | null>(null);

/** Removes the id if present, otherwise adds it to the front (newest first). */
const toggle = (ids: readonly string[], id: string): readonly string[] =>
  ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids];

/** In-memory saved looks and artists for the demo session (seeded with a few items). */
export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedPostIds, setSavedPostIds] = useState<readonly string[]>(mockSavedPostIds);
  const [savedArtistIds, setSavedArtistIds] = useState<readonly string[]>(mockSavedArtistIds);

  const value = useMemo<SavedContextValue>(
    () => ({
      savedPostIds,
      savedArtistIds,
      isPostSaved: (postId) => savedPostIds.includes(postId),
      togglePostSaved: (postId) => setSavedPostIds((current) => toggle(current, postId)),
      isArtistSaved: (artistId) => savedArtistIds.includes(artistId),
      toggleArtistSaved: (artistId) => setSavedArtistIds((current) => toggle(current, artistId)),
    }),
    [savedPostIds, savedArtistIds],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}
