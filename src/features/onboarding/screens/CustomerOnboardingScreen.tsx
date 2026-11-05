import { Redirect, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen, TopBar } from '@/components/layout';
import { AppText, Avatar, Button, PageHeading, SelectField, TextField, Wordmark } from '@/components/ui';
import type { Account } from '@/domain/models';
import { useGoToEntry, useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';

import { useCustomerProfileForm } from '../hooks/useCustomerProfileForm';
import { getAreaOptions } from '@/features/catalog';

export function CustomerOnboardingScreen() {
  const { account } = useSession();
  // Session is in-memory; after a reload there is no account, so restart the flow.
  if (!account) return <Redirect href="/" />;
  return <CustomerOnboardingForm account={account} />;
}

function CustomerOnboardingForm({ account }: { account: Account }) {
  const router = useRouter();
  const { completeCustomerSetup } = useSession();
  const goToEntry = useGoToEntry();
  const form = useCustomerProfileForm(account.name);

  const handleContinue = () => {
    completeCustomerSetup(form.toProfile());
    goToEntry();
  };

  const handleSkip = () => {
    completeCustomerSetup({ name: account.name, areaId: null });
    goToEntry();
  };

  return (
    <Screen
      header={
        <TopBar
          onBack={router.canGoBack() ? () => router.back() : undefined}
          center={<Wordmark size="sm" />}
        />
      }
      footer={
        <View>
          <Button
            label="Continue to Explore"
            trailingIcon="arrow_forward"
            onPress={handleContinue}
            disabled={!form.isValid}
          />
          <Button label="Skip for now" variant="ghost" onPress={handleSkip} />
        </View>
      }
    >
      <View style={styles.heading}>
        <PageHeading
          title="Make Lookvi yours."
          subtitle="Set up your details so artists can personalise your appointments."
        />
      </View>

      <View style={styles.avatarBlock}>
        <Avatar source={account.avatar} size={104} accessibilityLabel={`${account.name}'s photo`} />
        <View style={styles.sourceRow}>
          <View style={styles.dot} />
          <AppText variant="labelMd" color="textSecondary">
            Imported from Google
          </AppText>
        </View>
      </View>

      <View style={styles.fields}>
        <TextField
          label="Your name"
          value={form.name}
          onChangeText={form.setName}
          autoComplete="name"
          textContentType="name"
          autoCapitalize="words"
          returnKeyType="done"
          trailingIcon={form.nameIsValid ? 'check_circle' : undefined}
        />
        <SelectField
          label="Location"
          value={form.areaId}
          options={getAreaOptions()}
          onChange={form.setAreaId}
          placeholder="Select your area"
          leadingIcon="location_on"
          helper="Shows makeup artists who travel to your home or stay."
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { paddingTop: spacing.sm },
  avatarBlock: { alignItems: 'center', marginTop: spacing.xxl },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  dot: { width: 6, height: 6, borderRadius: radii.full, backgroundColor: colors.accent },
  fields: { marginTop: spacing.xxl, gap: spacing.xl, paddingBottom: spacing.xl },
});
