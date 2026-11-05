import type { ImageRef } from './media';

/**
 * Artist-owned photo content. The look detail screen is keyed by `post.id`.
 * A post may link one service and the variants that can achieve the look; the
 * "From X ₫" price is derived from those variants, never stored on the post.
 */
export type Post = {
  id: string;
  artistId: string;
  /** Name of the look shown, e.g. "Korean Soft Glam". */
  lookName: string;
  /** Short caption, used for text results ("Natural glam for everyday beauty"). */
  caption: string;
  description: string;
  images: readonly ImageRef[];
  styleIds: readonly string[];
  serviceId: string | null;
  /** Variants of `serviceId` that can achieve this look. */
  eligibleVariantIds: readonly string[];
};
