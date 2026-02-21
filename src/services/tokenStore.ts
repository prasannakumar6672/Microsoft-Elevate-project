// Centralized in-memory token store — no circular deps
let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export const tokenStore = {
    getAccess: () => _accessToken,
    getRefresh: () => _refreshToken,
    set: (access: string, refresh: string) => { _accessToken = access; _refreshToken = refresh; },
    clear: () => { _accessToken = null; _refreshToken = null; },
};
