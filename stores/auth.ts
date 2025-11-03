// stores/auth.ts
import { create } from 'zustand';
import { deleteRefresh, loadRefresh, saveRefresh } from '@/libs/secure';
import { api } from '@/libs/api';

type AuthState = {
  ready: boolean; // đã boot xong (silent refresh) để quyết định điều hướng
  accessToken: string | null;
  user: null | { id: string; name: string; phone?: string };
  setAccess: (t: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>; // cho interceptor dùng
  boot: () => Promise<void>; // chạy lúc app start sau AppLock
};

export const authStore = create<AuthState>((set, get) => ({
  ready: false,
  accessToken: null,
  user: null,

  setAccess: (t) => set({ accessToken: t }),

  signIn: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    set({ accessToken: data.accessToken, user: data.user ?? null });
    if (data.refreshToken) await saveRefresh(data.refreshToken);
  },

  signOut: async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    set({ accessToken: null, user: null });
    await deleteRefresh();
  },

  refreshAccessToken: async () => {
    try {
      const rt = await loadRefresh();
      if (!rt) return null;
      const { data } = await api.post('/auth/refresh', { refreshToken: rt });
      set({ accessToken: data.accessToken });
      // nếu BE rotation refresh:
      // if (data.refreshToken) await saveRefresh(data.refreshToken);
      return data.accessToken as string;
    } catch {
      await deleteRefresh();
      set({ accessToken: null, user: null });
      return null;
    }
  },

  boot: async () => {
    // Silent refresh khi mở app (sau AppLock nếu bạn dùng)
    await get().refreshAccessToken();
    set({ ready: true });
  },
}));
