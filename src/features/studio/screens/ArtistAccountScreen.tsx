import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Avatar, Icon, ListRow, Rating } from '@/components/ui';
import { getAreaById } from '@/features/catalog';
import { useGoToEntry, useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';
import { showDemoNotice } from '@/utils/demoNotice';

import { useArtistIdentity } from '../hooks/useArtistIdentity';

/** Artist "Profile" tab (no Stitch design: built from the customer profile patterns). */
export function ArtistAccountScreen() {
  const router = useRouter();
  const goToEntry = useGoToEntry();
  const identity = useArtistIdentity();
  const { account, chooseRole, signOut } = useSession();

  if (!identity || !account) return null;
  const { profile, artist } = identity;
  const area = getAreaById(profile.areaId);

  const switchToCustomer = () => {
    chooseRole('customer');
    goToEntry();
  };

  const confirmLogOut = () =>
    Alert.alert('Log out?', 'You can sign back in with the demo Google account.', [
      { text: 'Stay', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          signOut();
          goToEntry();
        },
      },
    ]);

  return (
    <Screen bottomInset={false}>
      <View style={styles.header}>
        <Avatar source={profile.avatar} name={profile.displayName} size={88} />
        <View style={styles.nameRow}>
          <AppText variant="headlineLg" accessibilityRole="header">
            {profile.displayName}
          </AppText>
          {artist?.verified ? <Icon name="verified" filled size={20} color={colors.accent} /> : null}
        </View>
        {artist ? <Rating value={artist.rating} reviewCount={artist.reviewCount} countStyle="long" /> : null}
        <View style={styles.area}>
          <Icon name="location_on" size={16} color={colors.accent} />
          <AppText variant="labelMd" color="textSecondary">
            {area?.name ?? 'Da Nang'} · up to {profile.serviceRadiusKm} km
          </AppText>
        </View>
        <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.bio}>
          {profile.bio}
        </AppText>
      </View>

      <SectionLabel title="Business" />
      <ListRow
        icon="sell"
        title="Services & rates"
        subtitle="Packages, prices and durations"
        onPress={() => router.push('/services')}
      />
      <ListRow
        icon="badge"
        title="Edit profile"
        subtitle="Name, bio, area and service radius"
        onPress={() => router.push('/onboarding/artist')}
        showDivider={false}
      />

      <SectionLabel title="Account" />
      <ListRow
        icon="swap_horiz"
        title="Switch to customer mode"
        subtitle="Browse looks and book as a customer"
        onPress={switchToCustomer}
      />
      <ListRow icon="help" title="Help & FAQ" onPress={() => showDemoNotice('Help & FAQ')} />
      <ListRow icon="logout" title="Log out" destructive onPress={confirmLogOut} showDivider={false} />
    </Screen>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <AppText variant="labelSm" color="textMuted" uppercase style={styles.sectionLabel}>
      {title}
    </AppText>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: spacing.xl, gap: spacing.sm },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
  },
  bio: { marginTop: spacing.sm, maxWidth: 340 },
  sectionLabel: { marginTop: spacing.xxl, marginBottom: spacing.xs },
});
