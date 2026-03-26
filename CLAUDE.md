# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start           # Start Expo dev server
yarn start-clear     # Start with cleared cache
yarn android         # Run on Android
yarn ios             # Run on iOS
yarn web             # Run on web
yarn lint            # ESLint + Prettier checks
yarn format          # Auto-fix with ESLint + Prettier
yarn prebuild        # Expo prebuild (native folders)
```

No test runner is configured in this project.

## Architecture

### Routing (Expo Router v6 — file-based)

`app/` maps directly to routes. Authentication state (from Zustand) drives redirects in `app/_layout.tsx`:

- **No token** → `app/(auth)/` — intro slider, sign-in, sign-up, password recovery, phone/identity verification
- **Has token** → `app/(tabs)/` — Home, Search, Order, Profile

Route constants are typed in `constants/route.ts` (`ROUTES.AUTH.*`, `ROUTES.TABS.*`, `ROUTES.EXTRA.*`).

### State Management

Two layers:

1. **Zustand** (`stores/auth.ts`) — global auth state. `boot()` runs silent token refresh on startup; `signIn/signOut` manage the session; `refreshAccessToken()` is called by the Axios interceptor.
2. **TanStack Query** (`libs/api/tanstack-query.ts`) — server/cached data. Configured with 45s stale time, 1 retry, auto-refetch on app focus and network reconnect.

### API Layer (`libs/api.ts`)

Axios instance pointed at `https://api-ec.artstack.online`. Interceptors:
- **Request** — injects `Authorization: Bearer <accessToken>` from Zustand store.
- **Response** — on 401, calls `refreshAccessToken()` (with a lock to prevent concurrent refresh attempts), then retries the original request.

Refresh token is persisted via `expo-secure-store` (`libs/secure.ts`).

### Styling

NativeWind v5 + Tailwind v4. Global CSS lives in `app/globals.css` (defines the `@theme` color palette). Use Tailwind utility classes directly on components. Prettier auto-sorts class names via the Tailwind plugin.

Path alias `@/` resolves to the repo root (configured in `tsconfig.json` and `babel.config.js`).

### Component Structure

```
components/          # Shared UI — organized as atoms / molecules / organisms
features/            # Feature-specific components (e.g. features/tabs/home/)
```

Feature modules own their own sub-components and keep feature logic co-located.

### Key Libraries

| Purpose | Library |
|---|---|
| Lists | `@shopify/flash-list` |
| Bottom sheets | `@gorhom/bottom-sheet` |
| Icons | `lucide-react-native` |
| Forms | `react-hook-form` + `zod` |
| Animations | `react-native-reanimated` v4 |
| Gestures | `react-native-gesture-handler` |
| OTP input | `input-otp-native` |
