// Public API of the catalog feature: read access to areas, artists, posts, styles and offers.
export { getAreaOptions, getAreas, getCoveredAreas } from './services/areaService';
export {
  artistServesArea,
  getAreaById,
  getArtistById,
  getArtists,
  getArtistStartingPrice,
  getEligibleVariants,
  getPostById,
  getPostOffer,
  getPosts,
  getPostsByArtist,
  getReviewsForArtist,
  getServiceForArtist,
  getStyleById,
  getStyles,
} from './services/catalogService';
export { describePostCard, toPostCard, toPostCards } from './services/postCards';
export type { PostCardData } from './services/postCards';
