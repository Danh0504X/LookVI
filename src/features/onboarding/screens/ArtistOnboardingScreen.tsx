import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen, TopBar } from '@/components/layout';
import { AppText, Avatar, Button, Icon, PageHeading, SelectField, TextField } from '@/components/ui';
import { mockArtistProfileDraft } from '@/data/mock';
import { BIO_MAX_LENGTH } from '@/domain/models';
import { useGoToEntry, useSession } from '@/features/session';
import { colors, spacing } from '@/theme';
import { showDemoNotice } from '@/utils/demoNotice';

import { ServiceRadiusPicker } from '../components/ServiceRadiusPicker';
import { useArtistProfileForm } from '../hooks/useArtistProfileForm';
import { getAreaOptions } from '../services/areaService';

export function ArtistOnboardingScreen() {
  const { account } = useSession();
  // Session is in-memory; after a reload there is no account, so restart the flow.
  if (!account) return <Redirect href="/" />;
  return <ArtistOnboardingForm />;
}

function ArtistOnboardingForm() {
  const router = useRouter();
  const { artistProfile, completeArtistSetup } = useSession();
  const goToEntry = useGoToEntry();
  const initial = artistProfile ?? mockArtistProfileDraft;
  const form = useArtistProfileForm(initial);

  const handleContinue = () => {
    completeArtistSetup(form.toProfile());
    goToEntry();
  };

  return (
    <Screen
      header={<TopBar onBack={router.canGoBack() ? () => router.back() : undefined} />}
      footer={
        <Button
          label="Continue to Dashboard"
          trailingIcon="arrow_forward"
          onPress={handleContinue}
          disabled={!form.isValid}
        />
      }
    >
      <PageHeading
        eyebrow="Artist profile"
        title="Create your artist profile"
        subtitle="Show your work and start receiving at-home bookings across Da Nang."
      />

      <View style={styles.photoBlock}>
        <Avatar source={initial.avatar} size={112} accessibilityLabel="Profile photo" />
        <Button
          variant="ghost"
          label="Change photo"
          onPress={() => showDemoNotice('Changing your photo')}
        />
        <AppText variant="labelMd" color="textMuted">
          A clear, well-lit portrait works best.
        </AppText>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Display name"
          value={form.displayName}
          onChangeText={form.setDisplayName}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <TextField
          label="Short bio"
          value={form.bio}
          onChangeText={form.setBio}
          multiline
          maxLength={BIO_MAX_LENGTH}
          showCounter
          helper="Clients see this when browsing artists."
        />
        <SelectField
          label="Primary location"
          value={form.areaId}
          options={getAreaOptions()}
          onChange={form.setAreaId}
          leadingIcon="location_on"
        />
        <ServiceRadiusPicker
          value={form.serviceRadiusKm}
          onChange={form.setServiceRadiusKm}
          coveredAreas={form.coveredAreas}
        />
        <View style={styles.policyRow}>
          <Icon name="verified_user" size={20} color={colors.textMuted} />
          <AppText variant="bodyMd" color="textSecondary" style={styles.policyText}>
            No upfront fees. You keep full control over your rates and availability.
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoBlock: { alignItems: 'center', marginTop: spacing.xxl },
  fields: { marginTop: spacing.xl, gap: spacing.xl, paddingBottom: spacing.xl },
  policyRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  policyText: { flex: 1 },
});
