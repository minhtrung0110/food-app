// lib/api.ts
import axios from 'axios';
import { authStore } from '@/stores/auth';

export const api = axios.create({ baseURL: 'https://api-ec.artstack.online' });

let refreshLock: Promise<string | null> | null = null;

api.interceptors.request.use((cfg) => {
  const access = authStore.getState().accessToken; // đọc trực tiếp, không gây re-render
  if (access) cfg.headers.Authorization = `Bearer ${access}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config as any;
    if (error.response?.status !== 401 || original._retry) throw error;
    original._retry = true;

    if (!refreshLock) {
      refreshLock = authStore.getState().refreshAccessToken(); // trả về access mới hoặc null
      refreshLock.finally(() => {
        refreshLock = null;
      });
    }
    const newAccess = await refreshLock;
    if (!newAccess) throw error;

    original.headers.Authorization = `Bearer ${newAccess}`;
    return api.request(original);
  }
);
