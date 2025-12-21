// Libraries
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { partnersSample } from '@/libs/seed/partner';
import { PartnerCard } from '@/features/tabs/home/components/partner/PartnerCard';

const PartnerSection: React.FC = () => {
  return (
    <View className="rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <View className="border-neutral-42 flex-row items-center justify-between border-b p-5">
        <Text className="text-base leading-6 font-bold text-neutral-800">Best Partners</Text>
        <Text className="text-[14px] leading-5 font-medium text-neutral-800">See all</Text>
      </View>

      {/* Content */}
      <View className="pt-5 pb-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 16, paddingBottom: 8 }}>
          {partnersSample.map((item, index) => (
            <View
              key={item.id}
              style={{
                marginLeft: index === 0 ? 16 : 0,
                marginRight: index === partnersSample.length - 1 ? 16 : 0,
              }}>
              <PartnerCard item={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PartnerSection;
