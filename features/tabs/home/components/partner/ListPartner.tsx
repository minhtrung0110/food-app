import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PartnerFullCard } from '@/features/tabs/home/components/group-partner/PartnerFullCard';
import { partnersSampleMore } from '@/libs/seed/group-partner';
import { sortPartnersByTab } from '@/features/tabs/home/components/group-partner/helper';

const ListPartnerBottomSheet: React.FC = () => {
  return (
    <View className="flex-1">
      <View className="border-neutral-42 border-b py-6">
        <Text className="text-center text-base font-bold text-neutral-800">Best Partners</Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="gap-10 px-9 pt-6">
          {sortPartnersByTab('nearby', partnersSampleMore).map((item, index) => (
            <PartnerFullCard item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default ListPartnerBottomSheet;
