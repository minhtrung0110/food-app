import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { partnersSampleMore } from '@/libs/seed/group-partner';
import { FlashList } from '@shopify/flash-list';
import { COLOR } from '@/constants/Colors';
import { FadingEdge } from '@/components/atoms/FadingEdge';
import { useDerivedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductMiniCard from '@/features/tabs/home/components/search/search-product/ProductMiniCard';
import { listFoodSearchData } from '@/libs/seed/product';
import { IconClose, IconSearch } from '@/components/atoms/Icons/outline';
import { AdoInput } from '@/components/atoms/Input/AdoInput';
import useDebounce from '@/hooks/useDebounce';
import { NominatimPlace } from '@/services/location/photon';
import useBottomSheetStore from '@/stores/bottom-sheet/store';

const ListSearchProductBottomSheet: React.FC = () => {
  const { height } = useWindowDimensions();
  const viewport = useSafeAreaInsets();
  const { animatedPosition } = useBottomSheet();
  const { closeBottomSheet } = useBottomSheetStore();
  const [showList, setShowList] = useState<boolean>(Platform.OS === 'ios');

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 1200);
  const data = partnersSampleMore;

  const onBottomsheetMounted = () => {
    setShowList(true);
  };

  // Handle
  const onSelect = (item: NominatimPlace) => {
    closeBottomSheet();
  };
  useDerivedValue(() => {
    'worklet';
    // @ts-ignore
    const _animation = animatedPosition['_animation'];

    if (_animation && _animation.current === _animation.toValue) {
      scheduleOnRN(onBottomsheetMounted); // không có args
      // nếu có args: scheduleOnRN(onBottomsheetMounted, arg1, arg2)
    }
  }, []);
  // const onSelect = (item: (typeof data)[number]) => {
  //   console.log('Selected partner: ', item);
  // };
  return (
    <View className={'gap-4'} style={{ height: height - viewport.top - viewport.bottom }}>
      <View className={'mb-6 gap-2'}>
        <View className={'flex-row items-center justify-between px-4'}>
          <Text className={'text-xl font-bold'}>Search Product</Text>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.8}
            className={'p-2'}
            onPress={closeBottomSheet}>
            <IconClose color={COLOR.neutral['300']} />
          </TouchableOpacity>
        </View>
        <AdoInput
          startAdornment={<IconSearch />}
          containerStyle={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
          inputProps={{
            placeholder: 'Enter product name',
            onChangeText: (text) => setKeyword(text),
          }}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}>
        {showList ? (
          <FlashList
            indicatorStyle={'black'}
            showsVerticalScrollIndicator={true}
            fadingEdgeLength={6}
            contentContainerStyle={{
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: COLOR.neutral['42'],
              borderRadius: 16,
              paddingRight: 16,
              paddingLeft: 16,
              // borderWidth: 1,
              // borderColor: COLOR.neutral['50'],
            }}
            ItemSeparatorComponent={() => (
              <View
                className={'w-full'}
                style={{ height: 1, backgroundColor: COLOR.neutral['42'] }}
              />
            )}
            data={listFoodSearchData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ProductMiniCard data={item} className={'px-0 py-4'} />}
            ListEmptyComponent={
              <View className={'items-center justify-center gap-6 pt-6'}>
                <View className={'flex items-center gap-2'}>
                  <Text className={'text-xl font-semibold'}>No search results</Text>
                  <Text className={'text-base text-neutral-100'}>
                    Please try searching with different keywords.
                  </Text>
                </View>

                <Image
                  source={require('@/assets/images/find-location.png')}
                  className={'mt-8'}
                  style={{ width: 170, height: 170, resizeMode: 'contain' }}
                />
              </View>
            }
          />
        ) : (
          <ActivityIndicator animating={true} className={'mt-4'} size={20} />
        )}
        <FadingEdge />
      </KeyboardAvoidingView>
    </View>
  );
};
export default ListSearchProductBottomSheet;
