import { StyleSheet, View } from 'react-native';

import { AppText, Rating } from '@/components/ui';
import type { Review } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';
import { formatShortDate } from '@/utils/dateTime';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function ReviewItem({ review, showDivider }: { review: Review; showDivider: boolean }) {
  return (
    <View style={[styles.item, showDivider && styles.divider]}>
      <View style={styles.header}>
        <View style={styles.initials}>
          <AppText variant="labelMd" color="textSecondary">
            {initials(review.authorName)}
          </AppText>
        </View>
        <View style={styles.meta}>
          <AppText variant="labelLg">{review.authorName}</AppText>
          <AppText variant="labelMd" color="textMuted">
            {review.serviceName} · {formatShortDate(review.createdAt)}
          </AppText>
        </View>
        <Rating value={review.rating} />
      </View>
      <AppText variant="bodyMd" color="textSecondary" style={styles.text}>
        {review.text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: spacing.lg },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  initials: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1, minWidth: 0 },
  text: { marginTop: spacing.sm },
});
