// lib/secure.ts
import * as SecureStore from 'expo-secure-store';

const KEY_REFRESH = 'refresh_token';

export const saveRefresh = (t: string) =>
  SecureStore.setItemAsync(KEY_REFRESH, t, { keychainAccessible: SecureStore.WHEN_UNLOCKED });
export const loadRefresh = () => SecureStore.getItemAsync(KEY_REFRESH);
export const deleteRefresh = () => SecureStore.deleteItemAsync(KEY_REFRESH);
