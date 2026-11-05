import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, useRef, type ComponentRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Icon } from '@/components/ui';
import type { Artist, Booking, MessageSender } from '@/domain/models';
import { useBookings } from '@/features/bookings';
import { getArtistById } from '@/features/catalog';
import { useSession } from '@/features/session';
import { colors, layout, radii, spacing } from '@/theme';
import { formatRelativeDay, isSameDay } from '@/utils/dateTime';

import { BookingContextCard } from '../components/BookingContextCard';
import { ChatComposer } from '../components/ChatComposer';
import { MessageBubble } from '../components/MessageBubble';
import { useMessages } from '../hooks/useMessages';

/** Booking-scoped chat between the customer and the artist. */
export function ChatScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { getBooking } = useBookings();
  const booking = bookingId ? getBooking(bookingId) : undefined;
  const artist = booking ? getArtistById(booking.artistId) : undefined;

  if (!booking || !artist) {
    return (
      <PlaceholderScreen
        icon="chat_bubble"
        title="Conversation not found"
        message="This booking is no longer available."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return <Chat booking={booking} artist={artist} />;
}

function Chat({ booking, artist }: { booking: Booking; artist: Artist }) {
  const router = useRouter();
  const { role } = useSession();
  const { getConversation, sendMessage } = useMessages();
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  // The same screen serves both roles: "mine" is whichever side is signed in.
  const viewer: MessageSender = role === 'artist' ? 'artist' : 'customer';
  const counterpart =
    viewer === 'customer'
      ? { name: artist.name, avatar: artist.avatar }
      : { name: booking.customerName, avatar: undefined };
  const messages = getConversation(booking.id);
  const closed = booking.status === 'DECLINED' || booking.status === 'CANCELLED';

  return (
    <Screen
      scroll={false}
      padded={false}
      header={
        <TopBar
          onBack={() => router.back()}
          center={
            <View style={styles.identity}>
              {counterpart.avatar ? (
                <Image source={counterpart.avatar} contentFit="cover" style={styles.avatar} />
              ) : null}
              <View>
                <AppText variant="labelLg" numberOfLines={1}>
                  {counterpart.name}
                </AppText>
                <AppText variant="labelMd" color="textMuted">
                  Booking #{booking.reference}
                </AppText>
              </View>
            </View>
          }
        />
      }
      footer={
        closed ? (
          <View style={styles.closed}>
            <Icon name="lock" size={18} color={colors.textMuted} />
            <AppText variant="labelMd" color="textMuted" style={styles.closedText}>
              This booking is closed. You can still read past messages.
            </AppText>
          </View>
        ) : (
          <ChatComposer onSend={(text) => sendMessage(booking.id, viewer, text)} />
        )
      }
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        <BookingContextCard
          booking={booking}
          onPress={() =>
            router.navigate({
              pathname: viewer === 'artist' ? '/request/[bookingId]' : '/booking/[bookingId]',
              params: { bookingId: booking.id },
            })
          }
        />

        {messages.length === 0 ? (
          <AppText variant="bodyMd" color="textSecondary" align="center" style={styles.empty}>
            Say hello to {counterpart.name}. Ask about your look, skin or timing.
          </AppText>
        ) : (
          messages.map((message, index) => {
            const previous = messages[index - 1];
            const newDay =
              !previous || !isSameDay(new Date(previous.sentAt), new Date(message.sentAt));
            return (
              <Fragment key={message.id}>
                {newDay ? (
                  <View style={styles.day}>
                    <AppText variant="labelMd" color="textSecondary">
                      {formatRelativeDay(message.sentAt)}
                    </AppText>
                  </View>
                ) : null}
                <MessageBubble
                  text={message.text}
                  sentAt={message.sentAt}
                  mine={message.sender === viewer}
                  avatar={counterpart.avatar}
                />
              </Fragment>
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, maxWidth: 240 },
  avatar: { width: 32, height: 32, borderRadius: radii.full, backgroundColor: colors.surfaceSubtle },
  content: { padding: layout.screenPadding, gap: spacing.md },
  empty: { marginTop: spacing.xxl, paddingHorizontal: spacing.xl },
  day: {
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
    marginVertical: spacing.sm,
  },
  closed: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  closedText: { flex: 1 },
});
