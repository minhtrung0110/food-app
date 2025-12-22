import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type TabsItem<K extends string = string> = {
  key: K;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
};

type TabLayout = { x: number; width: number };

type UITabsProps<K extends string = string> = {
  items: TabsItem<K>[];
  value?: K; // controlled
  defaultValue?: K; // uncontrolled
  onChange?: (key: K) => void;

  /** style hooks */
  tabBarClassName?: string;
  tabItemClassName?: string;
  contentClassName?: string;

  /** animation */
  durationMs?: number;
  indicatorHeight?: number;
  indicatorColor?: string;

  /** make indicator shorter like design */
  indicatorWidthRatio?: number; // 0..1 (default 0.55)
};

export function UITabs<K extends string = string>({
  items,
  value,
  defaultValue,
  onChange,

  tabBarClassName = 'bg-white px-6 pt-4',
  tabItemClassName = 'py-3',
  contentClassName = '',

  durationMs = 220,
  indicatorHeight = 2,
  indicatorColor = '#F59E0B', // ~ amber-500
  indicatorWidthRatio = 0.55,
}: UITabsProps<K>) {
  const isControlled = value != null;

  const firstKey = items[0]?.key;
  const initialKey = useMemo<K>(() => {
    return (value ?? defaultValue ?? firstKey) as K;
  }, [value, defaultValue, firstKey]);

  const [innerKey, setInnerKey] = useState<K>(initialKey);
  const activeKey = (isControlled ? (value as K) : innerKey) ?? initialKey;

  const layoutsRef = useRef<Record<string, TabLayout>>({});
  const readyRef = useRef(false);

  const indX = useSharedValue(0);
  const indW = useSharedValue(0);

  const setIndicator = (key: K, animate: boolean) => {
    const layout = layoutsRef.current[key];
    if (!layout) return;

    const rawW = layout.width;
    const w = Math.max(18, rawW * indicatorWidthRatio);
    const x = layout.x + (rawW - w) / 2;

    const cfg = {
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
    };

    if (animate) {
      indX.value = withTiming(x, cfg);
      indW.value = withTiming(w, cfg);
    } else {
      indX.value = x;
      indW.value = w;
    }
  };

  useEffect(() => {
    if (!readyRef.current) return;
    setIndicator(activeKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  const onTabLayout = (key: K) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layoutsRef.current[key] = { x, width };

    // First time: sync indicator without animation to avoid "jump"
    const hasActive = !!layoutsRef.current[activeKey];
    if (!readyRef.current && hasActive) {
      readyRef.current = true;
      setIndicator(activeKey, false);
    }
  };

  const onPressTab = (key: K, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setInnerKey(key);
    onChange?.(key);
    // indicator will animate by effect once state changes
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indX.value }],
    width: indW.value,
    height: indicatorHeight,
    backgroundColor: indicatorColor,
    borderRadius: 999,
  }));

  const activeItem = items.find((it) => it.key === activeKey) ?? items[0];

  return (
    <View>
      {/* Tab bar */}
      <View className={tabBarClassName}>
        <View className="relative flex-row items-center justify-between py-6">
          {items.map((it) => {
            const isActive = it.key === activeKey;
            return (
              <Pressable
                key={it.key}
                onPress={() => onPressTab(it.key, it.disabled)}
                onLayout={onTabLayout(it.key)}
                disabled={it.disabled}
                hitSlop={8}
                className={tabItemClassName}
                style={{ opacity: it.disabled ? 0.45 : 1 }}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive, disabled: !!it.disabled }}>
                <Text
                  className={[
                    'text-base font-semibold',
                    isActive ? 'text-amber-500' : 'text-neutral-900',
                  ].join(' ')}>
                  {it.label}
                </Text>
              </Pressable>
            );
          })}

          {/* Indicator */}
          <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0 }, indicatorStyle]} />
        </View>

        {/* (optional) divider like design subtle */}
        <View className="bg-neutral-42 h-px" />
      </View>

      {/* Content */}
      <View className={contentClassName}>{activeItem?.children}</View>
    </View>
  );
}
