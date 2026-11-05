import { mockAreas, mockArtists, mockPosts, mockServices, mockStyles } from '@/data/mock';
import type { Area, Artist, Post, Service, ServiceVariant, Style } from '@/domain/models';
import { distanceKm } from '@/utils/geo';

/**
 * Read-only access to the discovery catalog. Backed by mock data today; screens depend
 * only on these functions, so a backend can replace the implementation later.
 */

export function getArtists(): readonly Artist[] {
  return mockArtists;
}

export function getArtistById(id: string): Artist | undefined {
  return mockArtists.find((artist) => artist.id === id);
}

export function getPosts(): readonly Post[] {
  return mockPosts;
}

export function getPostById(id: string): Post | undefined {
  return mockPosts.find((post) => post.id === id);
}

export function getStyles(): readonly Style[] {
  return mockStyles;
}

export function getStyleById(id: string): Style | undefined {
  return mockStyles.find((style) => style.id === id);
}

export function getAreaById(id: string): Area | undefined {
  return mockAreas.find((area) => area.id === id);
}

export function getServiceForArtist(artistId: string): Service | undefined {
  return mockServices.find((service) => service.artistId === artistId);
}

/** Lowest advertised variant price of an artist, used for "From X" on artist rows. */
export function getArtistStartingPrice(artistId: string): number | null {
  const prices = getServiceForArtist(artistId)?.variants.map((variant) => variant.priceVnd) ?? [];
  return prices.length > 0 ? Math.min(...prices) : null;
}

/** Variants of the post's linked service that can achieve the look. */
export function getEligibleVariants(post: Post): ServiceVariant[] {
  if (!post.serviceId) return [];
  const service = mockServices.find((item) => item.id === post.serviceId);
  return service?.variants.filter((variant) => post.eligibleVariantIds.includes(variant.id)) ?? [];
}

/**
 * The offer shown with a post: the cheapest variant that can achieve the look.
 * `null` when the post links no valid priced service (then no price is shown).
 */
export function getPostOffer(post: Post): ServiceVariant | null {
  const eligible = getEligibleVariants(post);
  if (eligible.length === 0) return null;
  return eligible.reduce((cheapest, variant) =>
    variant.priceVnd < cheapest.priceVnd ? variant : cheapest,
  );
}

/** Whether an artist travels to the given area (district centre within their radius). */
export function artistServesArea(artist: Artist, areaId: string): boolean {
  const from = getAreaById(artist.areaId);
  const to = getAreaById(areaId);
  if (!from || !to) return false;
  return distanceKm(from, to) <= artist.serviceRadiusKm;
}
