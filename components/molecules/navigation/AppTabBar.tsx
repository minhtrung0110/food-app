import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { COLOR } from '@/constants/Colors';

type ItemLayout = { x: number; width: number };
type LayoutMap = Record<string, ItemLayout>;

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { height: screenH } = useWindowDimensions();

  // Scale nhẹ theo màn hình (giữ trong khoảng đẹp)
  const BASE_H = Math.round(Math.min(72, Math.max(60, screenH * 0.08)));
  const CONTAINER_H = BASE_H + insets.bottom;

  const [layouts, setLayouts] = useState<LayoutMap>({});

  const x = useSharedValue(0);
  const w = useSharedValue(0);
  const opacity = useSharedValue(0);

  const springCfg = useMemo(() => ({ damping: 18, stiffness: 220, mass: 0.7 }), []);

  useEffect(() => {
    const key = state.routes[state.index]?.key;
    const layout = key ? layouts[key] : undefined;
    if (!layout) return;

    // pill trượt + co giãn theo item
    x.value = withSpring(layout.x, springCfg);
    w.value = withSpring(layout.width, springCfg);
    opacity.value = withTiming(1, { duration: 120 });
  }, [layouts, state.index, springCfg, x, w, opacity]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    width: w.value,
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.outer,
        {
          height: CONTAINER_H,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}>
      <View style={[styles.inner, { height: BASE_H }]}>
        {/* Pill indicator */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              height: BASE_H - 6,
              backgroundColor: COLOR?.primary?.['400'] ?? '#34D399',
            },
            indicatorStyle,
          ]}
        />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}
              onLayout={(e) => {
                const { x, width } = e.nativeEvent.layout;
                setLayouts((prev) => ({ ...prev, [route.key]: { x, width } }));
              }}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}>
              {/* icon từ options.tabBarIcon của bạn */}
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? COLOR.white : COLOR.neutral['100'],
                size: 26,
              })}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(248,248,248,0.25)',
    overflow: 'hidden',

    // shadow iOS + elevation Android
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 2.5,
    borderRadius: 999,
  },
  item: {
    flex: 1,
    minWidth: 55,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
