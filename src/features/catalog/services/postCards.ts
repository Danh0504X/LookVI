import type { Artist, Post, ServiceVariant } from '@/domain/models';
import { formatPrice } from '@/utils/formatPrice';

import { getArtistById, getPostOffer } from './catalogService';

/** A post joined with what its card needs to display. */
export type PostCardData = {
  post: Post;
  artist: Artist;
  offer: ServiceVariant | null;
};

/** "Linh Nguyen · from 550.000₫" (price omitted when no valid offer is linked). */
export function describePostCard({ artist, offer }: PostCardData): string {
  return offer ? `${artist.name} · from ${formatPrice(offer.priceVnd)}` : artist.name;
}

export function toPostCard(post: Post): PostCardData | null {
  const artist = getArtistById(post.artistId);
  if (!artist) return null;
  return { post, artist, offer: getPostOffer(post) };
}

export function toPostCards(posts: readonly Post[]): PostCardData[] {
  return posts.flatMap((post) => {
    const card = toPostCard(post);
    return card ? [card] : [];
  });
}
