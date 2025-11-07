import React, { forwardRef, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      <View className="relative">
        <View
          className={[
            'flex-row items-center rounded-full px-4',
            'border bg-white',
            focused ? 'border-blue-300' : 'border-neutral-40',
          ].join(' ')}
          style={{ height: 44 }}>
          <Ionicons name={leftIconName} size={18} color="#97A0AF" style={{ marginRight: 6 }} />
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor="#A5ADBA"
            className="flex-1 text-base text-neutral-800"
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
              <View className="bg-neutral-42 h-6 w-6 items-center justify-center rounded-full">
                <Ionicons name="close" size={14} color="#505F79" />
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }
);

export default InputFrame;
