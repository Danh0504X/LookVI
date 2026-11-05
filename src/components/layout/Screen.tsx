import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  /** Rendered above the content, outside the scroll area. */
  header?: ReactNode;
  /** Sticky bottom area (primary actions), kept above the keyboard and home indicator. */
  footer?: ReactNode;
  /** Wrap content in a ScrollView. Default true. */
  scroll?: boolean;
  /** Apply the standard horizontal screen padding. Default true. */
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Base container for every screen: safe areas, canvas colour, optional scrolling,
 * keyboard avoidance and a sticky footer.
 */
export function Screen({
  children,
  header,
  footer,
  scroll = true,
  padded = true,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom + spacing.lg;
  const contentPadding = [
    padded && styles.padded,
    !footer && { paddingBottom: bottomInset },
    contentStyle,
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {header}
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, contentPadding]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, contentPadding]}>{children}</View>
        )}
        {footer ? (
          <View style={[styles.footer, { paddingBottom: bottomInset }]}>{footer}</View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  padded: { paddingHorizontal: layout.screenPadding },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
