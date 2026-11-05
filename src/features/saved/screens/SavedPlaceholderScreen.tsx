import { PlaceholderScreen } from '@/components/layout';

import { useSaved } from '../useSaved';

/** TEMPORARY until the Saved screen (Batch 4). Reflects real saved state. */
export function SavedPlaceholderScreen() {
  const { savedPostIds } = useSaved();
  const count = savedPostIds.size;

  return (
    <PlaceholderScreen
      icon="bookmark"
      title={count > 0 ? `${count} saved ${count === 1 ? 'look' : 'looks'}` : 'Nothing saved yet'}
      message="Tap the heart on any look to save it. Your Saved collection is coming in a later demo build."
    />
  );
}
