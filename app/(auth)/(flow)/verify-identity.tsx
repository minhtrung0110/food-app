import React, { useTransition } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/atoms/Button';
import { FormOTPRecoverySchema, OTPRecoverySchema } from '@/libs/schema/auth';
import FormInputOTP from '@/components/molecules/form/FormInputCode';

export default function VerifyIdentity() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormOTPRecoverySchema>({
    resolver: zodResolver(OTPRecoverySchema),
    mode: 'onChange', // realtime validation
    defaultValues: {
      otp: '',
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

  async function gotoCreateAccount() {
    //await completeIntro();
    router.push('/(auth)/signup');
  }
  const disabled = !isValid || isSubmitting || isPending;
  return (
    <>
      <View className={'mx-auto mt-12 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Verify OTP
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          We have just sent a code to jos.creative@gmail.com.
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1 bg-white">
        <View className="flex-1 pt-8">
          <FormInputOTP control={control} name="otp" />

          {/* Submit */}
          <Pressable
            disabled={disabled}
            onPress={onSubmit}
            className={[
              'rounded-2xl py-4',
              disabled ? 'bg-neutral-300 opacity-60' : 'bg-primary-500',
            ].join(' ')}>
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting || isPending ? 'Going…' : 'Next'}
            </Text>
          </Pressable>

          <Button
            variant={'neutral'}
            label={'Send again'}
            textClassName={'leading-6 text-neutral-800 font-medium'}
            className={'mt-6 h-auto px-10 py-4'}
          />
        </View>
      </KeyboardAvoidingView>

      <View className={'flex flex-col items-center justify-center gap-0'}>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          By signing up you agree to
        </Text>
        <Pressable onPress={gotoCreateAccount}>
          <Text className="text-primary-500 text-center text-base leading-6 font-medium">
            our terms of service and privacy policy.
          </Text>
        </Pressable>
      </View>
    </>
  );
}
