import { useCallback } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useConfirm } from '@/providers/ConfirmProvider';

export default function useConfirmExitOnBack() {
  const { confirm } = useConfirm();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;

      const onBack = () => {
        // Show your custom UI instead of the default Alert
        confirm({
          title: 'Exit app?',
          message: 'Do you really want to close the application?',
          confirmText: 'Exit',
          cancelText: 'Stay',
          destructive: true,
        }).then((ok) => {
          if (ok) BackHandler.exitApp();
        });

        return true; // we handled the back press
      };

      const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => sub.remove();
    }, [confirm])
  );
}
