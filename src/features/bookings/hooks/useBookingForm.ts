import { useState } from 'react';

import type { Account, Artist, BookingRequest, Post, ServiceVariant } from '@/domain/models';
import {
  artistServesArea,
  getEligibleVariants,
  getPostOffer,
  getServiceForArtist,
} from '@/features/catalog';
import { isSameDay } from '@/utils/dateTime';

import { getAvailableSlots, getBookableDays } from '../services/availability';
import { useBookings } from './useBookings';

export const NOTES_MAX_LENGTH = 300;
const MIN_ADDRESS_LENGTH = 5;

type BookingFormInput = {
  artist: Artist;
  /** Post the customer booked from; limits packages to those that can achieve the look. */
  post: Post | null;
  initialVariantId: string | null;
  customer: Account;
  customerAreaId: string | null;
};

export function useBookingForm({
  artist,
  post,
  initialVariantId,
  customer,
  customerAreaId,
}: BookingFormInput) {
  const { bookings } = useBookings();
  const service = getServiceForArtist(artist.id);

  // Pricing rule: never offer a package that cannot achieve the selected look.
  const variants: ServiceVariant[] = post ? getEligibleVariants(post) : [...(service?.variants ?? [])];
  const defaultVariantId =
    variants.find((variant) => variant.id === initialVariantId)?.id ??
    (post ? getPostOffer(post)?.id : undefined) ??
    variants[0]?.id ??
    null;
  const [variantId, setVariantId] = useState(defaultVariantId);
  const variant = variants.find((item) => item.id === variantId) ?? null;
  const durationMinutes = variant?.durationMinutes ?? 60;

  const slotsFor = (day: Date) =>
    getAvailableSlots({ artistId: artist.id, day, durationMinutes, bookings });

  const days = getBookableDays();
  const [day, setDay] = useState<Date>(() => days.find((item) => slotsFor(item).length > 0) ?? days[0]!);
  const slots = slotsFor(day);
  const [slotTime, setSlotTime] = useState<number | null>(null);
  // A previously picked slot is dropped if it is no longer available (other day/package).
  const slot = slots.find((item) => item.getTime() === slotTime) ?? null;

  // Prefill the address from the customer's most recent booking.
  const lastAddress = [...bookings]
    .filter((booking) => booking.customerId === customer.id)
    .sort((a, b) => b.requestedAt.localeCompare(a.requestedAt))[0]?.address;
  const [line1, setLine1] = useState(lastAddress?.line1 ?? '');
  const [line2, setLine2] = useState(lastAddress?.line2 ?? '');
  const [areaId, setAreaId] = useState<string | null>(customerAreaId ?? lastAddress?.areaId ?? null);
  const [notes, setNotes] = useState('');

  const servesArea = areaId ? artistServesArea(artist, areaId) : true;
  const isValid =
    service !== undefined &&
    variant !== null &&
    slot !== null &&
    areaId !== null &&
    servesArea &&
    line1.trim().length >= MIN_ADDRESS_LENGTH;

  const toRequest = (): BookingRequest | null => {
    if (!isValid || !service || !variant || !slot || !areaId) return null;
    return {
      customerId: customer.id,
      customerName: customer.name,
      artistId: artist.id,
      postId: post?.id ?? null,
      lookName: post?.lookName ?? null,
      serviceId: service.id,
      variantId: variant.id,
      variantName: variant.name,
      occasion: variant.occasion,
      durationMinutes: variant.durationMinutes,
      priceVnd: variant.priceVnd,
      startsAt: slot.toISOString(),
      address: { line1: line1.trim(), line2: line2.trim(), areaId },
      notes: notes.trim(),
    };
  };

  return {
    variants,
    variant,
    setVariantId,
    days,
    day,
    selectDay: (next: Date) => {
      if (!isSameDay(next, day)) setDay(next);
    },
    dayHasSlots: (candidate: Date) => slotsFor(candidate).length > 0,
    slots,
    slot,
    selectSlot: (next: Date) => setSlotTime(next.getTime()),
    line1,
    setLine1,
    line2,
    setLine2,
    areaId,
    setAreaId,
    notes,
    setNotes,
    servesArea,
    isValid,
    toRequest,
  };
}
