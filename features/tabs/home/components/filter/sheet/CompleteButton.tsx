import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

export const CompleteButton = ({ onPress, disabled }: Props) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    width: '100%',
  }));

  return (
    <View className="w-full px-10">
      <Pressable
        className="w-full"
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(0.98, { duration: 80 });
          opacity.value = withTiming(0.9, { duration: 80 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
          opacity.value = withTiming(1, { duration: 120 });
        }}
        hitSlop={8}
        accessibilityRole="button">
        <Animated.View style={aStyle}>
          {/* View thường => className chắc chắn apply */}
          <View
            className={`bg-primary-500 w-full rounded-2xl py-4 ${disabled ? 'opacity-50' : ''}`}>
            <Text className="text-center text-base leading-5 font-medium tracking-tight text-white">
              Complete
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};
