import { PlaceholderScreen } from '@/components/layout';

import { useGoToEntry } from '../useGoToEntry';
import { useSession } from '../useSession';

/** TEMPORARY until the customer Profile screen (Batch 4). Keeps "Sign out" available. */
export function ProfilePlaceholderScreen() {
  const { customerProfile, account, signOut } = useSession();
  const goToEntry = useGoToEntry();
  const name = customerProfile?.name ?? account?.name;

  return (
    <PlaceholderScreen
      icon="person"
      title={name ?? 'Your profile'}
      message="Your profile and account settings are coming in a later demo build."
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
