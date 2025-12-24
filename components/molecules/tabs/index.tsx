import { cn } from '@/utils/style';
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
type LabelLayout = { x: number; width: number };

type UITabsProps<K extends string = string> = {
  items: TabsItem<K>[];
  value?: K;
  defaultValue?: K;
  onChange?: (key: K) => void;
  tabHeaderClassName?: string;
  tabBarClassName?: string;
  tabItemClassName?: string;
  contentClassName?: string;

  durationMs?: number;
  indicatorHeight?: number;
  indicatorColor?: string;
  indicatorPaddingX?: number;
};

export function UITabs<K extends string = string>({
  items,
  value,
  defaultValue,
  onChange,
  tabHeaderClassName,
  tabBarClassName = 'bg-white ',
  tabItemClassName = 'py-3',
  contentClassName = '',

  durationMs = 220,
  indicatorHeight = 2,
  indicatorColor = '#F59E0B',
  indicatorPaddingX = 6,
}: UITabsProps<K>) {
  const isControlled = value != null;

  const firstKey = items[0]?.key;
  const initialKey = useMemo<K>(() => {
    return (value ?? defaultValue ?? firstKey) as K;
  }, [value, defaultValue, firstKey]);

  const [innerKey, setInnerKey] = useState<K>(initialKey);
  const activeKey = (isControlled ? (value as K) : innerKey) ?? initialKey;

  const tabLayoutsRef = useRef<Record<string, TabLayout>>({});
  const labelLayoutsRef = useRef<Record<string, LabelLayout>>({});
  const readyRef = useRef(false);

  const indX = useSharedValue(0);
  const indW = useSharedValue(0);

  const setIndicator = (key: K, animate: boolean) => {
    const tab = tabLayoutsRef.current[key];
    const label = labelLayoutsRef.current[key];
    if (!tab || !label) return;

    const w = Math.max(18, label.width + indicatorPaddingX * 2);
    const x = tab.x + label.x - indicatorPaddingX;

    const cfg = { duration: durationMs, easing: Easing.out(Easing.cubic) };

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

  const tryReady = () => {
    const hasTab = !!tabLayoutsRef.current[activeKey];
    const hasLabel = !!labelLayoutsRef.current[activeKey];
    if (!readyRef.current && hasTab && hasLabel) {
      readyRef.current = true;
      setIndicator(activeKey, false); // sync lần đầu không animate để khỏi “nhảy”
    }
  };

  const onTabLayout = (key: K) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    tabLayoutsRef.current[key] = { x, width };
    tryReady();
  };

  const onLabelLayout = (key: K) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    labelLayoutsRef.current[key] = { x, width };
    tryReady();
  };

  const onPressTab = (key: K, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setInnerKey(key);
    onChange?.(key);
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
      <View className={tabBarClassName}>
        <View
          className={cn(
            'relative flex-row items-center justify-between px-8 py-6',
            tabHeaderClassName
          )}>
          {items.map((it) => {
            const isActive = it.key === activeKey;
            return (
              <Pressable
                key={it.key}
                onPress={() => onPressTab(it.key, it.disabled)}
                onLayout={onTabLayout(it.key)}
                disabled={it.disabled}
                hitSlop={8}
                className={cn('flex-1 items-center', tabItemClassName)}
                style={{ opacity: it.disabled ? 0.45 : 1 }}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive, disabled: !!it.disabled }}>
                <Text
                  onLayout={onLabelLayout(it.key)}
                  className={[
                    'text-base leading-5 font-semibold',
                    isActive ? 'text-primary-500' : 'text-neutral-900',
                  ].join(' ')}>
                  {it.label}
                </Text>
              </Pressable>
            );
          })}

          {/* Indicator: bỏ w-full để không “đè” width animated */}
          <Animated.View
            className={'h-0.5 rounded-full'}
            style={[{ position: 'absolute', bottom: 0, left: 0 }, indicatorStyle]}
          />
        </View>

        <View className="bg-neutral-42 h-px" />
      </View>

      <View className={contentClassName}>{activeItem?.children}</View>
    </View>
  );
}
