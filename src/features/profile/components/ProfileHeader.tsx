import { StyleSheet, View } from 'react-native';

import { AppText, Avatar, Icon } from '@/components/ui';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type Stat = { label: string; value: number };

type ProfileHeaderProps = {
  name: string;
  email: string;
  avatar: ImageRef;
  areaLabel: string | null;
  stats: readonly Stat[];
};

export function ProfileHeader({ name, email, avatar, areaLabel, stats }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar source={avatar} size={88} accessibilityLabel={`${name}'s photo`} />
      <AppText variant="headlineLg" align="center" accessibilityRole="header" style={styles.name}>
        {name}
      </AppText>
      <AppText variant="bodyMd" color="textSecondary">
        {email}
      </AppText>
      {areaLabel ? (
        <View style={styles.area}>
          <Icon name="location_on" size={16} color={colors.accent} />
          <AppText variant="labelMd" color="textSecondary">
            {areaLabel}
          </AppText>
        </View>
      ) : null}

      <View style={styles.stats}>
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            style={[styles.stat, index > 0 && styles.statDivider]}
            accessible
            accessibilityLabel={`${stat.value} ${stat.label}`}
          >
            <AppText variant="titleMd">{stat.value}</AppText>
            <AppText variant="labelMd" color="textMuted">
              {stat.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: spacing.lg },
  name: { marginTop: spacing.md },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
  },
  stats: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceMuted,
  },
  stat: { flex: 1, alignItems: 'center', gap: spacing.xxs },
  statDivider: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: colors.borderStrong },
});
