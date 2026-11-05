import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Chip, Icon } from '@/components/ui';
import { colors, layout, radii, spacing } from '@/theme';

import {
  filterKey,
  filterLabel,
  getChipFilters,
  type DiscoveryFilter,
} from '../services/discoveryFilters';

type ExploreListHeaderProps = {
  activeFilter: DiscoveryFilter;
  onSelectFilter: (filter: DiscoveryFilter) => void;
  onOpenSearch: () => void;
};

/** Search entry + filter chips above the Explore grid. */
export function ExploreListHeader({ activeFilter, onSelectFilter, onOpenSearch }: ExploreListHeaderProps) {
  const activeKey = filterKey(activeFilter);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onOpenSearch}
        accessibilityRole="search"
        accessibilityLabel="Search looks, styles or artists"
        style={({ pressed }) => [styles.searchBar, pressed && styles.pressed]}
      >
        <Icon name="search" size={22} color={colors.textMuted} />
        <AppText variant="bodyLg" color="textMuted">
          Search looks, styles or artists
        </AppText>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipScroller}
      >
        {getChipFilters(activeFilter).map((filter) => {
          const key = filterKey(filter);
          return (
            <Chip
              key={key}
              label={filterLabel(filter)}
              selected={key === activeKey}
              onPress={() => onSelectFilter(filter)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: spacing.lg },
  searchBar: {
    height: 48,
    marginHorizontal: layout.screenPadding,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  chipScroller: { marginTop: spacing.lg },
  chips: { paddingHorizontal: layout.screenPadding, gap: spacing.sm },
});
