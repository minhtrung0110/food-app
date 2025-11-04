// components/atoms/FormInputPassword.tsx
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { Control, Controller, FieldValues, get, Path, useFormState } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
  showValidIcon?: boolean; // mặc định true: hiện tick xanh khi hợp lệ
} & Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value' | 'secureTextEntry'>;

export default function FormInputPassword<T extends FieldValues>({
  name,
  control,
  label = 'Password',
  containerClassName,
  inputClassName,
  showValidIcon = true,
  ...rest
}: Props<T>) {
  const [visible, setVisible] = useState(false);

  const { errors, touchedFields, dirtyFields } = useFormState({ control, name });
  const fieldError = get(errors, name);
  const isTouched = !!get(touchedFields, name) || !!get(dirtyFields, name);
  const isInvalid = !!fieldError;
  const isValid = isTouched && !isInvalid;

  return (
    <View className={containerClassName}>
      {label ? <Text className="mb-2 text-sm font-semibold text-neutral-800">{label}</Text> : null}

      <View
        className={[
          'flex-row items-center rounded-2xl px-4',
          'bg-neutral-42',
          isInvalid ? 'ring-2 ring-red-500' : 'ring-0',
        ].join(' ')}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              className={['flex-1 py-3 text-base leading-8 text-neutral-800', inputClassName].join(
                ' '
              )}
              placeholder="••••••••"
              placeholderTextColor="#97A0AF"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={(value as any) ?? ''}
              secureTextEntry={!visible}
              {...rest}
            />
          )}
        />

        {/*/!* Tick xanh khi hợp lệ (tuỳ chọn) *!/*/}
        {/*{showValidIcon && (*/}
        {/*  <CheckIcon*/}
        {/*    className={cn(!isValid ? 'text-neutral-400' : 'text-green-500')}*/}
        {/*    style={{ marginRight: 8, opacity: isTouched ? 1 : 0.7 }}*/}
        {/*  />*/}
        {/*)}*/}

        {/* Eye toggle */}
        <Pressable
          hitSlop={8}
          onPress={() => setVisible((v) => !v)}
          className="my-2"
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}>
          {visible ? <Eye size={22} /> : <EyeOff size={22} />}
        </Pressable>
      </View>

      {!!fieldError && (
        <Text className="mt-1 text-xs text-red-500">
          {(fieldError.message as string) || 'Invalid'}
        </Text>
      )}
    </View>
  );
}
