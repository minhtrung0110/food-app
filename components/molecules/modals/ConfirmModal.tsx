import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, Platform, Pressable, Text, View } from 'react-native';

export type ConfirmModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  visible,
  title = 'Are you sure?',
  message = 'Please confirm your action.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start();
    } else {
      fade.setValue(0);
      scale.setValue(0.95);
    }
  }, [visible, fade, scale]);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onCancel} // Android back when modal open -> close modal
    >
      {/* Backdrop */}
      <Animated.View className="flex-1 bg-black/50" style={{ opacity: fade }}>
        {/* Dismiss when tapping backdrop */}
        <Pressable className="flex-1" onPress={onCancel} />
      </Animated.View>

      {/* Card */}
      <View className="absolute inset-0 items-center justify-center px-6">
        <Animated.View
          style={{ transform: [{ scale }] }}
          className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-neutral-900">
          <Text className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </Text>
          <Text className="mt-2 text-neutral-600 dark:text-neutral-300">{message}</Text>

          <View className="mt-5 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center justify-center rounded-xl border border-neutral-300 px-4 py-3 dark:border-neutral-700">
              <Text className="font-medium text-neutral-800 dark:text-neutral-100">
                {cancelText}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className={`flex-1 items-center justify-center rounded-xl px-4 py-3 ${destructive ? 'bg-red-500' : 'bg-neutral-900 dark:bg-white'} `}>
              <Text
                className={`font-semibold ${destructive ? 'text-white' : 'text-white dark:text-neutral-900'}`}>
                {confirmText}
              </Text>
            </Pressable>
          </View>

          {/* Subtle hint for Android */}
          {Platform.OS === 'android' && (
            <Text className="mt-3 text-center text-xs text-neutral-500">
              Press back again to close this dialog.
            </Text>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
