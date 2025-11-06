import React, { useTransition } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/molecules/form/FormInput';
import FormInputPassword from '@/components/molecules/form/FormInputPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertDialog from '@/components/molecules/modals/AlertDialog';
import { FormSignUpData, signUpSchema } from '@/libs/schema/sign-up';
import { ROUTES } from '@/constants/route';

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormSignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange', // realtime validation
    defaultValues: {
      name: '',
      email: '',
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

  async function gotoSignIn() {
    //await completeIntro();
    router.push(ROUTES.AUTH.signIn);
  }
  const disabled = !isValid || isSubmitting || isPending;
  return (
    <>
      <View className={'mx-auto mt-6 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Hello! Create Account
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          Already have an account?
        </Text>

        <Pressable onPress={gotoSignIn}>
          <Text className="text-primary-500 text-center text-base leading-6 font-medium">
            Sign in
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1 bg-white">
        <View className="flex-1 pt-8">
          {/* Name */}
          <FormInput<FormSignUpData>
            name="name"
            control={control}
            label=""
            placeholder="Your name"
            keyboardType="default"
            autoCapitalize="none"
            containerClassName="mb-4"
          />
          {/* Email */}
          <FormInput<FormSignUpData>
            name="email"
            control={control}
            label=""
            placeholder="jos.creative@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerClassName="mb-4"
          />

          {/* Password */}
          <FormInputPassword<FormSignUpData>
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
              {isSubmitting || isPending ? 'Signing in…' : 'Sign in'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <AlertDialog
        title={'Forgot Password'}
        message={'You will be redirected to the password recovery page.'}
        visible={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          router.push('/(auth)/forgot-password');
        }}
      />
    </>
  );
}
