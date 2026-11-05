import { useState } from 'react';

import { BIO_MAX_LENGTH, type ArtistProfile, type ServiceRadiusKm } from '@/domain/models';

import { getCoveredAreas } from '../services/areaService';

const MIN_NAME_LENGTH = 2;
const MIN_BIO_LENGTH = 10;

export function useArtistProfileForm(initial: ArtistProfile) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [bio, setBio] = useState(initial.bio.slice(0, BIO_MAX_LENGTH));
  const [areaId, setAreaId] = useState(initial.areaId);
  const [serviceRadiusKm, setServiceRadiusKm] = useState<ServiceRadiusKm>(initial.serviceRadiusKm);

  const coveredAreas = getCoveredAreas(areaId, serviceRadiusKm);
  const isValid =
    displayName.trim().length >= MIN_NAME_LENGTH && bio.trim().length >= MIN_BIO_LENGTH;

  const toProfile = (): ArtistProfile => ({
    displayName: displayName.trim(),
    bio: bio.trim(),
    avatar: initial.avatar,
    areaId,
    serviceRadiusKm,
  });

  return {
    displayName,
    setDisplayName,
    bio,
    setBio,
    areaId,
    setAreaId,
    serviceRadiusKm,
    setServiceRadiusKm,
    coveredAreas,
    isValid,
    toProfile,
  };
}
