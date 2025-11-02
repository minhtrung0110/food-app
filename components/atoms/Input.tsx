import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '@/utils/style';

export type InputProps = TextInputProps & {
  label?: string;
  errorText?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  secureToggle?: boolean; // hiện nút show/hide
};

export function Input({
  label,
  errorText,
  left,
  right,
  containerClassName,
  inputClassName,
  secureTextEntry,
  secureToggle,
  placeholderTextColor = '#97A0AF', // neutral-80
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState(!!secureTextEntry);
  const showError = !!errorText;

  return (
    <View className={cn('w-full', containerClassName)}>
      {label ? <Text className="mb-1 text-neutral-400">{label}</Text> : null}

      <View
        className={cn(
          'h-12 flex-row items-center rounded-xl border bg-white px-3',
          showError ? 'border-red-500' : 'border-neutral-40'
        )}>
        {left ? <View className="mr-2">{left}</View> : null}

        <TextInput
          className={cn('flex-1 text-[16px] text-neutral-400', inputClassName)}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hidden}
          {...rest}
        />

        {secureToggle ? (
          <Pressable onPress={() => setHidden((v) => !v)} className="ml-2 px-1 py-1">
            <Text className="text-primary-500">{hidden ? 'Show' : 'Hide'}</Text>
          </Pressable>
        ) : right ? (
          <View className="ml-2">{right}</View>
        ) : null}
      </View>

      {showError ? <Text className="mt-1 text-red-500">{errorText}</Text> : null}
    </View>
  );
}
