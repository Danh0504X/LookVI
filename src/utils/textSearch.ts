/** Lower-cases and strips Vietnamese diacritics so "Hải Châu" matches "hai chau". */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/** Splits a query into normalized words. */
export function tokenize(query: string): string[] {
  return normalizeText(query).split(/\s+/).filter(Boolean);
}

/** True when every query token appears somewhere in the given fields. */
export function matchesAllTokens(tokens: readonly string[], fields: readonly string[]): boolean {
  if (tokens.length === 0) return false;
  const haystack = normalizeText(fields.join(' '));
  return tokens.every((token) => haystack.includes(token));
}
