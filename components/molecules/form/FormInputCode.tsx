import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import OtpInput from '@/components/molecules/OTPInput';

type FormFieldOTPProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
};

export default function FormInputOTP<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  helperText,
  disabled,
  ...otpProps
}: FormFieldOTPProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value = '', onChange }, fieldState: { error } }) => (
        <View className="w-full">
          {!!label && <Text className="mb-2 text-sm font-medium text-neutral-600">{label}</Text>}

          <OtpInput {...otpProps} />
          {error?.message ? (
            <Text className="mt-2 text-xs text-red-600">{String(error.message)}</Text>
          ) : helperText ? (
            <Text className="mt-2 text-xs text-neutral-400">{helperText}</Text>
          ) : null}
        </View>
      )}
    />
  );
}
