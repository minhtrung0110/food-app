// src/stores/app/store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AppLocation = {
  place_id: number;
  display_name: string;
  lat: string; // string cho giống Nominatim/Photon
  lon: string;
  // optional: lưu thêm city/country nếu muốn
  address?: Record<string, string>;
};

type AppState = {
  // state
  location: AppLocation | null;

  // hydration state (để biết đã load từ storage chưa)
  hasHydrated: boolean;

  // actions
  setLocation: (loc: AppLocation) => void;
  clearLocation: () => void;
  setHasHydrated: (v: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      location: null,
      hasHydrated: false,

      setLocation: (loc) => set({ location: loc }),
      clearLocation: () => set({ location: null }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: 'app-store-v1', // key trong AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),

      // chỉ persist những field cần lưu lâu dài
      partialize: (state) => ({
        location: state.location,
      }),

      // hook để biết store đã restore xong
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('[AppStore] rehydrate error', error);
        }
        state?.setHasHydrated(true);
      },
    }
  )
);
