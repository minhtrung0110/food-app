import { Platform, ScrollView, View } from 'react-native';
import { SearchProduct } from '@/features/tabs/home/components/search/SearchProduct';
import { FilterProduct } from '@/features/tabs/home/components/filter/FilterProduct';
import { SearchLocation } from '@/features/tabs/home/components/location/SearchLocation';
import CategorySection from '@/features/tabs/home/components/category';
import PartnerSection from '@/features/tabs/home/components/partner';
import GroupPartner from '@/features/tabs/home/components/group-partner';
import { SPACER_SIZE } from '@/constants/config';

export default function TabIndex() {
  const isIos = Platform.OS === 'ios';
  return (
    <View className={'gap-4'}>
      <View className={'flex flex-col gap-6 rounded-b-4xl bg-white px-9 pt-14 pb-6 shadow-sm'}>
        <SearchProduct />

        <View className={'flex flex-row items-center justify-between'}>
          <SearchLocation />
          <FilterProduct />
        </View>
        <View className={'bg-neutral-42 mx-auto h-1.5 w-12 rounded-full'} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        contentInset={{ top: -SPACER_SIZE }}
        contentOffset={{ y: isIos ? SPACER_SIZE : 0, x: 0 }}>
        <View className={'gap-4 px-4'}>
          <CategorySection />
          <PartnerSection />
          <GroupPartner />
        </View>
      </ScrollView>

      <View className={'p-4'}>{/* Other content can go here */}</View>
    </View>
  );
}
