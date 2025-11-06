import React, { useTransition } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/molecules/form/FormInput';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormPasswordRecoverySchema, passwordRecoverySchema } from '@/libs/schema/auth';
import { ROUTES } from '@/constants/route';

export default function PasswordRecovery() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormPasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema), // realtime validation
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // 1) Gọi API (RHF sẽ set isSubmitting = true)
      await new Promise((r) => setTimeout(r, 900)); // TODO: replace login API

      // 2) Sau khi thành công, bọc CẬP NHẬT UI trong transition
      startTransition(() => {
        // ví dụ: điều hướng & set state nặng (nếu có)
        router.push(ROUTES.AUTH.verifyIdentity);
      });
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'SignIn failed !');
    }
  });

  const disabled = !isValid || isSubmitting || isPending;
  return (
    <>
      <View className={'mx-auto mt-20 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Password Recovery
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          Enter your email to recover your password
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1 bg-white">
        <View className="flex-1 pt-8">
          {/* Email */}
          <FormInput<FormPasswordRecoverySchema>
            name="email"
            control={control}
            label=""
            placeholder="jos.creative@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerClassName="mb-4"
          />

          <Pressable
            disabled={disabled}
            onPress={onSubmit}
            className={`bg-primary-500 mt-6 rounded-full py-4 ${disabled && 'opacity-60'}`}>
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting || isPending ? 'Sending…' : 'Send OTP'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
