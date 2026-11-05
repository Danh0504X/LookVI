import { Redirect, Stack } from 'expo-router';

import { SearchHistoryProvider } from '@/features/search';
import { useSession } from '@/features/session';
import { colors } from '@/theme';

/** Customer area: only reachable with a finished customer setup. */
export default function CustomerLayout() {
  const { account, role, customerProfile } = useSession();
  if (!account || role !== 'customer' || !customerProfile) return <Redirect href="/" />;

  return (
    <SearchHistoryProvider>
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
        >
          {/* The request is already sent: no swipe back into the form. */}
          <Stack.Screen name="booking/[bookingId]/sent" options={{ gestureEnabled: false }} />
        </Stack>
    </SearchHistoryProvider>
  );
}
