import { createContext, useMemo, useState, type ReactNode } from 'react';

export type SavedContextValue = {
  savedPostIds: ReadonlySet<string>;
  isPostSaved: (postId: string) => boolean;
  togglePostSaved: (postId: string) => void;
};

export const SavedContext = createContext<SavedContextValue | null>(null);

/** In-memory saved looks for the demo session. The Saved screen arrives in Batch 4. */
export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedPostIds, setSavedPostIds] = useState<ReadonlySet<string>>(new Set());

  const value = useMemo<SavedContextValue>(
    () => ({
      savedPostIds,
      isPostSaved: (postId) => savedPostIds.has(postId),
      togglePostSaved: (postId) =>
        setSavedPostIds((current) => {
          const next = new Set(current);
          if (next.has(postId)) next.delete(postId);
          else next.add(postId);
          return next;
        }),
    }),
    [savedPostIds],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}
