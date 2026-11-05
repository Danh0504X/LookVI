import type { Option } from '@/components/ui';
import { mockAreas } from '@/data/mock';
import type { Area } from '@/domain/models';
import { distanceKm } from '@/utils/geo';
import { formatArea } from '@/utils/formatArea';

/** Areas served in the current launch city (mock data source for now). */
export function getAreas(): readonly Area[] {
  return mockAreas;
}

export function getAreaOptions(): Option<string>[] {
  return getAreas().map((area) => ({ value: area.id, label: formatArea(area) }));
}

/**
 * Areas whose centre lies within `radiusKm` of the artist's primary area, nearest first.
 * The primary area is always included. Approximate: based on district centres.
 */
export function getCoveredAreas(primaryAreaId: string, radiusKm: number): Area[] {
  const areas = getAreas();
  const origin = areas.find((area) => area.id === primaryAreaId);
  if (!origin) return [];
  return areas
    .map((area) => ({ area, distance: distanceKm(origin, area) }))
    .filter(({ distance }) => distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .map(({ area }) => area);
}
