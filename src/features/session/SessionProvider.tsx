import { createContext, useMemo, useReducer, type ReactNode } from 'react';

import type { ArtistProfile, CustomerProfile, UserRole } from '@/domain/models';

import { signInWithGoogle } from './services/authService';
import { initialSessionState, sessionReducer, type SessionState } from './sessionReducer';

export type SessionContextValue = SessionState & {
  signIn: () => Promise<void>;
  chooseRole: (role: UserRole) => void;
  completeCustomerSetup: (profile: CustomerProfile) => void;
  completeArtistSetup: (profile: ArtistProfile) => void;
  signOut: () => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);

  const value = useMemo<SessionContextValue>(
    () => ({
      ...state,
      signIn: async () => {
        const account = await signInWithGoogle();
        dispatch({ type: 'signedIn', account });
      },
      chooseRole: (role) => dispatch({ type: 'roleChosen', role }),
      completeCustomerSetup: (profile) => dispatch({ type: 'customerSetupCompleted', profile }),
      completeArtistSetup: (profile) => dispatch({ type: 'artistSetupCompleted', profile }),
      signOut: () => dispatch({ type: 'signedOut' }),
    }),
    [state],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
