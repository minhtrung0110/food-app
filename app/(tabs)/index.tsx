import { View } from 'react-native';
import { SearchProduct } from '@/features/tabs/home/components/search/SearchProduct';

export default function TabIndex() {
  return (
    <View className={''}>
      <View className={'flex flex-col gap-6 rounded-b-4xl bg-white px-9 pt-14 pb-6 shadow-sm'}>
        <SearchProduct />

        <View className={'bg-neutral-40 h-16'}></View>
        <View className={'bg-neutral-42 mx-auto h-1.5 w-12 rounded-full'} />
      </View>
      <View className={'p-4'}>{/* Other content can go here */}</View>
    </View>
  );
}
