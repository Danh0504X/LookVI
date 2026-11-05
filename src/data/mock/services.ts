import type { Occasion, Service, ServiceVariant } from '@/domain/models';

type PriceTable = Record<Occasion, number>;

/** Illustrative prices in VND per artist and occasion (not approved pricing). */
const PRICES: Record<string, PriceTable> = {
  'linh-nguyen': { personal: 450_000, party: 550_000, event: 700_000 },
  'ha-tran': { personal: 520_000, party: 650_000, event: 780_000 },
  'bao-tran': { personal: 400_000, party: 500_000, event: 650_000 },
  'minh-anh': { personal: 380_000, party: 480_000, event: 620_000 },
  'quynh-anh': { personal: 420_000, party: 520_000, event: 680_000 },
  'thao-le': { personal: 400_000, party: 480_000, event: 600_000 },
  'ngoc-mai': { personal: 350_000, party: 450_000, event: 560_000 },
  'yen-pham': { personal: 420_000, party: 600_000, event: 720_000 },
};

const VARIANT_DETAILS: Record<Occasion, Omit<ServiceVariant, 'id' | 'priceVnd'>> = {
  personal: {
    occasion: 'personal',
    name: 'Personal Makeup',
    durationMinutes: 45,
    description: 'Everyday natural finish',
  },
  party: {
    occasion: 'party',
    name: 'Party Makeup',
    durationMinutes: 60,
    description: 'Glass skin, defined eyes and lashes',
  },
  event: {
    occasion: 'event',
    name: 'Event Makeup',
    durationMinutes: 75,
    description: 'Long-wear, photography-proof finish',
  },
};

const OCCASIONS: readonly Occasion[] = ['personal', 'party', 'event'];

export const variantId = (artistId: string, occasion: Occasion) => `${artistId}-${occasion}`;
export const serviceId = (artistId: string) => `${artistId}-at-home`;

/** One at-home makeup service per artist, with a variant per occasion. */
export const mockServices: readonly Service[] = Object.entries(PRICES).map(([artistId, prices]) => ({
  id: serviceId(artistId),
  artistId,
  name: 'At-home Makeup',
  variants: OCCASIONS.map((occasion) => ({
    ...VARIANT_DETAILS[occasion],
    id: variantId(artistId, occasion),
    priceVnd: prices[occasion],
  })),
}));
