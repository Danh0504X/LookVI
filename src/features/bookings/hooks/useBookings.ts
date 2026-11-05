import { useContext } from 'react';

import { BookingsContext, type BookingsContextValue } from '../BookingsProvider';

export function useBookings(): BookingsContextValue {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used inside <BookingsProvider>.');
  }
  return context;
}
