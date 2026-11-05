import { useRouter } from 'expo-router';

/**
 * Clears the navigation stack and lets the root route decide where the user belongs
 * (see `getEntryRoute`). Call after any session change (sign in, setup done, sign out)
 * so the back gesture cannot return to a finished step.
 */
export function useGoToEntry(): () => void {
  const router = useRouter();
  return () => {
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace('/');
  };
}
