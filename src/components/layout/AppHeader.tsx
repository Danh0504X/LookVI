import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Wordmark } from '@/components/ui/Wordmark';
import { colors, layout, radii, spacing } from '@/theme';

type AppHeaderProps = {
  locationLabel: string;
  onLocationPress: () => void;
  onProfilePress: () => void;
};

/** Top bar of the customer home tabs: wordmark, location pill, profile shortcut. */
export function AppHeader({ locationLabel, onLocationPress, onProfilePress }: AppHeaderProps) {
  return (
    <View style={styles.bar}>
      <Wordmark size="md" />
      <View style={styles.actions}>
        <Pressable
          onPress={onLocationPress}
          accessibilityRole="button"
          accessibilityLabel={`Location: ${locationLabel}`}
          accessibilityHint="Changes your area"
          style={({ pressed }) => [styles.location, pressed && styles.pressed]}
        >
          <Icon name="location_on" size={18} color={colors.accent} />
          <AppText variant="labelLg" numberOfLines={1} style={styles.locationText}>
            {locationLabel}
          </AppText>
          <Icon name="expand_more" size={18} color={colors.textMuted} />
        </Pressable>
        <IconButton
          icon="person"
          filled
          variant="solid"
          size={40}
          iconSize={20}
          accessibilityLabel="Profile"
          onPress={onProfilePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 60,
    paddingHorizontal: layout.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  location: {
    height: 40,
    maxWidth: 170,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: { flexShrink: 1 },
  pressed: { opacity: 0.7 },
});
