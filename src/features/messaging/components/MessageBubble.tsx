import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import type { ImageRef } from '@/domain/models';
import { colors, radii, spacing } from '@/theme';
import { formatTime } from '@/utils/dateTime';

type MessageBubbleProps = {
  text: string;
  sentAt: string;
  mine: boolean;
  /** Avatar of the other person, shown next to their messages. */
  avatar?: ImageRef;
};

export function MessageBubble({ text, sentAt, mine, avatar }: MessageBubbleProps) {
  return (
    <View style={[styles.row, mine ? styles.rowMine : styles.rowTheirs]}>
      {!mine && avatar ? <Image source={avatar} contentFit="cover" style={styles.avatar} /> : null}
      <View style={[styles.column, mine && styles.columnMine]}>
        <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
          <AppText variant="bodyLg" color={mine ? 'onPrimary' : 'textPrimary'}>
            {text}
          </AppText>
        </View>
        <AppText variant="labelMd" color="textMuted" style={styles.time}>
          {formatTime(sentAt)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  rowMine: { justifyContent: 'flex-end' },
  rowTheirs: { justifyContent: 'flex-start' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    marginBottom: spacing.xl,
    backgroundColor: colors.surfaceSubtle,
  },
  column: { maxWidth: '80%', alignItems: 'flex-start' },
  columnMine: { alignItems: 'flex-end' },
  bubble: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radii.xl },
  bubbleMine: { backgroundColor: colors.primary, borderBottomRightRadius: radii.sm },
  bubbleTheirs: { backgroundColor: colors.surfaceSubtle, borderBottomLeftRadius: radii.sm },
  time: { marginTop: spacing.xs, marginHorizontal: spacing.xs },
});
