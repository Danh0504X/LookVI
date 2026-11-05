import { Badge, type BadgeTone } from '@/components/ui';
import type { BookingStatus } from '@/domain/models';

import { STATUS_LABELS } from '../services/bookingRules';

const TONES: Record<BookingStatus, BadgeTone> = {
  PENDING: 'accent',
  CONFIRMED: 'dark',
  COMPLETED: 'neutral',
  DECLINED: 'muted',
  CANCELLED: 'muted',
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge label={STATUS_LABELS[status]} tone={TONES[status]} />;
}
