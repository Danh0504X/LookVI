import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';

type PriceSummaryProps = {
  serviceName: string;
  priceVnd: number;
  /** Shown under the total. */
  note?: string;
};

/** Itemized price. Travel is included (confirmed: no separate travel fee for now). */
export function PriceSummary({ serviceName, priceVnd, note }: PriceSummaryProps) {
  return (
    <View style={styles.box}>
      <Row label={serviceName} value={formatPrice(priceVnd)} />
      <Row label="Travel" value="Included" muted />
      <View style={styles.divider} />
      <View style={styles.row}>
        <AppText variant="titleMd">Total</AppText>
        <AppText variant="priceLg">{formatPrice(priceVnd)}</AppText>
      </View>
      {note ? (
        <AppText variant="labelMd" color="textMuted" style={styles.note}>
          {note}
        </AppText>
      ) : null}
    </View>
  );
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <View style={styles.row}>
      <AppText variant="bodyMd" color="textSecondary">
        {label}
      </AppText>
      <AppText variant="bodyMd" color={muted ? 'textMuted' : 'textPrimary'}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.borderStrong, marginVertical: spacing.xs },
  note: { marginTop: spacing.xs },
});
