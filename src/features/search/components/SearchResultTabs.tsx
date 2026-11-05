import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/ui';
import { layout, spacing } from '@/theme';

import { SEARCH_TABS, type SearchTab } from '../services/searchService';

type SearchResultTabsProps = {
  active: SearchTab;
  onChange: (tab: SearchTab) => void;
};

/** All / Styles / Posts / Artists. Switching keeps the current query. */
export function SearchResultTabs({ active, onChange }: SearchResultTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityRole="tablist"
    >
      {SEARCH_TABS.map((tab) => (
        <Chip
          key={tab.value}
          label={tab.label}
          selected={tab.value === active}
          onPress={() => onChange(tab.value)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: layout.screenPadding, paddingVertical: spacing.sm, gap: spacing.sm },
});
