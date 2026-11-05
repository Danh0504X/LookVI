import { StyleSheet, View } from 'react-native';

import { IconButton, SearchField } from '@/components/ui';
import { layout, spacing } from '@/theme';

type SearchHeaderProps = {
  query: string;
  onChangeQuery: (query: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onOpenFilters: () => void;
  autoFocus: boolean;
};

export function SearchHeader({
  query,
  onChangeQuery,
  onSubmit,
  onBack,
  onOpenFilters,
  autoFocus,
}: SearchHeaderProps) {
  return (
    <View style={styles.row}>
      <IconButton icon="arrow_back" accessibilityLabel="Back" onPress={onBack} />
      <SearchField
        value={query}
        onChangeText={onChangeQuery}
        onSubmitEditing={onSubmit}
        placeholder="Search looks, posts, artists"
        autoFocus={autoFocus}
      />
      <IconButton
        icon="tune"
        variant="surface"
        accessibilityLabel="Filters"
        onPress={onOpenFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: layout.screenPadding - spacing.md,
    paddingRight: layout.screenPadding,
    paddingVertical: spacing.sm,
  },
});
