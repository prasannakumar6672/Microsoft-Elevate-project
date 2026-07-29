/**
 * lib/storage.ts — Typed sessionStorage adapter
 *
 * Uses sessionStorage (not localStorage) for security:
 * tokens are cleared when the browser tab/window is closed.
 *
 * Falls back to in-memory store if sessionStorage is unavailable
 * (e.g., in private browsing on some browsers, or SSR contexts).
 */

const KEYS = {
  ACCESS_TOKEN: 'rg_access',
  REFRESH_TOKEN: 'rg_refresh',
  USER: 'rg_user',
} as const;

// In-memory fallback
let _inMemory: Record<string, string> = {};
let _storageAvailable = true;

function isAvailable(): boolean {
  try {
    const test = '__rg_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Check availability once at module load
_storageAvailable = isAvailable();

function get(key: string): string | null {
  if (_storageAvailable) {
    return sessionStorage.getItem(key);
  }
  return _inMemory[key] ?? null;
}

function set(key: string, value: string): void {
  if (_storageAvailable) {
    sessionStorage.setItem(key, value);
  } else {
    _inMemory[key] = value;
  }
}

function remove(key: string): void {
  if (_storageAvailable) {
    sessionStorage.removeItem(key);
  } else {
    delete _inMemory[key];
  }
}

export const tokenStore = {
  getAccess: () => get(KEYS.ACCESS_TOKEN),
  getRefresh: () => get(KEYS.REFRESH_TOKEN),
  set: (access: string, refresh: string) => {
    set(KEYS.ACCESS_TOKEN, access);
    set(KEYS.REFRESH_TOKEN, refresh);
  },
  clear: () => {
    remove(KEYS.ACCESS_TOKEN);
    remove(KEYS.REFRESH_TOKEN);
    remove(KEYS.USER);
    _inMemory = {};
  },
};

export const userStorage = {
  get: (): string | null => get(KEYS.USER),
  set: (json: string) => set(KEYS.USER, json),
  clear: () => remove(KEYS.USER),
};
