import { createContext, useMemo, useState, type ReactNode } from 'react';

import { createMockMessages } from '@/data/mock';
import type { Message, MessageSender } from '@/domain/models';
import { useBookings } from '@/features/bookings';

export type MessagesContextValue = {
  getConversation: (bookingId: string) => Message[];
  sendMessage: (bookingId: string, sender: MessageSender, text: string) => void;
};

export const MessagesContext = createContext<MessagesContextValue | null>(null);

/**
 * In-memory chat for the demo, one conversation per booking. Mounted at the app root next to
 * bookings so both roles see the same conversation. Messages are not delivered anywhere.
 */
export function MessagesProvider({ children }: { children: ReactNode }) {
  const { bookings } = useBookings();
  const [messages, setMessages] = useState<readonly Message[]>(() => createMockMessages(bookings));

  const value = useMemo<MessagesContextValue>(
    () => ({
      getConversation: (bookingId) =>
        messages
          .filter((message) => message.bookingId === bookingId)
          .sort((a, b) => a.sentAt.localeCompare(b.sentAt)),
      sendMessage: (bookingId, sender, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const sentAt = new Date().toISOString();
        setMessages((current) => [
          ...current,
          { id: `msg-${bookingId}-${current.length + 1}-${Date.now()}`, bookingId, sender, text: trimmed, sentAt },
        ]);
      },
    }),
    [messages],
  );

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}
