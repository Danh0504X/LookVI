/** Phone numbers have 9+ digits; separators like spaces, dots and dashes are ignored. */
const PHONE_CANDIDATE = /\+?\d[\d\s.()-]{7,}\d/g;
const MIN_PHONE_DIGITS = 9;

/**
 * Confirmed rule: contact stays in the app, so chat messages may not share phone numbers.
 * Detects digit runs that look like a phone number ("0905 123 456", "+84-905-123-456").
 */
export function containsPhoneNumber(text: string): boolean {
  const candidates = text.match(PHONE_CANDIDATE) ?? [];
  return candidates.some((candidate) => candidate.replace(/\D/g, '').length >= MIN_PHONE_DIGITS);
}

export const PHONE_NUMBER_NOTICE =
  'Phone numbers can’t be shared in chat. Keep contact in Lookvi so your booking stays protected.';
