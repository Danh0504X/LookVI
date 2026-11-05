import { useSyncExternalStore } from 'react';

import { mockServices } from '@/data/mock';
import type { Service, ServiceVariant } from '@/domain/models';

/**
 * Editable in-memory service catalog (demo). Artists edit their packages on the artist side
 * and customers see the new prices. Built on React's `useSyncExternalStore`, no state library.
 * Replace with API calls when a backend exists.
 */
let services: readonly Service[] = mockServices;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getServicesSnapshot(): readonly Service[] {
  return services;
}

/** Re-renders the caller whenever a service changes. */
export function useServices(): readonly Service[] {
  return useSyncExternalStore(subscribe, getServicesSnapshot);
}

/** Adds or replaces a variant in the artist's service (creating the service if needed). */
export function saveVariant(artistId: string, variant: ServiceVariant): void {
  const existing = services.find((service) => service.artistId === artistId);
  if (!existing) {
    services = [
      ...services,
      { id: `${artistId}-at-home`, artistId, name: 'At-home Makeup', variants: [variant] },
    ];
  } else {
    const replaced = existing.variants.some((item) => item.id === variant.id);
    const variants = replaced
      ? existing.variants.map((item) => (item.id === variant.id ? variant : item))
      : [...existing.variants, variant];
    services = services.map((service) => (service === existing ? { ...service, variants } : service));
  }
  emit();
}

export function deleteVariant(artistId: string, variantId: string): void {
  services = services.map((service) =>
    service.artistId === artistId
      ? { ...service, variants: service.variants.filter((variant) => variant.id !== variantId) }
      : service,
  );
  emit();
}
