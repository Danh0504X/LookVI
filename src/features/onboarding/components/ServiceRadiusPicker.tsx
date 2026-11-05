import { StyleSheet, View } from 'react-native';

import { AppText, Chip, FieldLabel, Icon } from '@/components/ui';
import { SERVICE_RADIUS_OPTIONS_KM, type Area, type ServiceRadiusKm } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';

type ServiceRadiusPickerProps = {
  value: ServiceRadiusKm;
  onChange: (value: ServiceRadiusKm) => void;
  coveredAreas: readonly Area[];
};

/**
 * Service radius choice. Stitch shows a slider; discrete chips are used instead (no extra
 * dependency, larger touch targets, values that are easy to compare).
 */
export function ServiceRadiusPicker({ value, onChange, coveredAreas }: ServiceRadiusPickerProps) {
  const coverage = coveredAreas.map((area) => area.name).join(', ');

  return (
    <View>
      <FieldLabel label="Service radius" aside={`Up to ${value} km`} />
      <View style={styles.chips} accessibilityRole="radiogroup">
        {SERVICE_RADIUS_OPTIONS_KM.map((km) => (
          <Chip
            key={km}
            label={`${km} km`}
            accessibilityLabel={`${km} kilometres`}
            selected={km === value}
            onPress={() => onChange(km)}
          />
        ))}
      </View>
      <View style={styles.coverage}>
        <AppText variant="bodyMd" color="textSecondary">
          Covers <AppText variant="labelLg">{coverage}</AppText>
        </AppText>
        <View style={styles.noteRow}>
          <Icon name="info" size={16} color={colors.textMuted} />
          <AppText variant="labelMd" color="textMuted" style={styles.noteText}>
            Travel is included in your service prices.
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  coverage: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.sm,
  },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  noteText: { flex: 1 },
});
