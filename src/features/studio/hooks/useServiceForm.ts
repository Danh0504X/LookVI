import { useState } from 'react';

import { OCCASION_LABELS, type Occasion, type ServiceVariant } from '@/domain/models';

export const DURATION_OPTIONS = [45, 60, 75, 90, 120] as const;
export const DESCRIPTION_MAX_LENGTH = 160;
export const MIN_PRICE_VND = 100_000;
export const MAX_PRICE_VND = 10_000_000;

/** Keeps digits only, so "550.000" and "550000" both parse. */
const parsePrice = (text: string) => Number(text.replace(/\D/g, '')) || 0;

/** Form state + validation for creating or editing a service package. */
export function useServiceForm(artistId: string, initial: ServiceVariant | null) {
  const [occasion, setOccasion] = useState<Occasion>(initial?.occasion ?? 'personal');
  const [name, setName] = useState(initial?.name ?? OCCASION_LABELS.personal);
  const [priceText, setPriceText] = useState(initial ? String(initial.priceVnd) : '');
  const [durationMinutes, setDuration] = useState<number>(initial?.durationMinutes ?? 60);
  const [description, setDescription] = useState(initial?.description ?? '');

  const price = parsePrice(priceText);
  const errors = {
    name: name.trim().length < 3 ? 'Use at least 3 characters.' : null,
    price:
      price < MIN_PRICE_VND || price > MAX_PRICE_VND
        ? 'Enter a price between 100.000₫ and 10.000.000₫.'
        : price % 1_000 !== 0
          ? 'Round the price to the nearest 1.000₫.'
          : null,
    description: description.trim().length < 10 ? 'Describe the package in a few words.' : null,
  };
  const isValid = !errors.name && !errors.price && !errors.description;

  return {
    occasion,
    // Picking a category fills the default name, unless the artist typed their own.
    selectOccasion: (next: Occasion) => {
      if (Object.values(OCCASION_LABELS).includes(name.trim()) || !name.trim()) {
        setName(OCCASION_LABELS[next]);
      }
      setOccasion(next);
    },
    name,
    setName,
    priceText,
    setPriceText: (text: string) => setPriceText(text.replace(/\D/g, '')),
    price,
    durationMinutes,
    setDuration,
    description,
    setDescription,
    errors,
    isValid,
    toVariant: (): ServiceVariant => ({
      id: initial?.id ?? `${artistId}-v${Date.now()}`,
      occasion,
      name: name.trim(),
      priceVnd: price,
      durationMinutes,
      description: description.trim(),
    }),
  };
}
