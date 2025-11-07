import React, { useTransition } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/molecules/form/FormInput';
import FormInputPassword from '@/components/molecules/form/FormInputPassword';
import { FormSignInData, signInSchema } from '@/libs/schema/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/style';
import AlertDialog from '@/components/molecules/modals/AlertDialog';
import { ROUTES } from '@/constants/route';

export default function SignIn() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormSignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
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
        reset({ email: '', password: '' });
      });
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'SignIn failed !');
    }
  });

  const onForgotPassword = () => {
    setOpen(true);
  };

  async function gotoCreateAccount() {
    //await completeIntro();
    router.push(ROUTES.AUTH.signUp);
  }

  return (
    <>
      <View className={'mx-auto mt-12 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Welcome Back
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          Hello Jos, sign in to continue!
        </Text>
        <View className={'flex flex-row items-center justify-center gap-2'}>
          <Text className="text-center text-base leading-6 font-light text-neutral-100">Or</Text>
          <Pressable onPress={gotoCreateAccount}>
            <Text className="text-primary-500 text-center text-base leading-6 font-medium">
              Create new account
            </Text>
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1 bg-white">
        <View className="flex-1 pt-8">
          {/* Email */}
          <FormInput<FormSignInData>
            name="email"
            control={control}
            label=""
            placeholder="jos.creative@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerClassName="mb-4"
          />

          {/* Password */}
          <FormInputPassword<FormSignInData>
            name="password"
            control={control}
            label=""
            placeholder="Enter your password"
            containerClassName="mb-6"
          />

          {/* Submit */}
          <Pressable
            disabled={isPending || isSubmitting}
            onPress={onSubmit}
            className={`bg-primary-500 rounded-full py-4`}>
            <Text className="text-center text-lg font-semibold text-white">
              {isPending ? 'Signing in…' : 'Sign in'}
            </Text>
          </Pressable>

          {/* Forgot password */}
          <Pressable
            onPress={onForgotPassword}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            hitSlop={8}
            className="mt-4 rounded-xl">
            {({ pressed }) => (
              <Text
                className={cn(
                  'text-primary-500 text-center font-medium',
                  pressed && 'text-primary-400 font-semibold underline'
                )}>
                Forgot Password?
              </Text>
            )}
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
          router.push(ROUTES.AUTH.forgotPassword);
        }}
      />
    </>
  );
}
