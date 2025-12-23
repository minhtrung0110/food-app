import { partnersSample } from '@/libs/seed/partner';
import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import React from 'react';
import { IconShield, IconStar } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';

export type Partner = (typeof partnersSample)[number];

export const PartnerCard = ({ item }: { item: Partner }) => {
  const isOpen = item.status === 'open';
  return (
    <View className="gap-4">
      {/* Image */}
      <View className="overflow-hidden rounded-2xl bg-neutral-100">
        <AppImage
          source={item.image}
          className="aspect-3/2 h-[130px] w-full min-w-[210px]"
          contentFit="cover"
        />
      </View>
      <View className={'flex-col gap-3'}>
        <View className={'flex-col gap-1'}>
          <View className="flex-row items-center gap-2">
            <Text
              numberOfLines={1}
              className="text-[20px] leading-7 font-extrabold tracking-tight text-neutral-900">
              {item.name}
            </Text>

            <IconShield width={32} height={32} />
          </View>

          {/* Status • Location */}
          <View className="flex-row items-center gap-2">
            <Text
              className={
                isOpen ? 'text-sm font-medium text-emerald-700' : 'text-sm font-medium text-red-500'
              }>
              {isOpen ? 'Open' : 'Close'}
            </Text>
            <Text className="text-neutral-50">•</Text>
            <Text numberOfLines={1} className="flex-1 text-sm font-medium text-neutral-100">
              {item.cityStateZip}
            </Text>
          </View>
        </View>

        {/* Chips row */}
        <View className="flex-row items-center gap-1.5">
          {/* Rating pill */}
          <View className="bg-primary-400 flex-row items-center gap-2 rounded-full p-2">
            <IconStar width={16} height={16} fill={COLOR.white} />
            <Text className="text-sm leading-3 font-medium text-white">
              {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-neutral-50">•</Text>
          {/* Distance */}
          <Text className="text-[14px] leading-5 font-semibold text-neutral-800">
            {item.distanceKm.toFixed(1)}km
          </Text>
          <Text className="text-neutral-50">•</Text>
          {/* Free shipping */}
          {item.freeShipping ? (
            <Text className="text-[14px] leading-5 font-semibold text-neutral-800">
              Free shipping
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};
