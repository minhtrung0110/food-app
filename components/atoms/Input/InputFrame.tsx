import React, { forwardRef, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconCircleClose, IconLocation } from '@/components/atoms/Icons/filled';
import { cn } from '@/utils/style';
import { COLOR } from '@/constants/Colors';

type InputFrameProps = TextInputProps & {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  onClear?: () => void;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
};

const InputFrame = forwardRef<TextInput, InputFrameProps>(
  (
    {
      value,
      onChangeText,
      placeholder = 'Search location',
      onClear,
      leftIconName = 'location-outline',
      disabled,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <View
        className={cn(
          'bg-neutral-42 border-neutral-40 flex flex-row items-center rounded-2xl border px-4'
        )}>
        <IconLocation
          width={24}
          height={24}
          color={focused ? COLOR.neutral['200'] : COLOR.neutral['50']}
        />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor="#A5ADBA"
          className="flex-1 text-base leading-6 font-medium text-neutral-800"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {value?.length > 0 ? (
          <Pressable
            hitSlop={10}
            onPress={() => {
              onClear?.();
            }}
            className="ml-2">
            <IconCircleClose />
          </Pressable>
        ) : null}
      </View>
    );
  }
);
InputFrame.displayName = 'InputFrame';
export default InputFrame;
