import { Alert, Text, View } from 'react-native';
import { OTPInput, OTPInputRef, SlotProps } from 'input-otp-native';
import { useEffect, useRef } from 'react';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '@/utils/style';

export default function OtpInput() {
  const ref = useRef<OTPInputRef>(null);
  const onComplete = (code: string) => {
    Alert.alert('Completed with code:', code);
    ref.current?.clear();
  };

  return (
    <OTPInput
      ref={ref}
      onComplete={onComplete}
      maxLength={5}
      render={({ slots }) => (
        <View className="my-4 flex-row items-center justify-center gap-2">
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </View>
      )}
    />
  );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn(
        `h-[50px] w-[50px] items-center justify-center rounded-lg border border-gray-200 bg-white ${isActive && 'border-2 border-black'}`
      )}>
      {char !== null && <Text className="text-2xl font-medium text-gray-900">{char}</Text>}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 28,
    backgroundColor: '#000',
    borderRadius: 1,
  };

  return (
    <View className="absolute h-full w-full items-center justify-center">
      <Animated.View style={[baseStyle, animatedStyle]} />
    </View>
  );
}
