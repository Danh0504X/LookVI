import type { Booking, Message, MessageSender } from '@/domain/models';

type MessageSeed = { sender: MessageSender; text: string; minutesAfterRequest: number };

/** Seeded conversations, keyed by booking reference (illustrative). */
const SEEDS: Record<string, MessageSeed[]> = {
  LV1020: [
    {
      sender: 'customer',
      text: 'Hi Quynh Anh! The graduation photos are outdoors in the afternoon. Can the look handle the sun?',
      minutesAfterRequest: 2,
    },
    {
      sender: 'artist',
      text: 'Hi Mai Chi! Yes, I will use a long-wear base and keep the shimmer soft so it photographs well outside.',
      minutesAfterRequest: 25,
    },
    {
      sender: 'customer',
      text: 'Perfect. My skin is a little dry, so extra hydration prep would be great.',
      minutesAfterRequest: 31,
    },
    {
      sender: 'artist',
      text: 'Noted! I will bring my hydrating prep. See you then.',
      minutesAfterRequest: 40,
    },
  ],
  LV1021: [
    {
      sender: 'artist',
      text: 'Hi Mai Chi, I am confirmed for today. Is there parking near Lotus Tower?',
      minutesAfterRequest: 130,
    },
    {
      sender: 'customer',
      text: 'Yes, there is parking in the basement. The gate code is at reception.',
      minutesAfterRequest: 140,
    },
  ],
  LV1018: [
    {
      sender: 'customer',
      text: 'Thank you Linh, I loved the look!',
      minutesAfterRequest: 4400,
    },
    {
      sender: 'artist',
      text: 'So happy to hear that. Happy birthday!',
      minutesAfterRequest: 4420,
    },
  ],
};

/** Demo messages for the seeded bookings, timed relative to each request. */
export function createMockMessages(bookings: readonly Booking[]): Message[] {
  return bookings.flatMap((booking) =>
    (SEEDS[booking.reference] ?? []).map((seed, index) => ({
      id: `msg-${booking.reference.toLowerCase()}-${index + 1}`,
      bookingId: booking.id,
      sender: seed.sender,
      text: seed.text,
      sentAt: new Date(
        new Date(booking.requestedAt).getTime() + seed.minutesAfterRequest * 60_000,
      ).toISOString(),
    })),
  );
}
