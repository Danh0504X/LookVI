import type { ServiceRadiusKm } from './artistProfile';
import type { ImageRef } from './media';

/** Public artist as customers see it. */
export type Artist = {
  id: string;
  name: string;
  avatar: ImageRef;
  /** Short specialty line, e.g. "Personal & Party Makeup". */
  specialty: string;
  bio: string;
  areaId: string;
  serviceRadiusKm: ServiceRadiusKm;
  rating: number;
  reviewCount: number;
  completedBookings: number;
  verified: boolean;
  /** Currently taking new booking requests. */
  acceptingRequests: boolean;
};
