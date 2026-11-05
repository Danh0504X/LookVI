import { useContext } from 'react';

import { SavedContext, type SavedContextValue } from './SavedProvider';

export function useSaved(): SavedContextValue {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used inside <SavedProvider>.');
  }
  return context;
}
