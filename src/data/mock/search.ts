/** Seed data for the search screen (mirrors the Stitch "Search Discovery" design). */
export const mockRecentSearches: readonly string[] = [
  'Korean makeup',
  'Douyin aesthetic',
  'Linh Nguyen',
  'Natural glam',
];

export const mockSuggestedSearches: readonly { query: string; trending: boolean }[] = [
  { query: 'Soft Glam', trending: true },
  { query: 'Clean Girl', trending: false },
  { query: 'Korean', trending: true },
  { query: 'Party Makeup', trending: false },
];
