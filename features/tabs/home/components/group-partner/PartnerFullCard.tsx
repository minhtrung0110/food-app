import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import React from 'react';
import { IconCurrency, IconLocation, IconShield, IconStar } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';
import { PartnerCard } from '@/libs/seed/group-partner';

export const PartnerFullCard = ({ item }: { item: PartnerCard }) => {
  const isOpen = item.status === 'open';
  return (
    <View className="gap-4">
      {/* Image */}
      <View className="overflow-hidden rounded-2xl bg-neutral-100">
        <AppImage
          source={item.image}
          className="aspect-3/2 h-auto w-full max-w-full object-cover"
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

            <View className="flex-row flex-wrap items-center gap-2">
              {item.cuisines.map((chd, index) => (
                <View key={index} className="flex-row items-center gap-1">
                  <Text className="px-2 text-neutral-100">•</Text>
                  <Text numberOfLines={1} className="text-sm font-medium text-neutral-500">
                    {chd}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Chips row */}
        <View className="flex-row items-center gap-1.5">
          {/* Rating pill */}
          <View className="bg-primary-400 flex-row items-center gap-2 rounded-xl p-2">
            <IconStar width={16} height={16} fill={COLOR.white} />
            <Text className="text-sm leading-3 font-medium text-white">
              {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-neutral-50">•</Text>
          {/* Distance */}
          <IconLocation width={20} height={20} color={COLOR.neutral['50']} />
          <Text className="text-[14px] leading-5 font-semibold text-neutral-800">
            {item.distanceKm.toFixed(1)}km
          </Text>
          <Text className="text-neutral-50">•</Text>
          {/* Free shipping */}
          <IconCurrency width={20} height={20} color={COLOR.neutral['50']} />
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
