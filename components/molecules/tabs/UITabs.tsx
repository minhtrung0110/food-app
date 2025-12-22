// Tabs.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TabKey = string;

export type TabsItem = {
  key: TabKey;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
};

type TabLayout = { x: number; width: number };

export type TabsProps = {
  items: TabsItem[];

  /** Controlled */
  activeKey?: TabKey;

  /** Uncontrolled */
  defaultActiveKey?: TabKey;

  onChange?: (key: TabKey) => void;

  /** Tab bar */
  scrollable?: boolean;
  gutter?: number; // gap between tabs
  paddingHorizontal?: number; // padding inside tab bar
  indicatorHeight?: number;
  durationMs?: number;

  /** Styles */
  containerClassName?: string;
  tabBarClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;

  style?: ViewStyle;
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,

  scrollable = false,
  gutter = 24,
  paddingHorizontal = 16,
  indicatorHeight = 2,
  durationMs = 220,

  containerClassName = 'bg-white rounded-2xl',
  tabBarClassName = 'border-b border-neutral-200',
  tabClassName = 'py-3',
  activeTabClassName = '',
  contentClassName = 'p-4',

  style,
}) => {
  const isControlled = activeKey != null;

  const firstKey = items[0]?.key;
  const initialKey = useMemo<TabKey>(() => {
    return activeKey ?? defaultActiveKey ?? firstKey ?? 'tab-0';
  }, [activeKey, defaultActiveKey, firstKey]);

  const [innerKey, setInnerKey] = useState<TabKey>(initialKey);
  const currentKey = (isControlled ? activeKey : innerKey) ?? initialKey;

  // Map key -> index
  const keyToIndex = useMemo(() => {
    const m = new Map<TabKey, number>();
    items.forEach((it, idx) => m.set(it.key, idx));
    return m;
  }, [items]);

  const activeIndex = keyToIndex.get(currentKey) ?? 0;

  // Scroll handling (for scrollable tab bar)
  const scrollRef = useRef<ScrollView | null>(null);
  const [barWidth, setBarWidth] = useState(0);

  // Measure tab layouts
  const layoutsRef = useRef<Record<TabKey, TabLayout>>({});
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);

  const syncIndicator = (animate: boolean) => {
    const l = layoutsRef.current[currentKey];
    if (!l) return;

    const cfg = {
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
    };

    if (animate) {
      indicatorX.value = withTiming(l.x, cfg);
      indicatorW.value = withTiming(l.width, cfg);
    } else {
      indicatorX.value = l.x;
      indicatorW.value = l.width;
    }

    if (scrollable && barWidth > 0) {
      const targetX = Math.max(0, l.x - barWidth / 2 + l.width / 2);
      scrollRef.current?.scrollTo({ x: targetX, animated: true });
    }
  };

  // Keep inner state in sync (uncontrolled)
  useEffect(() => {
    if (!isControlled) setInnerKey(initialKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When controlled key changes or layout updates, animate indicator
  useEffect(() => {
    syncIndicator(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey, barWidth, scrollable]);

  const onPressTab = (key: TabKey, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setInnerKey(key);
    onChange?.(key);
  };

  const onTabLayout = (key: TabKey) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layoutsRef.current[key] = { x, width };

    // First sync without animation (avoid jump)
    if (key === currentKey && indicatorW.value === 0) {
      syncIndicator(false);
    }
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: indicatorW.value,
      height: indicatorHeight,
    };
  });

  // Content pager (slide)
  const [contentWidth, setContentWidth] = useState(0);
  const pagerX = useSharedValue(0);

  useEffect(() => {
    if (contentWidth <= 0) return;
    const cfg = { duration: durationMs, easing: Easing.out(Easing.cubic) };
    pagerX.value = withTiming(-activeIndex * contentWidth, cfg);
  }, [activeIndex, contentWidth, durationMs, pagerX]);

  const pagerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pagerX.value }],
    };
  });

  return (
    <View className={containerClassName} style={style}>
      {/* Tab bar */}
      <View className={tabBarClassName}>
        {scrollable ? (
          <ScrollView
            ref={(r) => (scrollRef.current = r)}
            horizontal
            showsHorizontalScrollIndicator={false}
            onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
            contentContainerStyle={{
              paddingHorizontal,
              flexDirection: 'row',
              alignItems: 'center',
              gap: gutter,
              position: 'relative',
            }}>
            {items.map((it) => {
              const isActive = it.key === currentKey;
              return (
                <Pressable
                  key={it.key}
                  onPress={() => onPressTab(it.key, it.disabled)}
                  onLayout={onTabLayout(it.key)}
                  disabled={it.disabled}
                  hitSlop={8}
                  style={{ opacity: it.disabled ? 0.45 : 1 }}>
                  <View className={`${tabClassName} ${isActive ? activeTabClassName : ''}`}>
                    <Text
                      className={[
                        'text-[13px] font-semibold',
                        isActive ? 'text-orange-500' : 'text-neutral-700',
                      ].join(' ')}>
                      {it.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}

            {/* Ink bar */}
            <Animated.View
              className="absolute bottom-0 left-0 rounded-full bg-orange-500"
              style={indicatorStyle}
            />
          </ScrollView>
        ) : (
          <View
            className="relative flex-row items-center"
            style={{ paddingHorizontal, gap: gutter }}>
            {items.map((it) => {
              const isActive = it.key === currentKey;
              return (
                <Pressable
                  key={it.key}
                  onPress={() => onPressTab(it.key, it.disabled)}
                  onLayout={onTabLayout(it.key)}
                  disabled={it.disabled}
                  hitSlop={8}
                  style={{ opacity: it.disabled ? 0.45 : 1 }}>
                  <View className={`${tabClassName} ${isActive ? activeTabClassName : ''}`}>
                    <Text
                      className={[
                        'text-[13px] font-semibold',
                        isActive ? 'text-orange-500' : 'text-neutral-700',
                      ].join(' ')}>
                      {it.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}

            {/* Ink bar */}
            <Animated.View
              className="absolute bottom-0 left-0 rounded-full bg-orange-500"
              style={indicatorStyle}
            />
          </View>
        )}
      </View>

      {/* Content (animated slide) */}
      <View
        className={`overflow-hidden ${contentClassName}`}
        onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}>
        {contentWidth <= 0 ? (
          // fallback first render
          <View>{items[activeIndex]?.children}</View>
        ) : (
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                width: contentWidth * items.length,
              },
              pagerStyle,
            ]}>
            {items.map((it) => (
              <View key={it.key} style={{ width: contentWidth }}>
                {it.children}
              </View>
            ))}
          </Animated.View>
        )}
      </View>
    </View>
  );
};
