import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Portal } from '@gorhom/portal';

type Props = {
  visible: boolean;
  onClose: () => void;

  topOffset: number;

  /** fixed height optional */
  height?: number;

  /** cap tối đa (khuyên dùng) */
  maxHeight?: number;

  backdropOpacity?: number;
  enablePanToClose?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  panelStyle?: StyleProp<ViewStyle>;

  children: React.ReactNode;
};

export const AppTopSheet = ({
  visible,
  onClose,
  topOffset,
  height,
  maxHeight,
  backdropOpacity = 0.4,
  enablePanToClose = true,
  containerStyle,
  panelStyle,
  children,
}: Props) => {
  // rendered: giữ component tồn tại để chạy close animation
  const [rendered, setRendered] = useState(false);

  // đo theo từng lần mở
  const [measured, setMeasured] = useState(0);
  const [ready, setReady] = useState(false);

  const sheetH = height ?? measured;

  const y = useSharedValue(0);
  const backdrop = useSharedValue(0);
  const opacity = useSharedValue(0);

  const openingRef = useRef(false);

  // Khi visible bật -> mount
  useEffect(() => {
    if (visible) {
      setRendered(true);

      // reset cho mỗi lần mở (để lần nào cũng animate)
      openingRef.current = true;
      if (!height) {
        setMeasured(0);
        setReady(false);
      } else {
        setReady(true);
      }
    }
  }, [visible, height]);

  // OPEN animation (sau khi ready + có height)
  useEffect(() => {
    if (!visible) return;
    if (!rendered) return;
    if (!ready) return;
    if (!sheetH) return;
    if (!openingRef.current) return;

    openingRef.current = false;

    // set initial (ẩn trên) -> rơi xuống
    y.value = -sheetH;
    opacity.value = 1;
    backdrop.value = withTiming(1, { duration: 160 });
    y.value = withSpring(0, { damping: 18, stiffness: 220 });
  }, [visible, rendered, ready, sheetH]);

  // CLOSE animation (khi visible=false nhưng vẫn rendered)
  useEffect(() => {
    if (visible) return;
    if (!rendered) return;
    if (!sheetH) {
      setRendered(false);
      return;
    }

    // trượt lên + tắt backdrop
    backdrop.value = withTiming(0, { duration: 140 });
    y.value = withSpring(-sheetH, { damping: 20, stiffness: 260 }, (finished) => {
      if (finished) {
        opacity.value = 0;
        runOnJS(setRendered)(false);
      }
    });
  }, [visible, rendered, sheetH]);

  const pan = useMemo(() => {
    if (!enablePanToClose) return Gesture.Tap();
    return Gesture.Pan()
      .onUpdate((e) => {
        if (!sheetH) return;
        y.value = e.translationY < 0 ? e.translationY : 0;
      })
      .onEnd(() => {
        if (!sheetH) return;
        const shouldClose = y.value < -sheetH * 0.25;
        if (shouldClose) runOnJS(onClose)();
        else y.value = withSpring(0, { damping: 18, stiffness: 220 });
      });
  }, [enablePanToClose, sheetH, onClose]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value * backdropOpacity,
  }));

  const panelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: opacity.value,
  }));

  if (!rendered) return null;

  return (
    <Portal>
      <View style={[{ position: 'absolute', inset: 0, zIndex: 9999 }, containerStyle]}>
        <Animated.View
          pointerEvents="none"
          style={[{ position: 'absolute', inset: 0, backgroundColor: '#000' }, backdropStyle]}
        />
        <Pressable style={{ position: 'absolute', inset: 0 }} onPress={onClose} />

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: topOffset,
              left: 0,
              right: 0,

              height: sheetH || undefined,
              maxHeight,

              backgroundColor: '#fff',
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              overflow: 'hidden',
              ...(Platform.OS === 'ios'
                ? { shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
                : { elevation: 8 }),
            },
            panelAnimStyle,
            panelStyle,
          ]}>
          <GestureDetector gesture={pan}>
            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
              <View
                style={{
                  width: 52,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: '#E5E7EB',
                }}
              />
            </View>
          </GestureDetector>

          {/* đo height MỖI lần mở */}
          <View
            pointerEvents={ready ? 'auto' : 'none'}
            style={{ opacity: ready ? 1 : 0 }}
            onLayout={(e) => {
              if (height) return;
              const h = e.nativeEvent.layout.height;
              const next = maxHeight ? Math.min(h, maxHeight) : h;

              // đo lần đầu của mỗi lần mở
              if (!measured && next > 0) {
                setMeasured(next);
                setReady(true);
              }
            }}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
};
