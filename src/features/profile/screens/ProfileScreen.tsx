import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { AppText, Badge, Button, Icon, ListRow, OptionSheet } from '@/components/ui';
import { useCustomerBookings } from '@/features/bookings';
import { getAreaById, getAreaOptions, getArtistById } from '@/features/catalog';
import { useSaved } from '@/features/saved';
import { useGoToEntry, useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';
import { formatRelativeDay, formatTime } from '@/utils/dateTime';
import { showDemoNotice } from '@/utils/demoNotice';
import { formatArea } from '@/utils/formatArea';

import { NextAppointmentCard } from '../components/NextAppointmentCard';
import { ProfileHeader } from '../components/ProfileHeader';

export function ProfileScreen() {
  const router = useRouter();
  const goToEntry = useGoToEntry();
  const { account, customerProfile, chooseRole, signOut, updateCustomerArea } = useSession();
  const bookings = useCustomerBookings();
  const { savedPostIds, savedArtistIds } = useSaved();
  const [areaSheetOpen, setAreaSheetOpen] = useState(false);

  if (!account) return null;

  const area = customerProfile?.areaId ? getAreaById(customerProfile.areaId) : undefined;
  const activeCount = bookings.pending.length + bookings.upcoming.length;
  const completedCount = bookings.history.filter((booking) => booking.status === 'COMPLETED').length;
  const next = bookings.upcoming[0];
  const nextArtist = next ? getArtistById(next.artistId) : undefined;

  const switchToArtist = () => {
    chooseRole('artist');
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
      <ProfileHeader
        name={customerProfile?.name ?? account.name}
        email={account.email}
        avatar={account.avatar}
        areaLabel={area ? formatArea(area) : null}
        stats={[
          { label: 'Completed', value: completedCount },
          { label: 'Saved looks', value: savedPostIds.length },
          { label: 'Saved artists', value: savedArtistIds.length },
        ]}
      />

      {next && nextArtist ? (
        <View style={styles.section}>
          <NextAppointmentCard
            when={`${formatRelativeDay(next.startsAt)}, ${formatTime(next.startsAt)}`}
            description={`${next.variantName} with ${nextArtist.name}`}
            onPress={() =>
              router.push({ pathname: '/booking/[bookingId]', params: { bookingId: next.id } })
            }
          />
        </View>
      ) : null}

      <SectionLabel title="Activity" />
      <ListRow
        icon="calendar_today"
        title="My bookings"
        subtitle="Requests, appointments and history"
        trailing={activeCount > 0 ? <Badge label={`${activeCount} active`} tone="accent" /> : undefined}
        onPress={() => router.navigate('/bookings')}
      />
      <ListRow
        icon="bookmark"
        title="Saved looks & artists"
        subtitle={`${savedPostIds.length + savedArtistIds.length} items`}
        onPress={() => router.navigate('/saved')}
        showDivider={false}
      />

      <SectionLabel title="Account" />
      <ListRow
        icon="badge"
        title="Personal information"
        subtitle={`${customerProfile?.name ?? account.name} · ${account.email}`}
        onPress={() => showDemoNotice('Editing your details')}
      />
      <ListRow
        icon="location_on"
        title="Your area"
        subtitle={area ? formatArea(area) : 'Not set'}
        onPress={() => setAreaSheetOpen(true)}
      />
      <ListRow
        icon="notifications"
        title="Notifications"
        subtitle="Booking updates and reminders"
        onPress={() => showDemoNotice('Notification settings')}
        showDivider={false}
      />

      <View style={[styles.section, styles.artistCard]}>
        <View style={styles.artistTitle}>
          <Icon name="brush" size={20} color={colors.accent} />
          <AppText variant="titleMd">Are you a makeup artist?</AppText>
        </View>
        <AppText variant="bodyMd" color="textSecondary">
          Show your work and receive at-home booking requests in Da Nang.
        </AppText>
        <Button label="Switch to artist mode" variant="secondary" onPress={switchToArtist} />
      </View>

      <SectionLabel title="Support" />
      <ListRow icon="help" title="Help & FAQ" onPress={() => showDemoNotice('Help & FAQ')} />
      <ListRow
        icon="shield"
        title="Terms & privacy"
        onPress={() => showDemoNotice('Terms & privacy')}
      />
      <ListRow icon="logout" title="Log out" destructive onPress={confirmLogOut} showDivider={false} />

      <AppText variant="labelMd" color="textMuted" align="center" style={styles.version}>
        Lookvi v{Constants.expoConfig?.version ?? '—'} · Demo
      </AppText>

      <OptionSheet
        visible={areaSheetOpen}
        title="Your area"
        options={getAreaOptions()}
        selectedValue={customerProfile?.areaId ?? null}
        onSelect={updateCustomerArea}
        onClose={() => setAreaSheetOpen(false)}
      />
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
  section: { marginTop: spacing.xl },
  sectionLabel: { marginTop: spacing.xxl, marginBottom: spacing.xs },
  artistCard: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  artistTitle: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  version: { marginTop: spacing.xxl },
});
