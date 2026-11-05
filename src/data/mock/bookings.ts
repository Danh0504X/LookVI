import type { Booking, BookingStatus, CancelledBy, ImageRef, Occasion } from '@/domain/models';

import { mockGoogleAccount } from './accounts';
import { mockImages } from './images';
import { mockPosts } from './posts';
import { mockServices, serviceId, variantId } from './services';

type Customer = { id: string; name: string; avatar: ImageRef | null };

/** The demo customer (signed-in account) and a few other customers seen by the demo artist. */
const MAI_CHI: Customer = {
  id: mockGoogleAccount.id,
  name: mockGoogleAccount.name,
  avatar: mockGoogleAccount.avatar,
};
const HUONG_GIANG: Customer = { id: 'customer-huong-giang', name: 'Huong Giang', avatar: mockImages.client02 };
const THU_TRANG: Customer = { id: 'customer-thu-trang', name: 'Thu Trang', avatar: mockImages.client01 };
const BAO_NGOC: Customer = { id: 'customer-bao-ngoc', name: 'Bao Ngoc', avatar: null };
const KHANH_LINH: Customer = { id: 'customer-khanh-linh', name: 'Khanh Linh', avatar: null };
const LAN_PHUONG: Customer = { id: 'customer-lan-phuong', name: 'Lan Phuong', avatar: null };

type BookingSeed = {
  reference: string;
  customer: Customer;
  artistId: string;
  postId: string | null;
  occasion: Occasion;
  /** Start relative to "now", in days; combined with `time`. */
  dayOffset: number;
  /** "HH:MM" local time, or `null` to start `minutesFromNow` after now (may be negative). */
  time: string | null;
  minutesFromNow?: number;
  status: BookingStatus;
  cancelledBy?: CancelledBy;
  areaId: string;
  line1: string;
  line2: string;
  notes: string;
};

const MAI_CHI_ADDRESS = { areaId: 'hai-chau', line1: '124 Tran Phu', line2: 'Apt 402, Lotus Tower' };

const SEEDS: BookingSeed[] = [
  // --- The demo customer's bookings (customer side) ---
  {
    reference: 'LV1021',
    customer: MAI_CHI,
    artistId: 'thao-le',
    postId: 'post-clean-girl-makeup',
    occasion: 'personal',
    dayOffset: 0,
    time: null,
    // Inside the 2-hour window: shows the locked cancellation state.
    minutesFromNow: 90,
    status: 'CONFIRMED',
    ...MAI_CHI_ADDRESS,
    notes: 'Light coverage for a work event, please.',
  },
  {
    reference: 'LV1020',
    customer: MAI_CHI,
    artistId: 'quynh-anh',
    postId: 'post-dewy-neutral-shimmer',
    occasion: 'event',
    dayOffset: 4,
    time: '16:00',
    status: 'CONFIRMED',
    ...MAI_CHI_ADDRESS,
    notes: 'Graduation photos outdoors in the afternoon.',
  },
  {
    reference: 'LV1018',
    customer: MAI_CHI,
    artistId: 'linh-nguyen',
    postId: 'post-korean-soft-glam',
    occasion: 'party',
    dayOffset: -15,
    time: '18:30',
    status: 'COMPLETED',
    ...MAI_CHI_ADDRESS,
    notes: 'Birthday dinner, light warm-toned skin.',
  },
  {
    reference: 'LV1015',
    customer: MAI_CHI,
    artistId: 'ha-tran',
    postId: 'post-velvet-evening-glam',
    occasion: 'event',
    dayOffset: -28,
    time: '17:00',
    status: 'CANCELLED',
    cancelledBy: 'customer',
    ...MAI_CHI_ADDRESS,
    notes: '',
  },
  {
    reference: 'LV1012',
    customer: MAI_CHI,
    artistId: 'minh-anh',
    postId: 'post-douyin-shimmer-glow',
    occasion: 'party',
    dayOffset: -40,
    time: '19:00',
    status: 'DECLINED',
    ...MAI_CHI_ADDRESS,
    notes: '',
  },

  // --- Other customers' bookings with the demo artist (artist side) ---
  {
    reference: 'LV1023',
    customer: HUONG_GIANG,
    artistId: 'linh-nguyen',
    postId: 'post-korean-soft-glam',
    occasion: 'event',
    dayOffset: 1,
    time: '16:00',
    status: 'PENDING',
    areaId: 'hai-chau',
    line1: '78 Bach Dang',
    line2: 'Floor 3, Riverside Building',
    notes: 'Bridal pre-party celebration. Classic radiant eyes and nude lips, please.',
  },
  {
    reference: 'LV1022',
    customer: THU_TRANG,
    artistId: 'linh-nguyen',
    postId: 'post-everyday-natural-glam',
    occasion: 'party',
    dayOffset: 3,
    time: '18:30',
    status: 'PENDING',
    areaId: 'son-tra',
    line1: '45 Vo Nguyen Giap',
    line2: '',
    notes: 'Birthday dinner. I have light, warm-toned skin.',
  },
  {
    reference: 'LV1019',
    customer: BAO_NGOC,
    artistId: 'linh-nguyen',
    postId: null,
    occasion: 'personal',
    dayOffset: 0,
    time: null,
    // Already started: the artist can mark it completed.
    minutesFromNow: -30,
    status: 'CONFIRMED',
    areaId: 'thanh-khe',
    line1: '12 Dien Bien Phu',
    line2: 'Apt 1208',
    notes: '',
  },
  {
    reference: 'LV1017',
    customer: KHANH_LINH,
    artistId: 'linh-nguyen',
    postId: 'post-everyday-natural-glam',
    occasion: 'party',
    dayOffset: 2,
    time: '17:15',
    status: 'CONFIRMED',
    areaId: 'hai-chau',
    line1: '9 Le Duan',
    line2: '',
    notes: 'Engagement dinner.',
  },
  {
    reference: 'LV1013',
    customer: LAN_PHUONG,
    artistId: 'linh-nguyen',
    postId: null,
    occasion: 'event',
    dayOffset: -10,
    time: '09:00',
    status: 'DECLINED',
    areaId: 'lien-chieu',
    line1: '210 Nguyen Luong Bang',
    line2: '',
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
 * Demo bookings dated relative to `now`, so the demo always shows upcoming and past states on
 * both sides (e.g. a booking inside the 2-hour window, one already started, pending requests).
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
        customerId: seed.customer.id,
        customerName: seed.customer.name,
        customerAvatar: seed.customer.avatar,
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
