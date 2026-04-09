import React from 'react';
import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import type { MenuItem } from '@/libs/seed/restaurant';

export const PopularItemCard = ({ item }: { item: MenuItem }) => {
  return (
    <View className="gap-[7px]">
      <View className="h-[146px] w-[145px] overflow-hidden rounded-[15px]">
        <AppImage source={item.image} className="h-full w-full" contentFit="cover" />
      </View>
      <View className="w-[145px] gap-[2px]">
        <Text
          numberOfLines={2}
          className="text-[16px] font-medium leading-5 tracking-tight text-[#172B4D]">
          {item.name}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-medium text-green-400">$ {item.price.toFixed(2)}</Text>
          <View className="h-[3px] w-[3px] rounded-full bg-neutral-50" />
          <Text className="text-xs font-medium text-neutral-100">{item.category}</Text>
        </View>
      </View>
    </View>
  );
};
