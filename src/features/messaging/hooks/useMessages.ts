import { useContext } from 'react';

import { MessagesContext, type MessagesContextValue } from '../MessagesProvider';

export function useMessages(): MessagesContextValue {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used inside <MessagesProvider>.');
  }
  return context;
}
