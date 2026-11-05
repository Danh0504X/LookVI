import type { ImageRef } from './media';

export type UserRole = 'customer' | 'artist';

/** Identity returned by the sign-in provider (Google in the MVP). */
export type Account = {
  id: string;
  name: string;
  email: string;
  avatar: ImageRef;
};

/** Details a customer confirms during first-time setup. */
export type CustomerProfile = {
  name: string;
  /** Service area id; `null` when the customer skipped setup. */
  areaId: string | null;
};
