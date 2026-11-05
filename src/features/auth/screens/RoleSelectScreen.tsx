import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen, TopBar } from '@/components/layout';
import { Button, PageHeading, Wordmark } from '@/components/ui';
import type { UserRole } from '@/domain/models';
import { useSession } from '@/features/session';
import { spacing } from '@/theme';

import { RoleOption } from '../components/RoleOption';

/**
 * Role choice right after sign-in (confirmed product decision). Not in the Stitch exports;
 * designed with the same tokens and card language.
 */
export function RoleSelectScreen() {
  const router = useRouter();
  const { role: currentRole, chooseRole } = useSession();
  const [role, setRole] = useState<UserRole | null>(currentRole);

  const handleContinue = () => {
    if (!role) return;
    chooseRole(role);
    router.push(role === 'customer' ? '/onboarding/customer' : '/onboarding/artist');
  };

  return (
    <Screen
      header={<TopBar center={<Wordmark size="sm" />} />}
      footer={<Button label="Continue" onPress={handleContinue} disabled={!role} />}
    >
      <View style={styles.heading}>
        <PageHeading
          title="How will you use Lookvi?"
          subtitle="Choose how you want to start. You can sign out to switch later."
        />
      </View>
      <View style={styles.options} accessibilityRole="radiogroup">
        <RoleOption
          icon="search"
          title="I'm looking for an artist"
          description="Discover looks and book makeup at home."
          selected={role === 'customer'}
          onPress={() => setRole('customer')}
        />
        <RoleOption
          icon="brush"
          title="I'm a makeup artist"
          description="Show your work and receive at-home bookings."
          selected={role === 'artist'}
          onPress={() => setRole('artist')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  options: { gap: spacing.md },
});
