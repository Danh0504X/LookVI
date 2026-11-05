import type { Booking, BookingStatus, CancelledBy, Occasion } from '@/domain/models';

import { mockGoogleAccount } from './accounts';
import { mockPosts } from './posts';
import { mockServices, serviceId, variantId } from './services';

type BookingSeed = {
  reference: string;
  artistId: string;
  postId: string | null;
  occasion: Occasion;
  /** Start relative to "now", in days; combined with `time`. */
  dayOffset: number;
  /** "HH:MM" local time, or `null` to start `minutesFromNow` after now. */
  time: string | null;
  minutesFromNow?: number;
  status: BookingStatus;
  cancelledBy?: CancelledBy;
  areaId: string;
  line1: string;
  line2: string;
  notes: string;
};

const SEEDS: BookingSeed[] = [
  {
    reference: 'LV1021',
    artistId: 'thao-le',
    postId: 'post-clean-girl-makeup',
    occasion: 'personal',
    dayOffset: 0,
    time: null,
    // Inside the 2-hour window: shows the locked cancellation state.
    minutesFromNow: 90,
    status: 'CONFIRMED',
    areaId: 'hai-chau',
    line1: '124 Tran Phu',
    line2: 'Apt 402, Lotus Tower',
    notes: 'Light coverage for a work event, please.',
  },
  {
    reference: 'LV1020',
    artistId: 'quynh-anh',
    postId: 'post-dewy-neutral-shimmer',
    occasion: 'event',
    dayOffset: 4,
    time: '16:00',
    status: 'CONFIRMED',
    areaId: 'hai-chau',
    line1: '124 Tran Phu',
    line2: 'Apt 402, Lotus Tower',
    notes: 'Graduation photos outdoors in the afternoon.',
  },
  {
    reference: 'LV1018',
    artistId: 'linh-nguyen',
    postId: 'post-korean-soft-glam',
    occasion: 'party',
    dayOffset: -15,
    time: '18:30',
    status: 'COMPLETED',
    areaId: 'hai-chau',
    line1: '124 Tran Phu',
    line2: 'Apt 402, Lotus Tower',
    notes: 'Birthday dinner, light warm-toned skin.',
  },
  {
    reference: 'LV1015',
    artistId: 'ha-tran',
    postId: 'post-velvet-evening-glam',
    occasion: 'event',
    dayOffset: -28,
    time: '17:00',
    status: 'CANCELLED',
    cancelledBy: 'customer',
    areaId: 'hai-chau',
    line1: '124 Tran Phu',
    line2: 'Apt 402, Lotus Tower',
    notes: '',
  },
  {
    reference: 'LV1012',
    artistId: 'minh-anh',
    postId: 'post-douyin-shimmer-glow',
    occasion: 'party',
    dayOffset: -40,
    time: '19:00',
    status: 'DECLINED',
    areaId: 'hai-chau',
    line1: '124 Tran Phu',
    line2: 'Apt 402, Lotus Tower',
    notes: '',
  },
];

function startDate(seed: BookingSeed, now: Date): Date {
  if (seed.time === null) {
    const date = new Date(now.getTime() + (seed.minutesFromNow ?? 0) * 60_000);
    // Round up to the next quarter hour so it reads like a real appointment time.
    date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
    return date;
  }
  const [hours, minutes] = seed.time.split(':').map(Number);
  const date = new Date(now);
  date.setDate(date.getDate() + seed.dayOffset);
  date.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return date;
}

const hoursBefore = (date: Date, hours: number) =>
  new Date(date.getTime() - hours * 3_600_000).toISOString();

/**
 * Demo bookings for the mocked customer, dated relative to `now` so the demo always shows
 * an upcoming confirmed booking, one inside the 2-hour window, and some history.
 */
export function createMockBookings(now: Date): Booking[] {
  return SEEDS.flatMap((seed) => {
    const service = mockServices.find((item) => item.id === serviceId(seed.artistId));
    const variant = service?.variants.find((item) => item.id === variantId(seed.artistId, seed.occasion));
    if (!service || !variant) return [];

    const starts = startDate(seed, now);
    const post = seed.postId ? mockPosts.find((item) => item.id === seed.postId) : undefined;
    const isClosed = seed.status === 'DECLINED' || seed.status === 'CANCELLED';
    const wasConfirmed = seed.status === 'CONFIRMED' || seed.status === 'COMPLETED' || seed.cancelledBy;

    return [
      {
        id: `booking-${seed.reference.toLowerCase()}`,
        reference: seed.reference,
        customerId: mockGoogleAccount.id,
        customerName: mockGoogleAccount.name,
        artistId: seed.artistId,
        postId: post?.id ?? null,
        lookName: post?.lookName ?? null,
        serviceId: service.id,
        variantId: variant.id,
        variantName: variant.name,
        occasion: variant.occasion,
        durationMinutes: variant.durationMinutes,
        priceVnd: variant.priceVnd,
        startsAt: starts.toISOString(),
        address: { line1: seed.line1, line2: seed.line2, areaId: seed.areaId },
        notes: seed.notes,
        status: seed.status,
        cancelledBy: seed.cancelledBy ?? null,
        requestedAt: hoursBefore(starts, 72),
        confirmedAt: wasConfirmed ? hoursBefore(starts, 70) : null,
        completedAt:
          seed.status === 'COMPLETED'
            ? new Date(starts.getTime() + variant.durationMinutes * 60_000).toISOString()
            : null,
        closedAt: isClosed ? hoursBefore(starts, 48) : null,
      },
    ];
  });
}
