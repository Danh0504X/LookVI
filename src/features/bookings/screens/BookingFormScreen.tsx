import { Image } from 'expo-image';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { VariantOption } from '@/components/cards';
import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Button, SectionHeader, SelectField, TextField } from '@/components/ui';
import { FREE_CANCELLATION_HOURS, type Account, type Artist, type Post } from '@/domain/models';
import { getAreaById, getAreaOptions, getArtistById, getPostById } from '@/features/catalog';
import { useSession } from '@/features/session';
import { colors, radii, spacing } from '@/theme';
import { formatDuration } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { ArtistSummary } from '../components/ArtistSummary';
import { DayStrip } from '../components/DayStrip';
import { PriceSummary } from '../components/PriceSummary';
import { TimeSlotGrid } from '../components/TimeSlotGrid';
import { NOTES_MAX_LENGTH, useBookingForm } from '../hooks/useBookingForm';
import { useBookings } from '../hooks/useBookings';

export function BookingFormScreen() {
  const router = useRouter();
  const { account } = useSession();
  const params = useLocalSearchParams<{ artistId: string; postId?: string; variantId?: string }>();
  const artist = params.artistId ? getArtistById(params.artistId) : undefined;
  const post = params.postId ? (getPostById(params.postId) ?? null) : null;

  if (!account) return <Redirect href="/" />;
  if (!artist) {
    return (
      <PlaceholderScreen
        icon="person_off"
        title="Artist not found"
        message="This artist is no longer on Lookvi."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return (
    <BookingForm
      artist={artist}
      post={post && post.artistId === artist.id ? post : null}
      initialVariantId={params.variantId ?? null}
      customer={account}
    />
  );
}

type BookingFormProps = {
  artist: Artist;
  post: Post | null;
  initialVariantId: string | null;
  customer: Account;
};

function BookingForm({ artist, post, initialVariantId, customer }: BookingFormProps) {
  const router = useRouter();
  const { customerProfile } = useSession();
  const { requestBooking } = useBookings();
  const form = useBookingForm({
    artist,
    post,
    initialVariantId,
    customer,
    customerAreaId: customerProfile?.areaId ?? null,
  });
  const area = form.areaId ? getAreaById(form.areaId) : undefined;

  const handleSubmit = () => {
    const request = form.toRequest();
    if (!request) return;
    const booking = requestBooking(request);
    router.replace({ pathname: '/booking/[bookingId]/sent', params: { bookingId: booking.id } });
  };

  return (
    <Screen
      header={
        <TopBar
          onBack={() => router.back()}
          center={<AppText variant="titleMd">Request booking</AppText>}
        />
      }
      footer={
        <View>
          <Button
            label={
              form.variant
                ? `Send request · ${formatPrice(form.variant.priceVnd)}`
                : 'Send request'
            }
            onPress={handleSubmit}
            disabled={!form.isValid}
          />
          <AppText variant="labelMd" color="textMuted" align="center" style={styles.footerNote}>
            Free cancellation up to {FREE_CANCELLATION_HOURS} hours before the appointment
          </AppText>
        </View>
      }
    >
      <View style={styles.block}>
        <ArtistSummary artist={artist} />
        {post ? (
          <View style={styles.lookRef}>
            {post.images[0] ? (
              <Image source={post.images[0]} contentFit="cover" style={styles.lookImage} />
            ) : null}
            <View style={styles.lookText}>
              <AppText variant="labelMd" color="textMuted">
                Look reference
              </AppText>
              <AppText variant="labelLg">{post.lookName}</AppText>
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Service" />
        {post ? (
          <AppText variant="labelMd" color="textMuted" style={styles.hint}>
            Packages that can achieve this look
          </AppText>
        ) : null}
        <View style={styles.stack} accessibilityRole="radiogroup">
          {form.variants.map((variant) => (
            <VariantOption
              key={variant.id}
              name={variant.name}
              details={`${formatDuration(variant.durationMinutes)} · ${variant.description}`}
              price={formatPrice(variant.priceVnd)}
              selected={variant.id === form.variant?.id}
              onPress={() => form.setVariantId(variant.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Date" />
        <DayStrip
          days={form.days}
          selected={form.day}
          isAvailable={form.dayHasSlots}
          onSelect={form.selectDay}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Arrival time" />
        <TimeSlotGrid slots={form.slots} selected={form.slot} onSelect={form.selectSlot} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Address" />
        <View style={styles.stack}>
          <SelectField
            label="Area"
            value={form.areaId}
            options={getAreaOptions()}
            onChange={form.setAreaId}
            placeholder="Select your area"
            leadingIcon="location_on"
          />
          {!form.servesArea && area ? (
            <AppText variant="labelMd" color="error">
              {artist.name} doesn&apos;t travel to {area.name}. Choose another area or artist.
            </AppText>
          ) : null}
          <TextField
            label="Street address"
            value={form.line1}
            onChangeText={form.setLine1}
            placeholder="e.g. 124 Tran Phu"
            autoComplete="street-address"
            textContentType="fullStreetAddress"
          />
          <TextField
            label="Apartment, building or gate (optional)"
            value={form.line2}
            onChangeText={form.setLine2}
            placeholder="e.g. Apt 402, Lotus Tower"
          />
        </View>
      </View>

      <View style={styles.section}>
        <TextField
          label={`Notes for ${artist.name} (optional)`}
          value={form.notes}
          onChangeText={form.setNotes}
          placeholder="Skin type, occasion, anything the artist should know"
          multiline
          maxLength={NOTES_MAX_LENGTH}
          showCounter
        />
      </View>

      {form.variant ? (
        <View style={[styles.section, styles.lastSection]}>
          <SectionHeader title="Price" />
          <PriceSummary
            serviceName={form.variant.name}
            priceVnd={form.variant.priceVnd}
            note="No advance payment. The artist reviews your request; you pay after the service."
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { paddingTop: spacing.sm, gap: spacing.lg },
  lookRef: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
  },
  lookImage: { width: 44, height: 56, borderRadius: radii.md },
  lookText: { flex: 1, gap: spacing.xxs },
  section: { marginTop: spacing.xxl },
  lastSection: { marginBottom: spacing.xl },
  hint: { marginTop: -spacing.sm, marginBottom: spacing.md },
  stack: { gap: spacing.md },
  footerNote: { marginTop: spacing.sm },
});
