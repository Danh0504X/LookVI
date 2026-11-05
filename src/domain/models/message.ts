/** Who wrote a chat message. Chat is always between the two sides of one booking. */
export type MessageSender = 'customer' | 'artist';

/**
 * In-app chat message. Conversations are scoped to a booking (confirmed: contact happens in
 * the app; phone numbers are never exposed).
 */
export type Message = {
  id: string;
  bookingId: string;
  sender: MessageSender;
  text: string;
  /** ISO date-time. */
  sentAt: string;
};
