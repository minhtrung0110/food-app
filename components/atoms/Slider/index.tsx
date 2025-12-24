import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { cn } from '@/utils/style';
import { COLOR } from '@/constants/Colors';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (v: number) => void;
  className?: string;
};

export const UISlider = ({
  min = 0,
  max = 10,
  step = 0.5,
  value = 5,
  onChange,
  className,
}: Props) => {
  const [v, setV] = useState(value);

  const leftLabel = useMemo(() => `$ ${min.toFixed(2)}`, [min]);
  const rightLabel = useMemo(() => `$ ${max.toFixed(2)}`, [max]);

  return (
    <View className={cn('bg-neutral-42 gap-4 rounded-2xl px-5 py-4', className)}>
      <View className="flex-row items-center justify-between">
        <Text className="font-normaltext-neutral-800 text-base leading-6">{leftLabel}</Text>
        <Text className="font-normaltext-neutral-800 text-base leading-6">{rightLabel}</Text>
      </View>

      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={v}
        minimumTrackTintColor={COLOR.primary['400']} // cam
        maximumTrackTintColor={COLOR.neutral['50']} // xám nhạt
        thumbTintColor={COLOR.primary['500']}
        onValueChange={(val) => {
          setV(val);
          onChange?.(val);
        }}
      />

      {/* nếu muốn show value hiện tại */}
      {/* <Text className="mt-1 text-sm text-neutral-600">Selected: $ {v.toFixed(2)}</Text> */}
    </View>
  );
};
