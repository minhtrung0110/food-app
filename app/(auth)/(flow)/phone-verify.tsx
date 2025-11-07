import React, { useTransition } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'expo-router';
import { IconFacebook, IconGoogle } from '@/components/atoms/Icons/logo';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/molecules/form/FormInput';
import FormInputPassword from '@/components/molecules/form/FormInputPassword';
import { FormSignInData, signInSchema } from '@/libs/schema/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/style';
import AlertDialog from '@/components/molecules/modals/AlertDialog';

export default function PhoneVerify() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
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
      });
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'SignIn failed !');
    }
  });

  const onForgotPassword = () => {
    setOpen(true);
  };

  async function onGetStarted() {
    //await completeIntro();
    router.push('/(auth)/getting-started');
  }

  async function gotoCreateAccount() {
    //await completeIntro();
    router.push('/(auth)/signup');
  }
  const disabled = isSubmitting || isPending;
  return (
    <View className="mx-auto h-full w-full bg-white px-8 py-16">
      <View className={'mx-auto w-full items-center'}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{ width: 170, height: 170, resizeMode: 'contain' }}
        />
      </View>
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
            disabled={disabled}
            onPress={onSubmit}
            className={['rounded-full py-4', disabled ? 'opacity-60' : 'bg-primary-500'].join(' ')}>
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting || isPending ? 'Signing in…' : 'Sign in'}
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
      <View>
        {/* OR divider */}
        <View className="my-4 flex-row items-center">
          <View className="bg-neutral-40 h-[2px] flex-1" />
          <Text className="mx-3 text-xl font-normal text-neutral-500">OR</Text>
          <View className="bg-neutral-40 h-[2px] flex-1" />
        </View>

        <Button
          variant={'neutral'}
          label={'Connect with Facebook'}
          textClassName={'leading-6'}
          className={'h-auto px-10 py-4'}
          leftClassName={'mr-8'}
          leftIcon={<IconFacebook />}
        />
        <Button
          variant={'neutral'}
          label={'Connect with Google'}
          textClassName={'leading-6'}
          className={'my-3 h-auto px-10 py-4'}
          leftClassName={'mr-8'}
          leftIcon={<IconGoogle />}
        />
        <Button variant={'outline'} label={'Back'} onPress={onGetStarted} className={'my-6'} />
      </View>
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
    </View>
  );
}
