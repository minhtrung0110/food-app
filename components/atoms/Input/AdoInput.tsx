import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { RefObject, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { COLOR } from '@/constants/Colors';

interface InputProps {
  label?: string;
  error?: string;
  inputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  control?: Control<any>;
  name?: string;
  pressable?: boolean;
  onPress?: () => void;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  require?: boolean;
  inputRef?: RefObject<TextInput>;
}

export const AdoInput = ({
  label,
  error,
  inputProps,
  containerStyle,
  style,
  name,
  control,
  onPress,
  startAdornment,
  endAdornment,
  inputStyle,
  require,
  inputRef,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={containerStyle}>
      {label ? (
        <Text
          className={'mb-2 text-base font-semibold'}
          style={{
            color: COLOR.neutral['400'],
          }}>
          {label} <Text className={'text-base text-red-500'}>{require ? '*' : ''}</Text>
        </Text>
      ) : null}

      <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
        <View
          className={
            'flex-row items-center justify-center gap-1 overflow-hidden rounded-xl border px-3'
          }
          style={[
            {
              borderColor: isFocus ? COLOR.primary['500'] : COLOR.neutral['100'],
            },
            style,
          ]}>
          {startAdornment}
          {control && name ? (
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onBlur, onChange } }) => {
                return (
                  <TextInput
                    ref={inputRef}
                    className={'flex-1 p-0'}
                    style={[inputStyle, { paddingVertical: 16 }]}
                    value={value}
                    onChangeText={onChange}
                    onEndEditing={onBlur}
                    placeholderTextColor={COLOR.neutral['300']}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    {...inputProps}
                  />
                );
              }}
            />
          ) : (
            <TextInput
              ref={inputRef}
              className={'max-h-[56] flex-1 p-0'}
              style={[inputStyle, { paddingVertical: 16 }]}
              placeholderTextColor={COLOR.neutral['300']}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              {...inputProps}
            />
          )}
          {endAdornment}
        </View>
      </TouchableOpacity>
      {error ? (
        <Text className={'mt-0.5 text-sm leading-6 font-bold text-red-500'}>{error}</Text>
      ) : null}
    </View>
  );
};
