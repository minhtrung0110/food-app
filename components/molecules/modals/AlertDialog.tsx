// components/overlays/AlertDialog.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@/constants/Colors';

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  closable?: boolean; // chạm nền để đóng
};

export default function AlertDialog({
  visible,
  title = 'Forgot Password',
  message = 'Go to reset password screen?',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  closable = true,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current; // dim
  const translate = useRef(new Animated.Value(24)).current; // slide up 24px

  useEffect(() => {
    if (visible) {
      // show
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(translate, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    } else {
      // reset ngay để lần sau vào từ dưới lên
      fade.setValue(0);
      translate.setValue(24);
    }
  }, [visible, fade, translate]);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      hardwareAccelerated>
      {/* Lớp phủ toàn màn hình để căn giữa */}
      <View style={[styles.fill, styles.center]}>
        {/* DIM nền (full-screen) */}
        <Animated.View
          style={[styles.fill, { backgroundColor: COLOR.overlay['dark'], opacity: fade }]}
          // chạm nền để đóng (nếu cho phép)
          pointerEvents={closable ? 'auto' : 'none'}>
          {closable && <Pressable style={styles.fill} onPress={onCancel} />}
        </Animated.View>

        {/* CARD: slide + fade */}
        <Animated.View style={{ transform: [{ translateY: translate }], opacity: fade }}>
          <View className="w-[88%] rounded-2xl bg-white p-5">
            {!!title && (
              <Text className="mb-1 text-lg font-semibold text-neutral-800">{title}</Text>
            )}
            {!!message && <Text className="mb-4 text-neutral-400">{message}</Text>}

            <View className="mt-2 flex-row justify-end gap-3">
              <Pressable onPress={onCancel} className="rounded-xl px-4 py-3">
                <Text className="font-medium text-neutral-400">{cancelText}</Text>
              </Pressable>
              <Pressable onPress={onConfirm} className="rounded-xl bg-red-500 px-6 py-3">
                <Text className="font-semibold text-white">{confirmText}</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject },
  center: { justifyContent: 'center', alignItems: 'center' },
});
