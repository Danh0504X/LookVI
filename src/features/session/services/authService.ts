import { mockGoogleAccount } from '@/data/mock';
import type { Account } from '@/domain/models';

/**
 * Mocked Google sign-in. Replace with a real OAuth flow when authentication is in scope;
 * screens depend only on this function's signature.
 */
export async function signInWithGoogle(): Promise<Account> {
  return mockGoogleAccount;
}
