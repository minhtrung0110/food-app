import { View } from 'react-native';
import SearchSection from '@/app/features/tabs/home/search';

export default function TabIndex() {
  return (
    <View className={''}>
      <SearchSection />
      <View className={'p-4'}>{/* Other content can go here */}</View>
    </View>
  );
}
