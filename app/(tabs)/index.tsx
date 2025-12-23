import { Platform, ScrollView, View } from 'react-native';
import CategorySection from '@/features/tabs/home/components/category';
import PartnerSection from '@/features/tabs/home/components/partner';
import GroupPartner from '@/features/tabs/home/components/group-partner';
import { SPACER_SIZE } from '@/constants/config';
import SearchSection from '@/features/tabs/home/components/search';

export default function TabIndex() {
  const isIos = Platform.OS === 'ios';
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      contentInset={{ top: -SPACER_SIZE }}
      contentOffset={{ y: isIos ? SPACER_SIZE : 0, x: 0 }}>
      <View className={'gap-4'}>
        <SearchSection />
        <View className={'gap-4 px-4'}>
          <CategorySection />
          <PartnerSection />
          <GroupPartner />
        </View>
      </View>
    </ScrollView>
  );
}
