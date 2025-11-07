import { Button } from '@/components/atoms/Button';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function FindLocation() {
  return (
    <View className="mx-auto h-full w-full bg-white px-8 py-16">
      <View className={'mx-auto mt-6 w-full items-center'}>
        <Image
          source={require('@/assets/images/find-location.png')}
          style={{ width: 170, height: 170, resizeMode: 'contain' }}
        />
      </View>
      <View className={'mx-auto mt-12 w-full'}>
        <Text className="text-center text-2xl leading-8 font-bold text-neutral-800">
          Find Nearby Restaurants
        </Text>
        <Text className="text-center text-base leading-6 font-light text-neutral-100">
          Enter your location or allow access to your location to find restaurants near you.
        </Text>
      </View>

      <View className={'mt-10 space-y-4'}>
        <Button variant={'neutral'} label={'Use current location'} className={'rounded-2xl py-3'} />
      </View>
    </View>
  );
}
