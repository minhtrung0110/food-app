import React from 'react';
import { Slot } from 'expo-router';
import { Image, View } from 'react-native';

export default function FindLocation() {
  return (
    <View className="mx-auto h-full w-full bg-white px-8 py-16">
      <View className={'mx-auto mt-6 w-full items-center'}>
        <Image
          source={require('@/assets/images/find-location.png')}
          style={{ width: 170, height: 170, resizeMode: 'contain' }}
        />
      </View>
      <Slot />
    </View>
  );
}
