import { createContext, useMemo, useState, type ReactNode } from 'react';

export type SavedContextValue = {
  savedPostIds: ReadonlySet<string>;
  savedArtistIds: ReadonlySet<string>;
  isPostSaved: (postId: string) => boolean;
  togglePostSaved: (postId: string) => void;
  isArtistSaved: (artistId: string) => boolean;
  toggleArtistSaved: (artistId: string) => void;
};

export const SavedContext = createContext<SavedContextValue | null>(null);

const toggle = (set: ReadonlySet<string>, id: string): ReadonlySet<string> => {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

/** In-memory saved looks and artists for the demo session. The Saved screen arrives in Batch 4. */
export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedPostIds, setSavedPostIds] = useState<ReadonlySet<string>>(new Set());
  const [savedArtistIds, setSavedArtistIds] = useState<ReadonlySet<string>>(new Set());

  const value = useMemo<SavedContextValue>(
    () => ({
      savedPostIds,
      savedArtistIds,
      isPostSaved: (postId) => savedPostIds.has(postId),
      togglePostSaved: (postId) => setSavedPostIds((current) => toggle(current, postId)),
      isArtistSaved: (artistId) => savedArtistIds.has(artistId),
      toggleArtistSaved: (artistId) => setSavedArtistIds((current) => toggle(current, artistId)),
    }),
    [savedPostIds, savedArtistIds],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}
