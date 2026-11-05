import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { iconFontAssets } from '@/components/ui';
import { BookingsProvider } from '@/features/bookings';
import { MessagesProvider } from '@/features/messaging';
import { SavedProvider } from '@/features/saved';
import { SessionProvider } from '@/features/session';
import { colors, fontAssets } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({ ...fontAssets, ...iconFontAssets });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) SplashScreen.hide();
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      {/* Bookings and chats live outside the session so both roles share them (demo). */}
      <BookingsProvider>
        <MessagesProvider>
          <SessionProvider>
            <SavedProvider>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.background },
                }}
              />
            </SavedProvider>
          </SessionProvider>
        </MessagesProvider>
      </BookingsProvider>
    </SafeAreaProvider>
  );
}
