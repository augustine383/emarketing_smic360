
export type UserRole = 'Admin' | 'Manager' | 'Officer';

export interface UserAccount {
  id: string;
  username: string;
  pin: string;
  role: UserRole;
}

/**
 * Initial authorized personnel for the SMIC360 Vault.
 * These are used to seed the local storage on first run.
 */
export const INITIAL_USERS: UserAccount[] = [
  { id: '1', username: 'admin', pin: '1234567', role: 'Admin' },
  { id: '2', username: 'manager', pin: '2222222', role: 'Manager' },
  { id: '3', username: 'officer', pin: '3333333', role: 'Officer' },
];

export const AUTH_STORAGE_KEY = "smic360_vault_users_v1";
export const SESSION_STORAGE_KEY = "smic360_vault_session_v1";

export function getStoredUsers(): UserAccount[] {
  if (typeof window === 'undefined') return INITIAL_USERS;
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: UserAccount[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}
