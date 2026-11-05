import type { Account, ArtistProfile } from '@/domain/models';

import { mockImages } from './images';

/** Account returned by the mocked "Continue with Google" sign-in. */
export const mockGoogleAccount: Account = {
  id: 'user-mai-chi',
  name: 'Mai Chi',
  email: 'maichi.danang@gmail.com',
  avatar: mockImages.clientMaiChi,
};

/**
 * Demo artist used when the signed-in user picks the Artist role, so the artist side of
 * the demo shows a realistic profile. All fields stay editable in onboarding.
 */
export const mockArtistProfileDraft: ArtistProfile = {
  artistId: 'linh-nguyen',
  displayName: 'Linh Nguyen',
  bio: 'Professional makeup artist specialising in soft glam and natural radiant makeup for events and parties.',
  avatar: mockImages.portrait02,
  areaId: 'hai-chau',
  serviceRadiusKm: 10,
};
