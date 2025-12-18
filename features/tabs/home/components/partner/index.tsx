// Libraries
import React from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { partnersSample } from '@/libs/seed/partner';

// Types (optional)
type Partner = (typeof partnersSample)[number];

const PartnerCard = ({ item, width }: { item: Partner; width: number }) => {
  // 2 cards per viewport (p-5 left/right + gap)
  const GAP = 16;
  const cardWidth = (width - 40 - GAP) / 2;

  const isOpen = item.status === 'open';

  return (
    <View style={{ width: cardWidth }} className="gap-3">
      {/* Image */}
      <View className="overflow-hidden rounded-2xl bg-neutral-100">
        <AppImage source={item.image} className="h-[120px] w-full" contentFit="cover" />
      </View>

      {/* Name + Verified */}
      <View className="flex-row items-center gap-2">
        <Text
          numberOfLines={1}
          className="flex-1 text-[20px] leading-7 font-extrabold text-neutral-900">
          {item.name}
        </Text>

        {item.isVerified ? (
          <View className="h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
            <Text className="text-[12px] font-bold text-white">✓</Text>
          </View>
        ) : null}
      </View>

      {/* Status • Location */}
      <View className="flex-row items-center gap-2">
        <Text
          className={
            isOpen
              ? 'text-[14px] font-semibold text-emerald-600'
              : 'text-[14px] font-semibold text-neutral-500'
          }>
          {isOpen ? 'Open' : 'Close'}
        </Text>
        <Text className="text-neutral-400">•</Text>
        <Text numberOfLines={1} className="flex-1 text-[14px] font-medium text-neutral-500">
          {item.cityStateZip}
        </Text>
      </View>

      {/* Chips row */}
      <View className="flex-row items-center gap-3">
        {/* Rating pill */}
        <View className="flex-row items-center gap-2 rounded-full bg-amber-500 px-3 py-2">
          <Text className="text-white">★</Text>
          <Text className="text-[14px] font-bold text-white">{item.rating.toFixed(1)}</Text>
        </View>

        {/* Distance */}
        <Text className="text-[14px] font-semibold text-neutral-800">
          {item.distanceKm.toFixed(1)}km
        </Text>

        {/* Free shipping */}
        {item.freeShipping ? (
          <Text className="text-[14px] font-semibold text-neutral-800">Free shipping</Text>
        ) : null}
      </View>
    </View>
  );
};

const PartnerSection: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <View className="rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <View className="border-neutral-42 flex-row items-center justify-between border-b p-5">
        <Text className="text-base leading-6 font-bold text-neutral-800">Best Partners</Text>
        <Text className="text-[14px] leading-5 font-medium text-neutral-800">See all</Text>
      </View>

      {/* Content */}
      <View className="p-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 16, paddingBottom: 8 }}>
          {partnersSample.map((item) => (
            <PartnerCard key={item.id} item={item} width={width} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PartnerSection;
