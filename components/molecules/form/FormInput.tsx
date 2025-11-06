// components/atoms/FormInput.tsx
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { Control, Controller, FieldValues, get, Path, useFormState } from 'react-hook-form';
import IconCircleCheck from '@/components/atoms/Icons/filled/IconCircleTick';
import { COLOR } from '@/constants/Colors';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
} & Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value'>;

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  containerClassName,
  inputClassName,
  ...rest
}: Props<T>) {
  // lấy formState để biết invalid/valid của riêng field
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
              className={['flex-1 text-base leading-8 text-neutral-800', inputClassName].join(' ')}
              placeholderTextColor="#97A0AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={(value as any) ?? ''}
              {...rest}
            />
          )}
        />

        {/* IconCircleTick: xanh khi hợp lệ, xám khi chưa hợp lệ */}
        <IconCircleCheck color={isValid ? COLOR.green['500'] : COLOR.neutral['300']} />
      </View>

      {!!fieldError && (
        <Text className="mt-1 text-sm text-red-500">
          {(fieldError.message as string) || 'Invalid'}
        </Text>
      )}
    </View>
  );
}
