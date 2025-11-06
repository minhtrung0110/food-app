import React from 'react';
import { Slot } from 'expo-router';
import { Text, View } from 'react-native';
import IconFacebook from '@/components/atoms/Icons/logo/IconFacebook';
import { Button } from '@/components/atoms/Button';
import { IconGoogle } from '@/components/atoms/Icons/logo';

export default function SSOFlowLayout() {
  return (
    <>
      <Slot />
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
      </View>
    </>
  );
}
