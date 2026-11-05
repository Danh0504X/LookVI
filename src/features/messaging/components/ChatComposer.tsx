import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText, IconButton } from '@/components/ui';
import { colors, radii, spacing, typography } from '@/theme';

import { containsPhoneNumber, PHONE_NUMBER_NOTICE } from '../services/contactPolicy';

const MAX_LENGTH = 1000;

type ChatComposerProps = { onSend: (text: string) => void };

/** Message input. Blocks phone numbers (contact stays in the app). */
export function ChatComposer({ onSend }: ChatComposerProps) {
  const [text, setText] = useState('');
  const hasPhone = containsPhoneNumber(text);
  const canSend = text.trim().length > 0 && !hasPhone;

  const send = () => {
    if (!canSend) return;
    onSend(text);
    setText('');
  };

  return (
    <View>
      {hasPhone ? (
        <AppText variant="labelMd" color="error" style={styles.notice}>
          {PHONE_NUMBER_NOTICE}
        </AppText>
      ) : null}
      <View style={styles.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          multiline
          maxLength={MAX_LENGTH}
          accessibilityLabel="Message"
          style={styles.input}
        />
        <IconButton
          icon="send"
          filled
          variant="solid"
          accessibilityLabel="Send message"
          onPress={send}
          style={!canSend && styles.disabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  input: {
    ...typography.bodyLg,
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: radii.xxl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  disabled: { opacity: 0.35 },
  notice: { marginBottom: spacing.sm },
});
