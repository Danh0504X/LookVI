import type { Artist } from '@/domain/models';
import { artistServesArea, getArtists } from '@/features/catalog';

export type HomeArtistFilter = 'accepting' | 'near';

/**
 * Artists for the Home list, best rated first.
 * - `accepting`: currently taking new requests.
 * - `near`: travel to the customer's area; all artists when no area is set.
 */
export function getHomeArtists(filter: HomeArtistFilter, customerAreaId: string | null): Artist[] {
  const artists = getArtists().filter((artist) => {
    if (filter === 'accepting') return artist.acceptingRequests;
    return customerAreaId ? artistServesArea(artist, customerAreaId) : true;
  });
  return [...artists].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
}
