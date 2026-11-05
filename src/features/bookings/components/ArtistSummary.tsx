import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Icon, Rating } from '@/components/ui';
import type { Artist } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type ArtistSummaryProps = {
  artist: Artist;
  /** Optional right-side action (e.g. Message). */
  action?: ReactNode;
};

/** Compact artist identity used across the booking screens. */
export function ArtistSummary({ artist, action }: ArtistSummaryProps) {
  return (
    <View style={styles.row}>
      <Image source={artist.avatar} contentFit="cover" style={styles.avatar} />
      <View style={styles.text}>
        <View style={styles.nameRow}>
          <AppText variant="titleMd" numberOfLines={1} style={styles.name}>
            {artist.name}
          </AppText>
          {artist.verified ? (
            <Icon name="verified" filled size={16} color={colors.accent} />
          ) : null}
        </View>
        <Rating value={artist.rating} reviewCount={artist.reviewCount} countStyle="long" />
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 52, height: 52, borderRadius: radii.full, backgroundColor: colors.surfaceSubtle },
  text: { flex: 1, minWidth: 0, gap: spacing.xxs },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  name: { flexShrink: 1 },
});
