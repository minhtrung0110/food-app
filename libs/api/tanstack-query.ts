import { QueryClient } from '@tanstack/react-query';
import { focusManager, onlineManager } from '@tanstack/query-core';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const tanstackQuery = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 45_000,
    },
  },
});
// App focus -> refetch khi app active (RN không có "window focus" như web)
focusManager.setEventListener((handleFocus) => {
  const sub = AppState.addEventListener('change', (state) => {
    handleFocus(state === 'active');
  });
  return () => sub.remove();
});
// (TanStack hướng dẫn refetch theo focus + dùng focusManager) :contentReference[oaicite:1]{index=1}

// Online/offline -> refetch khi reconnect
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});
// (TanStack hướng dẫn onlineManager + NetInfo cho RN) :contentReference[oaicite:2]{index=2}
