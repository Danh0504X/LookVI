import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, SectionHeader } from '@/components/ui';
import { mockSuggestedSearches } from '@/data/mock';
import { colors, layout, spacing } from '@/theme';

type SearchSuggestionsProps = {
  recentSearches: readonly string[];
  onSelect: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
};

/** Empty-query state: recent searches and suggestions (Stitch "Search Discovery"). */
export function SearchSuggestions({
  recentSearches,
  onSelect,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps) {
  return (
    <View>
      {recentSearches.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader title="Recent searches" action={{ label: 'Clear all', onPress: onClearRecent }} />
          {recentSearches.map((query) => (
            <View key={query} style={styles.row}>
              <Pressable
                onPress={() => onSelect(query)}
                accessibilityRole="button"
                accessibilityLabel={`Search ${query}`}
                style={({ pressed }) => [styles.rowMain, pressed && styles.pressed]}
              >
                <Icon name="history" size={22} color={colors.textMuted} />
                <AppText variant="bodyLg" numberOfLines={1} style={styles.rowText}>
                  {query}
                </AppText>
              </Pressable>
              <Pressable
                onPress={() => onRemoveRecent(query)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${query} from recent searches`}
                hitSlop={8}
                style={styles.remove}
              >
                <Icon name="close" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Suggested searches" />
        {mockSuggestedSearches.map(({ query, trending }) => (
          <Pressable
            key={query}
            onPress={() => onSelect(query)}
            accessibilityRole="button"
            accessibilityLabel={`Search ${query}${trending ? ', trending' : ''}`}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <Icon
              name={trending ? 'trending_up' : 'search'}
              size={22}
              color={trending ? colors.accent : colors.textMuted}
            />
            <AppText variant="bodyLg" numberOfLines={1} style={styles.rowText}>
              {query}
            </AppText>
            <Icon name="north_east" size={20} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: layout.screenPadding, marginTop: spacing.xl },
  row: { minHeight: layout.minTouchTarget, flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  rowMain: { flex: 1, minHeight: layout.minTouchTarget, flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  rowText: { flex: 1 },
  remove: { padding: spacing.xs },
  pressed: { opacity: 0.6 },
});
