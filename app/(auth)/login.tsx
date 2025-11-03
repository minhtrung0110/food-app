import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  async function onGetStarted() {
    //await completeIntro();
    router.replace('/(auth)/getting-started');
  }
  async function gotoCreateAccount() {
    //await completeIntro();
    router.replace('/(auth)/signup');
  }
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
      <View className={'mt-6'}></View>
      <View className={'mt-6'}>
        <Button variant={'primary'} label={'Sign In'} onPress={onGetStarted} />

        <Button variant={'ghost'} label={'Connect with Facebook'} />
        <Button variant={'ghost'} label={'Connect with Facebook'} />
      </View>
    </View>
  );
};

export default Login;
