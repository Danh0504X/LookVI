import { Stack } from 'expo-router';

import { colors } from '@/theme';

/** Explore tab stack: grid → search (search keeps the tab bar, as in Stitch). */
export default function ExploreStackLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
    />
  );
}
