import { useState } from 'react';

import type { CustomerProfile } from '@/domain/models';

const MIN_NAME_LENGTH = 2;

export function useCustomerProfileForm(initialName: string) {
  const [name, setName] = useState(initialName);
  const [areaId, setAreaId] = useState<string | null>(null);

  const nameIsValid = name.trim().length >= MIN_NAME_LENGTH;
  const isValid = nameIsValid && areaId !== null;

  const toProfile = (): CustomerProfile => ({ name: name.trim(), areaId });

  return { name, setName, areaId, setAreaId, nameIsValid, isValid, toProfile };
}
