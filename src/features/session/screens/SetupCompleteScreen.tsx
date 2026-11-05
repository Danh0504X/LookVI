import { PlaceholderScreen } from '@/components/layout';

import { useGoToEntry } from '../useGoToEntry';
import { useSession } from '../useSession';

/**
 * TEMPORARY end of the Batch 1 flow. Replaced by the customer tabs (Batch 2) and the
 * artist dashboard (Batch 5).
 */
export function SetupCompleteScreen() {
  const { role, customerProfile, artistProfile, account, signOut } = useSession();
  const goToEntry = useGoToEntry();

  const name =
    role === 'artist' ? artistProfile?.displayName : (customerProfile?.name ?? account?.name);

  return (
    <PlaceholderScreen
      icon="check"
      title={name ? `You're all set, ${name}.` : "You're all set."}
      message={
        role === 'artist'
          ? 'Your artist dashboard is coming in a later demo build.'
          : 'Home, Explore and Search are coming in the next demo build.'
      }
      action={{
        label: 'Sign out',
        onPress: () => {
          signOut();
          goToEntry();
        },
      }}
    />
  );
}
