import { Text, TouchableOpacity, View } from 'react-native';

import useBottomSheetStore from '@/stores/bottom-sheet/store';
import { COLOR } from '@/constants/Colors';
import { IconLocation } from '@/components/atoms/Icons/filled';

export const FilterProduct = () => {
  const { setContentType } = useBottomSheetStore();

  return (
    <TouchableOpacity
      disabled={false}
      activeOpacity={0.6}
      className={'rounded-xl border-2 p-4'}
      style={{ borderColor: COLOR.neutral['01'] }}
      onPress={() => {
        setContentType('search_product');
      }}>
      <View className={'bg-neutral-42 flex-row items-center gap-1 rounded-2xl p-2.5'}>
        <IconLocation width={26} height={26} color={COLOR.neutral['50']} />
        <Text className="text-xs leading-5 font-medium text-neutral-800">Filter</Text>
      </View>
    </TouchableOpacity>
  );
};
