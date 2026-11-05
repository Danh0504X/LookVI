/** Star rating + text tied to one completed booking. */
export type Review = {
  id: string;
  artistId: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Variant the review is about, e.g. "Party Makeup". */
  serviceName: string;
  text: string;
  /** ISO date. */
  createdAt: string;
};
