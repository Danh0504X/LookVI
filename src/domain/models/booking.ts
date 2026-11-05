import type { ImageRef } from './media';
import type { Occasion } from './service';

/** Confirmed demo flow: PENDING → CONFIRMED → COMPLETED, plus DECLINED and CANCELLED. */
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'DECLINED' | 'CANCELLED';

export type CancelledBy = 'customer' | 'artist';

/** Free cancellation window: either side may cancel until this many hours before start. */
export const FREE_CANCELLATION_HOURS = 2;

export type BookingAddress = {
  /** Street address, e.g. "124 Tran Phu". */
  line1: string;
  /** Apartment, building, gate code. */
  line2: string;
  areaId: string;
};

/**
 * A customer's request for one service variant at a time and address.
 * Price, variant and duration are snapshots taken when the request is sent, so later
 * service edits never change an existing booking.
 */
export type Booking = {
  id: string;
  /** Human-readable reference, e.g. "LV1024". */
  reference: string;
  customerId: string;
  customerName: string;
  /** Snapshot of the customer's photo, if they have one. */
  customerAvatar: ImageRef | null;
  artistId: string;
  /** Post that inspired the request, if any. */
  postId: string | null;
  lookName: string | null;
  serviceId: string;
  variantId: string;
  variantName: string;
  occasion: Occasion;
  durationMinutes: number;
  priceVnd: number;
  /** ISO date-time of the appointment start. */
  startsAt: string;
  address: BookingAddress;
  notes: string;
  status: BookingStatus;
  cancelledBy: CancelledBy | null;
  requestedAt: string;
  confirmedAt: string | null;
  completedAt: string | null;
  /** Set for DECLINED and CANCELLED. */
  closedAt: string | null;
};

/** What a customer submits; the system fills ids, status and timestamps. */
export type BookingRequest = Omit<
  Booking,
  | 'id'
  | 'reference'
  | 'status'
  | 'cancelledBy'
  | 'requestedAt'
  | 'confirmedAt'
  | 'completedAt'
  | 'closedAt'
>;
