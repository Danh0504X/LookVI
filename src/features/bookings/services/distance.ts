import type { Booking } from '@/domain/models';
import { getAreaById } from '@/features/catalog';
import { distanceKm } from '@/utils/geo';

/** Approximate distance between the artist's base area and the booking's area (district centres). */
export function approxDistanceKm(booking: Booking, artistAreaId: string | undefined): number | null {
  const from = artistAreaId ? getAreaById(artistAreaId) : undefined;
  const to = getAreaById(booking.address.areaId);
  if (!from || !to) return null;
  return Math.max(1, Math.round(distanceKm(from, to)));
}
