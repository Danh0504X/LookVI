import type { Href } from 'expo-router';

import { OCCASION_LABELS, type Occasion, type Post } from '@/domain/models';
import { getEligibleVariants, getStyleById } from '@/features/catalog';

/** A discovery filter: everything, one style, or one occasion. */
export type DiscoveryFilter =
  | { kind: 'all' }
  | { kind: 'style'; styleId: string }
  | { kind: 'occasion'; occasion: Occasion };

export const ALL_FILTER: DiscoveryFilter = { kind: 'all' };

/** Chips shown on Explore, in order (mirrors the Stitch design). */
const CHIP_FILTERS: DiscoveryFilter[] = [
  ALL_FILTER,
  { kind: 'style', styleId: 'soft-glam' },
  { kind: 'style', styleId: 'korean' },
  { kind: 'style', styleId: 'douyin' },
  { kind: 'style', styleId: 'clean-girl' },
  { kind: 'style', styleId: 'natural-glam' },
  { kind: 'occasion', occasion: 'party' },
  { kind: 'occasion', occasion: 'event' },
];

/** Stable string form, used as list keys and as the `filter` route param. */
export function filterKey(filter: DiscoveryFilter): string {
  switch (filter.kind) {
    case 'all':
      return 'all';
    case 'style':
      return `style:${filter.styleId}`;
    case 'occasion':
      return `occasion:${filter.occasion}`;
  }
}

export function parseFilter(value: string | undefined): DiscoveryFilter {
  if (!value) return ALL_FILTER;
  const [kind, id] = value.split(':');
  if (kind === 'style' && id && getStyleById(id)) return { kind: 'style', styleId: id };
  if (kind === 'occasion' && id && id in OCCASION_LABELS) {
    return { kind: 'occasion', occasion: id as Occasion };
  }
  return ALL_FILTER;
}

export function filterLabel(filter: DiscoveryFilter): string {
  switch (filter.kind) {
    case 'all':
      return 'For You';
    case 'style':
      return getStyleById(filter.styleId)?.name ?? 'Style';
    case 'occasion':
      // "Party Makeup" → "Party" keeps chips short.
      return OCCASION_LABELS[filter.occasion].replace(' Makeup', '');
  }
}

/** Chip filters, plus the active one if it is not among them (e.g. a style from Search). */
export function getChipFilters(active: DiscoveryFilter): DiscoveryFilter[] {
  const activeKey = filterKey(active);
  return CHIP_FILTERS.some((filter) => filterKey(filter) === activeKey)
    ? CHIP_FILTERS
    : [...CHIP_FILTERS, active];
}

export function applyFilter(posts: readonly Post[], filter: DiscoveryFilter): Post[] {
  switch (filter.kind) {
    case 'all':
      return [...posts];
    case 'style':
      return posts.filter((post) => post.styleIds.includes(filter.styleId));
    case 'occasion':
      // A post matches an occasion when one of its eligible variants is for that occasion.
      return posts.filter((post) =>
        getEligibleVariants(post).some((variant) => variant.occasion === filter.occasion),
      );
  }
}

/** Link to Explore with a filter applied (used by Home and Search). */
export function exploreHref(filter: DiscoveryFilter): Href {
  return `/explore?filter=${encodeURIComponent(filterKey(filter))}`;
}
