import { Redirect, Stack } from 'expo-router';

import { SavedProvider } from '@/features/saved';
import { SearchHistoryProvider } from '@/features/search';
import { useSession } from '@/features/session';
import { colors } from '@/theme';

/** Customer area: only reachable with a finished customer setup. */
export default function CustomerLayout() {
  const { account, role, customerProfile } = useSession();
  if (!account || role !== 'customer' || !customerProfile) return <Redirect href="/" />;

  return (
    <SavedProvider>
      <SearchHistoryProvider>
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
        />
      </SearchHistoryProvider>
    </SavedProvider>
  );
}
