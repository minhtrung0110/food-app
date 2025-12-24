import { Text, TouchableOpacity, View } from 'react-native';

import useBottomSheetStore from '@/stores/bottom-sheet/store';
import { COLOR } from '@/constants/Colors';
import { IconSend } from '@/components/atoms/Icons/filled';
import { useAppStore } from '@/stores/app/store';

export const SearchLocation = () => {
  const { setContentType } = useBottomSheetStore();
  const location = useAppStore((state) => state.location);
  return (
    <TouchableOpacity
      disabled={false}
      activeOpacity={0.6}
      className={'rounded-xl border-2 p-4'}
      style={{ borderColor: COLOR.neutral['01'] }}
      onPress={() => {
        setContentType('search_location');
      }}>
      <View className={'flex-row items-center gap-3 rounded-2xl bg-white'}>
        <IconSend width={26} height={26} color={COLOR.neutral['50']} />
        <View className={'flex items-start gap-1'}>
          <Text className="text-primary-500 text-base leading-5 font-normal">Delivery to</Text>
          <Text className="line-clamp-1 max-w-[200px] text-base leading-6 font-normal text-neutral-800">
            {location?.display_name || 'Your Location'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
