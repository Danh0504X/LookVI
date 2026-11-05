import type { Href } from 'expo-router';

import type { SessionState } from './sessionReducer';

/**
 * Where the user should be, given the session. Single source of truth for the
 * sign-in → role → setup sequence.
 */
export function getEntryRoute(session: SessionState): Href {
  if (!session.account) return '/welcome';
  if (!session.role) return '/role';
  if (session.role === 'customer' && !session.customerProfile) return '/onboarding/customer';
  if (session.role === 'artist' && !session.artistProfile) return '/onboarding/artist';
  if (session.role === 'customer') return '/home';
  // TEMPORARY until the artist dashboard (Batch 5).
  return '/coming-soon';
}
