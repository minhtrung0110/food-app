import { Stack } from 'expo-router';
import './globals.css';
import { authStore } from '@/stores/auth';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import { StatusBar } from 'expo-status-bar';
import AppBottomSheet from '@/components/orangism/AppBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { tanstackQuery } from '@/libs/api/tanstack-query';

export default function RootLayout() {
  const { ready, accessToken, boot } = authStore(
    useShallow((s) => ({ ready: s.ready, accessToken: s.accessToken, boot: s.boot }))
  );

  useEffect(() => {
    boot();
  }, []);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={tanstackQuery}>
        <StatusBar hidden={false} />
        <ConfirmProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {!accessToken ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
            {/*<Stack.Screen*/}
            {/*    name="movie/[id]"*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*    }}*/}
            {/*/>*/}
          </Stack>
        </ConfirmProvider>
        <AppBottomSheet />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
