import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Screen, TopBar } from '@/components/layout';
import { AppText, Button, Icon, IconButton } from '@/components/ui';
import { getAreaById, getPostsByArtist, useServices } from '@/features/catalog';
import { colors, radii, spacing } from '@/theme';
import { formatDuration } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { useArtistIdentity } from '../hooks/useArtistIdentity';

/** The artist's packages and rates. */
export function MyServicesScreen() {
  const router = useRouter();
  const identity = useArtistIdentity();
  const services = useServices();

  if (!identity) return null;
  const { profile } = identity;
  const variants = services.find((service) => service.artistId === profile.artistId)?.variants ?? [];
  const posts = getPostsByArtist(profile.artistId);
  const area = getAreaById(profile.areaId);

  return (
    <Screen
      header={
        <TopBar
          onBack={() => router.back()}
          center={<AppText variant="titleMd">Services & rates</AppText>}
        />
      }
      footer={
        <Button label="Add a package" trailingIcon="add" onPress={() => router.push('/services/new')} />
      }
    >
      <View style={styles.base}>
        <Icon name="location_on" size={20} color={colors.accent} />
        <AppText variant="bodyMd" color="textSecondary" style={styles.flex}>
          Prices include travel within {profile.serviceRadiusKm} km of {area?.name ?? 'your area'}.
          Changes apply to new requests; existing bookings keep their price.
        </AppText>
      </View>

      {variants.length === 0 ? (
        <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.empty}>
          No packages yet. Add one so customers can book you.
        </AppText>
      ) : (
        <View style={styles.list}>
          {variants.map((variant) => {
            const linked = posts.filter((post) => post.eligibleVariantIds.includes(variant.id)).length;
            return (
              <View key={variant.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.flex}>
                    <AppText variant="headlineSm">{variant.name}</AppText>
                    <AppText variant="bodyMd" color="textSecondary" style={styles.description}>
                      {variant.description}
                    </AppText>
                  </View>
                  <IconButton
                    icon="edit"
                    variant="surface"
                    accessibilityLabel={`Edit ${variant.name}`}
                    onPress={() =>
                      router.push({ pathname: '/services/edit/[variantId]', params: { variantId: variant.id } })
                    }
                  />
                </View>
                <View style={styles.meta}>
                  <AppText variant="labelMd" color="textSecondary" style={styles.flex}>
                    {formatDuration(variant.durationMinutes)} · {linked} {linked === 1 ? 'look' : 'looks'}
                  </AppText>
                  <AppText variant="priceLg">{formatPrice(variant.priceVnd)}</AppText>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  base: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    marginTop: spacing.sm,
  },
  list: { gap: spacing.lg, marginTop: spacing.xl, paddingBottom: spacing.lg },
  card: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  cardHeader: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  description: { marginTop: spacing.xs },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  empty: { marginTop: spacing.xxxl },
});
