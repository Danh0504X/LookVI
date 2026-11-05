import type { Area } from '@/domain/models';

/** "Hai Chau, Da Nang" */
export function formatArea(area: Pick<Area, 'name' | 'city'>): string {
  return `${area.name}, ${area.city}`;
}
