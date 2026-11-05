import type { ImageRef } from './media';

export const BIO_MAX_LENGTH = 200;

/** Service radius options an artist can choose, in kilometres. */
export const SERVICE_RADIUS_OPTIONS_KM = [3, 5, 10, 15, 25] as const;
export type ServiceRadiusKm = (typeof SERVICE_RADIUS_OPTIONS_KM)[number];

/** Public profile an artist sets up before receiving bookings. */
export type ArtistProfile = {
  displayName: string;
  bio: string;
  avatar: ImageRef;
  /** Primary area id the artist travels from. */
  areaId: string;
  serviceRadiusKm: ServiceRadiusKm;
};
