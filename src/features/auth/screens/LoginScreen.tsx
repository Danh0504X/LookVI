import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen, TopBar } from '@/components/layout';
import { AppText, Button, Wordmark } from '@/components/ui';
import { useGoToEntry, useSession } from '@/features/session';
import { colors, spacing } from '@/theme';
import { showDemoNotice } from '@/utils/demoNotice';

const googleLogo = require('@/assets/images/google-logo.png');

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useSession();
  const goToEntry = useGoToEntry();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogle = async () => {
    setSigningIn(true);
    try {
      await signIn();
      goToEntry();
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <Screen
      scroll={false}
      header={
        <TopBar
          onBack={router.canGoBack() ? () => router.back() : undefined}
          center={<Wordmark size="sm" />}
        />
      }
      contentStyle={styles.content}
    >
      <View style={styles.intro}>
        <View style={styles.rule} />
        <AppText variant="displayMd" align="center" accessibilityRole="header">
          Welcome to Lookvi.
        </AppText>
        <AppText variant="bodyLg" color="textSecondary" align="center" style={styles.subtitle}>
          Sign in to discover your next look and connect with makeup artists near you.
        </AppText>
      </View>

      <Button
        variant="secondary"
        label="Continue with Google"
        leading={<Image source={googleLogo} style={styles.googleLogo} contentFit="contain" />}
        onPress={handleGoogle}
        disabled={signingIn}
      />
      <AppText variant="labelMd" color="textMuted" align="center" style={styles.terms}>
        By continuing, you agree to our{' '}
        <AppText
          variant="labelMd"
          style={styles.link}
          accessibilityRole="link"
          onPress={() => showDemoNotice('Terms of Service')}
        >
          Terms of Service
        </AppText>{' '}
        and{' '}
        <AppText
          variant="labelMd"
          style={styles.link}
          accessibilityRole="link"
          onPress={() => showDemoNotice('Privacy Policy')}
        >
          Privacy Policy
        </AppText>
        .
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: 'space-between' },
  intro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  rule: {
    width: 32,
    height: 1,
    backgroundColor: colors.borderStrong,
    marginBottom: spacing.xl,
  },
  subtitle: { marginTop: spacing.md, maxWidth: 320 },
  googleLogo: { width: 20, height: 20 },
  terms: { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  link: { color: colors.textSecondary, textDecorationLine: 'underline' },
});
