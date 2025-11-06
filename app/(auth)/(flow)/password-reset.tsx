import React, { useTransition } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormInputPassword from '@/components/molecules/form/FormInputPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormResetPasswordSchema, resetPasswordSchema } from '@/libs/schema/auth';

export default function PasswordReset() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange', // realtime validation
    defaultValues: {
      old_password: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // 1) Gọi API (RHF sẽ set isSubmitting = true)
      await new Promise((r) => setTimeout(r, 900)); // TODO: replace login API

      // 2) Sau khi thành công, bọc CẬP NHẬT UI trong transition
      startTransition(() => {
        // ví dụ: điều hướng & set state nặng (nếu có)
        router.push('/(tabs)');
      });
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'SignIn failed !');
    }
  });

  const disabled = !isValid || isSubmitting || isPending;
  return (
    <>
      <View className={'mx-auto mt-12 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Reset your password
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          At least 8 characters including uppercase and lowercase letters
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1 bg-white">
        <View className="flex-1 pt-8">
          <FormInputPassword<FormResetPasswordSchema>
            name="old_password"
            control={control}
            label=""
            placeholder="Enter your password"
            containerClassName="mb-6"
          />

          <FormInputPassword<FormResetPasswordSchema>
            name="password"
            control={control}
            label=""
            placeholder="Enter your password"
            containerClassName="mb-6"
          />

          {/* Submit */}
          <Pressable
            disabled={disabled}
            onPress={onSubmit}
            className={[
              'rounded-full py-4',
              disabled ? 'bg-neutral-300 opacity-60' : 'bg-primary-500',
            ].join(' ')}>
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting || isPending ? 'Sending...' : 'Update'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
