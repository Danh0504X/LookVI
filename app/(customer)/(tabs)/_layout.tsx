import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/ui';
import { colors, fontFamilies } from '@/theme';

/** Outlined icon, filled when the tab is active (as in the Stitch tab bars). */
function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <Icon
      name={name}
      filled={focused}
      color={focused ? colors.textPrimary : colors.textMuted}
      size={24}
    />
  );
}

const tabIcon = (name: IconName) =>
  function TabBarIcon({ focused }: { focused: boolean }) {
    return <TabIcon name={name} focused={focused} />;
  };

export default function CustomerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.bar,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: tabIcon('explore') }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved', tabBarIcon: tabIcon('bookmark') }} />
      <Tabs.Screen
        name="bookings"
        options={{ title: 'Bookings', tabBarIcon: tabIcon('calendar_today') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: tabIcon('account_circle') }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
  },
  label: { fontFamily: fontFamilies.sansMedium, fontSize: 11 },
});
