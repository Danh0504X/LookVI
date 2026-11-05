import { Redirect, Stack } from 'expo-router';

import { useSession } from '@/features/session';
import { colors } from '@/theme';

/** Artist area: only reachable with a finished artist setup. */
export default function ArtistLayout() {
  const { account, role, artistProfile } = useSession();
  if (!account || role !== 'artist' || !artistProfile) return <Redirect href="/" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
    />
  );
}
