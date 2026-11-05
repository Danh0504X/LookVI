import type { Area } from '@/domain/models';

/**
 * Da Nang districts for the single-city launch.
 * Coordinates are approximate district centres (demo data, not for navigation).
 */
export const mockAreas: readonly Area[] = [
  { id: 'hai-chau', name: 'Hai Chau', city: 'Da Nang', latitude: 16.0471, longitude: 108.2068 },
  { id: 'thanh-khe', name: 'Thanh Khe', city: 'Da Nang', latitude: 16.064, longitude: 108.188 },
  { id: 'son-tra', name: 'Son Tra', city: 'Da Nang', latitude: 16.0718, longitude: 108.2338 },
  { id: 'ngu-hanh-son', name: 'Ngu Hanh Son', city: 'Da Nang', latitude: 16.0007, longitude: 108.2516 },
  { id: 'cam-le', name: 'Cam Le', city: 'Da Nang', latitude: 16.015, longitude: 108.195 },
  { id: 'lien-chieu', name: 'Lien Chieu', city: 'Da Nang', latitude: 16.0718, longitude: 108.1503 },
];
