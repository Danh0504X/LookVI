import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Button, PageHeading, Wordmark } from '@/components/ui';
import { fontFamilies, spacing } from '@/theme';

import { WelcomeCollage } from '../components/WelcomeCollage';

export function WelcomeScreen() {
  const router = useRouter();
  const goToLogin = () => router.push('/login');

  return (
    <Screen>
      <View style={styles.brand}>
        <Wordmark size="lg" />
      </View>

      <WelcomeCollage />

      <View style={styles.heading}>
        <PageHeading
          size="lg"
          eyebrow="At-home makeup"
          title={
            <>
              Your next look{'\n'}
              <AppText variant="displayLg" style={styles.italic}>
                starts here.
              </AppText>
            </>
          }
          subtitle="Discover makeup looks you love. Find your artist. Book at your doorstep."
        />
      </View>

      <View style={styles.spacer} />

      <Button label="Get Started" trailingIcon="arrow_forward" onPress={goToLogin} />
      <View style={styles.signInRow}>
        <AppText variant="bodyMd" color="textSecondary">
          Already have an account?
        </AppText>
        <AppText
          variant="labelLg"
          onPress={goToLogin}
          accessibilityRole="link"
          suppressHighlighting
          style={styles.signInLink}
        >
          Sign in
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { paddingTop: spacing.md, paddingBottom: spacing.xl },
  heading: { marginTop: spacing.xxl },
  italic: { fontFamily: fontFamilies.serifItalic },
  spacer: { flexGrow: 1, minHeight: spacing.xxl },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  signInLink: { paddingVertical: spacing.md, textDecorationLine: 'underline' },
});
