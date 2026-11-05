import { OCCASION_LABELS, type Artist, type ImageRef, type Post, type Style } from '@/domain/models';
import {
  getAreaById,
  getArtistById,
  getArtists,
  getArtistStartingPrice,
  getEligibleVariants,
  getPostOffer,
  getPosts,
  getStyleById,
  getStyles,
  toPostCards,
  type PostCardData,
} from '@/features/catalog';
import { matchesAllTokens, tokenize } from '@/utils/textSearch';

export type SearchTab = 'all' | 'styles' | 'posts' | 'artists';

export const SEARCH_TABS: { value: SearchTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'styles', label: 'Styles' },
  { value: 'posts', label: 'Posts' },
  { value: 'artists', label: 'Artists' },
];

export function isSearchTab(value: string | undefined): value is SearchTab {
  return SEARCH_TABS.some((tab) => tab.value === value);
}

export type StyleResult = {
  style: Style;
  cover: ImageRef;
  lookCount: number;
  fromPriceVnd: number | null;
};

export type ArtistResult = {
  artist: Artist;
  areaName: string | null;
  fromPriceVnd: number | null;
};

export type SearchResults = {
  styles: StyleResult[];
  posts: PostCardData[];
  artists: ArtistResult[];
};

function postSearchFields(post: Post): string[] {
  const styleNames = post.styleIds.map((id) => getStyleById(id)?.name ?? '');
  const occasions = getEligibleVariants(post).map((variant) => OCCASION_LABELS[variant.occasion]);
  const artistName = getArtistById(post.artistId)?.name ?? '';
  return [post.lookName, post.caption, post.description, artistName, ...styleNames, ...occasions];
}

function artistSearchFields(artist: Artist): string[] {
  return [artist.name, artist.specialty, artist.bio, getAreaById(artist.areaId)?.name ?? ''];
}

/** Style card data, computed over every post in the style (not only matches). */
function toStyleResult(style: Style): StyleResult | null {
  const posts = getPosts().filter((post) => post.styleIds.includes(style.id));
  const cover = posts[0]?.images[0];
  if (!cover) return null;
  const prices = posts.flatMap((post) => {
    const offer = getPostOffer(post);
    return offer ? [offer.priceVnd] : [];
  });
  return {
    style,
    cover,
    lookCount: posts.length,
    fromPriceVnd: prices.length > 0 ? Math.min(...prices) : null,
  };
}

function toArtistResult(artist: Artist): ArtistResult {
  return {
    artist,
    areaName: getAreaById(artist.areaId)?.name ?? null,
    fromPriceVnd: getArtistStartingPrice(artist.id),
  };
}

const byRating = (a: Artist, b: Artist) => b.rating - a.rating || b.reviewCount - a.reviewCount;

/**
 * Searches styles, posts and artists. A post or artist matches when every query word
 * appears in its text (diacritics-insensitive). Styles are those named by the query plus
 * the styles of matching posts; artists include those whose posts match.
 */
export function searchCatalog(query: string): SearchResults {
  const tokens = tokenize(query);
  if (tokens.length === 0) return { styles: [], posts: [], artists: [] };

  const matchedPosts = getPosts().filter((post) => matchesAllTokens(tokens, postSearchFields(post)));

  // Styles named by the query first, then styles of matching posts by frequency.
  const styleScores = new Map<string, number>();
  for (const style of getStyles()) {
    if (matchesAllTokens(tokens, [style.name])) styleScores.set(style.id, Number.MAX_SAFE_INTEGER);
  }
  for (const post of matchedPosts) {
    for (const id of post.styleIds) {
      if (styleScores.get(id) !== Number.MAX_SAFE_INTEGER) {
        styleScores.set(id, (styleScores.get(id) ?? 0) + 1);
      }
    }
  }
  const styles = [...styleScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .flatMap(([id]) => {
      const style = getStyleById(id);
      const result = style ? toStyleResult(style) : null;
      return result ? [result] : [];
    });

  const artistIdsWithPosts = new Set(matchedPosts.map((post) => post.artistId));
  const artists = getArtists()
    .filter(
      (artist) =>
        artistIdsWithPosts.has(artist.id) || matchesAllTokens(tokens, artistSearchFields(artist)),
    )
    .sort(byRating)
    .map(toArtistResult);

  return { styles, posts: toPostCards(matchedPosts), artists };
}

/** Everything, for browsing without a query (e.g. "View all" artists from Home). */
export function browseCatalog(): SearchResults {
  return {
    styles: getStyles().flatMap((style) => {
      const result = toStyleResult(style);
      return result ? [result] : [];
    }),
    posts: toPostCards(getPosts()),
    artists: [...getArtists()].sort(byRating).map(toArtistResult),
  };
}
