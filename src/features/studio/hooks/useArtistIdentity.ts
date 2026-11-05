import type { Artist, ArtistProfile } from '@/domain/models';
import { getArtistById } from '@/features/catalog';
import { useSession } from '@/features/session';

/** The signed-in artist: editable profile (session) plus public stats (catalog). */
export function useArtistIdentity(): { profile: ArtistProfile; artist: Artist | undefined } | null {
  const { artistProfile } = useSession();
  if (!artistProfile) return null;
  return { profile: artistProfile, artist: getArtistById(artistProfile.artistId) };
}
