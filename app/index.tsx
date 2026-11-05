import { Redirect } from 'expo-router';

import { getEntryRoute, useSession } from '@/features/session';

/** Entry point: sends the user to the right step of the sign-in / setup flow. */
export default function Index() {
  const session = useSession();
  return <Redirect href={getEntryRoute(session)} />;
}
