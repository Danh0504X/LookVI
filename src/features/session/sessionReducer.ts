import type { Account, ArtistProfile, CustomerProfile, UserRole } from '@/domain/models';

/**
 * In-memory session for the demo. Nothing is persisted: every cold start begins at the
 * welcome screen (confirmed demo behaviour).
 */
export type SessionState = {
  account: Account | null;
  role: UserRole | null;
  customerProfile: CustomerProfile | null;
  artistProfile: ArtistProfile | null;
};

export type SessionAction =
  | { type: 'signedIn'; account: Account }
  | { type: 'roleChosen'; role: UserRole }
  | { type: 'customerSetupCompleted'; profile: CustomerProfile }
  | { type: 'customerAreaChanged'; areaId: string }
  | { type: 'artistSetupCompleted'; profile: ArtistProfile }
  | { type: 'signedOut' };

export const initialSessionState: SessionState = {
  account: null,
  role: null,
  customerProfile: null,
  artistProfile: null,
};

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'signedIn':
      return { ...initialSessionState, account: action.account };
    case 'roleChosen':
      return { ...state, role: action.role };
    case 'customerSetupCompleted':
      return { ...state, customerProfile: action.profile };
    case 'customerAreaChanged':
      return state.customerProfile
        ? { ...state, customerProfile: { ...state.customerProfile, areaId: action.areaId } }
        : state;
    case 'artistSetupCompleted':
      return { ...state, artistProfile: action.profile };
    case 'signedOut':
      return initialSessionState;
  }
}
