import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText, Icon, Rating } from '@/components/ui';
import type { Artist } from '@/domain/models';
import { getAreaById } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';

type ArtistProfileHeaderProps = { artist: Artist };

export function ArtistProfileHeader({ artist }: ArtistProfileHeaderProps) {
  const area = getAreaById(artist.areaId);

  return (
    <View>
      <View style={styles.identity}>
        <Image
          source={artist.avatar}
          contentFit="cover"
          accessibilityLabel={`${artist.name}'s portrait`}
          style={styles.portrait}
        />
        <View style={styles.identityText}>
          <View style={styles.nameRow}>
            <AppText variant="displayMd" accessibilityRole="header" style={styles.name}>
              {artist.name}
            </AppText>
            {artist.verified ? (
              <Icon name="verified" filled size={20} color={colors.accent} style={styles.verified} />
            ) : null}
          </View>
          <Rating value={artist.rating} reviewCount={artist.reviewCount} countStyle="long" />
          <AppText variant="labelMd" color="textMuted" style={styles.completed}>
            {artist.completedBookings} completed bookings
          </AppText>
        </View>
      </View>

      <AppText variant="bodyLg" color="textSecondary" style={styles.bio}>
        {artist.bio}
      </AppText>

      {area ? (
        <View style={styles.areaRow}>
          <Icon name="location_on" size={18} color={colors.accent} />
          <AppText variant="bodyMd" color="textSecondary" style={styles.areaText}>
            Travels up to {artist.serviceRadiusKm} km from {area.name}, {area.city} · travel included
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const PORTRAIT = 96;

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  portrait: {
    width: PORTRAIT,
    height: PORTRAIT,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceSubtle,
  },
  identityText: { flex: 1, minWidth: 0, gap: spacing.xs },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  name: { flexShrink: 1 },
  verified: { marginLeft: spacing.xs },
  completed: { marginTop: spacing.xxs },
  bio: { marginTop: spacing.lg },
  areaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs, marginTop: spacing.md },
  areaText: { flex: 1 },
});
