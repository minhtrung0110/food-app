# Food App

[![Build Status](https://img.shields.io/badge/build-not_configured-lightgrey)](#)
[![License](https://img.shields.io/badge/license-unlicensed-red)](#license)
[![Runtime](https://img.shields.io/badge/expo-54.0.0-000020?logo=expo)](https://expo.dev/)
[![Framework](https://img.shields.io/badge/react--native-0.81.5-61DAFB?logo=react)](https://reactnative.dev/)
[![Last Commit](https://img.shields.io/badge/last%20commit-local-lightgrey)](#)

## Project Description

Food App is a production-ready, cross-platform mobile application for food discovery and ordering flows. It ships with a full authentication experience (sign-in, sign-up, password recovery, OTP verification), location search for delivery, and a tab-based main experience featuring home discovery, search, orders, and profile. The codebase emphasizes scalable architecture with Expo Router, modular feature folders, and shared UI primitives.

**Target users:** end users looking to browse restaurants/partners, find nearby delivery options, and manage orders and profiles.

![Food App preview](thumbnail.png)

## Features

- Guided onboarding with a swipeable intro carousel.
- Authentication flows: sign-in, sign-up, password recovery, OTP verification, and password reset.
- Location discovery: debounced search with remote geocoding and bottom-sheet selection.
- Home discovery feed: food categories, partner cards, and grouped partner sections.
- Search and filter panels powered by reusable bottom sheets.
- Secure session handling with refresh tokens and automatic API re-authentication.
- Local persistence for user-selected delivery location.
- Custom UI system with Tailwind-style utilities (NativeWind) and reusable atomic components.
- WebView screen with safe external navigation handling.

## Tech Stack

**Frontend**

- Expo SDK 54 + React Native 0.81
- Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated, Gesture Handler, Safe Area Context

**Backend**

- RESTful API integration via Axios (base URL configured in the app)

**Database**

- External (not in this repository)

**State Management / API / Tools**

- Zustand (global state)
- TanStack Query (server-state caching)
- React Hook Form + Zod (form state + validation)
- AsyncStorage & Expo Secure Store (persistence)
- @gorhom/bottom-sheet, FlashList (UI utilities)

**Deployment**

- Expo tooling (EAS build compatible)

## Project Architecture

The project uses a **feature-first** structure on top of Expo Router’s file-based navigation. UI building blocks are centralized in `components`, domain logic in `features`, and shared services and state live in `libs`, `queries`, and `stores`.

```
app/                 # Expo Router screens (navigation + layouts)
features/            # Feature modules (home, location, search)
components/          # UI atoms/molecules, shared primitives
services/            # API services (locations, food data)
queries/             # React Query hooks
stores/              # Zustand stores (auth, app, bottom sheet)
libs/                # API client, seed data, schemas, secure storage
```

## Folder Structure

```
app/
  (auth)/            # Intro + auth flows
  (tabs)/            # Main tabs (home/search/order/profile)
  (extra)/           # Extra flows (find location)
  _layout.tsx        # Root providers and navigation

features/
  location/          # Location combobox & helpers
  tabs/home/         # Home screen sections and bottom sheets

components/
  atoms/             # Buttons, inputs, icons, etc.
  molecules/         # Form fields, modals, navigation UI
  orangism/          # Bottom sheet and themed UI

libs/                # API client, validation schemas, seeds
queries/             # React Query hooks
services/            # API request implementations
stores/              # Zustand app/auth/bottom-sheet stores
```

## Installation & Setup

### Requirements

- Node.js (LTS recommended)
- Yarn 4 (project uses Yarn Berry)
- Expo CLI / Expo Go (or native build tooling for Android/iOS)

### Install dependencies

```bash
yarn install
```

## Environment Variables

Create a `.env` file at the project root if needed:

```bash
EXPO_PUBLIC_WEB_HOST=your-domain.example
```

Notes:

- `EXPO_PUBLIC_WEB_HOST` is used by the WebView screen to allow/deny external navigation.
- The API base URL is currently configured in `libs/api.ts`. Replace it with your environment-specific endpoint if required.

## Running the Project

```bash
yarn start        # Start Expo dev server
yarn android      # Run on Android
yarn ios          # Run on iOS (macOS only)
yarn web          # Run on web
```

## Scripts

| Script             | Description                                 |
| ------------------ | ------------------------------------------- |
| `yarn start`       | Start the Expo dev server                   |
| `yarn start-clear` | Start Expo and clear cache                  |
| `yarn android`     | Run on Android device/emulator              |
| `yarn ios`         | Run on iOS simulator                        |
| `yarn web`         | Run the web build                           |
| `yarn prebuild`    | Generate native projects from Expo config   |
| `yarn lint`        | Lint TypeScript/JavaScript + Prettier check |
| `yarn format`      | Fix ESLint and run Prettier                 |

## Roadmap

- Replace mocked auth flows with live backend APIs and token exchange.
- Add real-time order tracking and order history endpoints.
- Introduce payment flows and checkout modules.
- Expand location support with geofencing and saved addresses.

## Contribution Guidelines

1. Fork the repository and create a feature branch.
2. Keep changes focused and aligned with the feature-first structure.
3. Run `yarn lint` before submitting.
4. Follow existing TypeScript + NativeWind conventions and component patterns.

## License

MIT (recommended) — no license file was found in this repository.

## Author

Author: Nguyen Duc Minh Trung  
Email: minhtrung4367@gmail.com  
LinkedIn: https://www.linkedin.com/in/minhtrung0110/  
Phone: +84 707 624 367

Use Figma MCP to inspect this frame (top-level only, do not recurse into sub-components):
@https://www.figma.com/design/6VbZCv7W10O3pZ7N8Dkr3k/Cook---Food---Drink-Delivery-Mobile-App-UI-Kit-Free--Figma-Community---Community-?node-id=636-6466&m=dev

Task: Update `app/(tabs)/(order)/rate.tsx` to match the design.

Context:

- Framework: React Native (Expo)
- Styling: [NativeWind ]
- Platform target: iOS + Android

Rules:

- Match spacing, font size, color, and border-radius from Figma exactly
- Use existing color tokens where possible; only hardcode values if no token matches
- If a value cannot be matched exactly, use the closest equivalent and leave an inline comment: `// approx: <reason>`
- Do NOT return unchanged sections
