/** What the customer is getting ready for. Drives service variants and discovery filters. */
export type Occasion = 'personal' | 'party' | 'event';

export const OCCASION_LABELS: Record<Occasion, string> = {
  personal: 'Personal Makeup',
  party: 'Party Makeup',
  event: 'Event Makeup',
};

/** A priced package of a service for one occasion. */
export type ServiceVariant = {
  id: string;
  occasion: Occasion;
  name: string;
  priceVnd: number;
  durationMinutes: number;
  description: string;
};

/** Artist-defined bookable offer (at-home makeup in the MVP). */
export type Service = {
  id: string;
  artistId: string;
  name: string;
  variants: readonly ServiceVariant[];
};
