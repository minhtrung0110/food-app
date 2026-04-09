import React from 'react';
import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { IconStar } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';
import type { MenuItem } from '@/libs/seed/restaurant';

export const MenuItemRow = ({ item }: { item: MenuItem }) => {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-[80px] w-[80px] overflow-hidden rounded-[15px]">
        <AppImage source={item.image} className="h-full w-full" contentFit="cover" />
      </View>
      <View className="flex-1 gap-2">
        <View className="flex-row items-start">
          <Text
            numberOfLines={1}
            className="flex-1 text-[16px] font-medium capitalize leading-6 tracking-tight text-[#172B4D]">
            {item.name}
          </Text>
          <IconStar
            width={24}
            height={24}
            color={item.isFavorite ? COLOR.primary[400] : COLOR.neutral[50]}
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-medium text-primary-400">$ {item.price.toFixed(2)}</Text>
          <View className="h-[3px] w-[3px] rounded-full bg-neutral-50" />
          <Text className="text-xs font-medium text-neutral-100">{item.category}</Text>
        </View>
      </View>
    </View>
  );
};
