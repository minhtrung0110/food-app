// Libraries
import { IconClose, IconSearch } from '@/components/atoms/Icons/outline';
import useBottomSheetStore from '@/stores/bottom-sheet/store';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR } from '@/constants/Colors';
import { useSearchLocation } from '@/queries/location';
import { FadingEdge } from '@/components/atoms/FadingEdge';
import { FlashList } from '@shopify/flash-list';
import { AdoInput } from '@/components/atoms/Input/AdoInput';
import useDebounce from '@/hooks/useDebounce';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { useBottomSheet } from '@gorhom/bottom-sheet';

// Component

// Constant

// Types

interface Props {
  // Define your component's props here
}

const SearchLocationBottomSheet: React.FC<Props> = (props) => {
  const { height } = useWindowDimensions();
  const viewport = useSafeAreaInsets();
  const { animatedPosition } = useBottomSheet();
  const { contentType, closeBottomSheet } = useBottomSheetStore();
  const listRef = useRef<FlashList<any>>(null);
  // State
  const [showList, setShowList] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('ho chi minh');
  const { data, isLoading, isFetching, error, refetch } = useSearchLocation({
    q: searchValue,
    limit: 10,
    countrycodes: 'vn',
    language: 'vi',
  });
  const listData = data ?? [];
  const isBusy = isLoading || isFetching;

  // Handle
  const onSearch = useDebounce((text: string) => {
    setSearchValue(text);
  }, 300);

  const onSelect = (data: { display_name: string; place_id: number }) => {
    // switch (contentType) {
    //   case 'select_start_point':
    //     setCountry(data, ECountryType.START_POINT);
    //     break;
    //   case 'select_end_point':
    //     setCountry(data, ECountryType.END_POINT);
    //     break;
    //   case 'select_residence':
    //     setInfo({residence: data.code});
    //     break;
    //   case 'select_nationality':
    //     setInfo({nationality: data.code});
    //     break;
    // }
    console.log('Selected location: ', data);
    closeBottomSheet();
  };

  const onBottomsheetMounted = () => {
    setShowList(true);
  };

  useDerivedValue(() => {
    // @ts-ignore
    const _animation = animatedPosition['_animation'];
    if (_animation && _animation?.current === _animation?.toValue) {
      runOnJS(onBottomsheetMounted)();
    }
  }, []);
  return (
    <View className={'gap-4'} style={{ height: 0.9 * height - viewport.top - viewport.bottom }}>
      <View className={'gap-2 px-4'}>
        <View className={'flex-row items-center justify-between'}>
          <Text className={'text-xl font-bold'}>Search Location</Text>
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
          inputProps={{
            placeholder: 'Enter location name',
            onChangeText: onSearch,
          }}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 40}>
        {showList ? (
          Platform.OS === 'web' ? (
            <FlatList
              indicatorStyle={'black'}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48 }}
              ItemSeparatorComponent={() => (
                <View className={'py-3'}>
                  <View
                    className={'w-full'}
                    style={{ height: 1, backgroundColor: COLOR.neutral['42'] }}
                  />
                </View>
              )}
              data={listData}
              refreshing={isBusy}
              onRefresh={refetch}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => String(item.place_id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={10}
                  className={'flex-row items-center gap-4'}
                  onPress={() => onSelect({ place_id: item.place_id, display_name: item.display_name })}>
                  <Text className={'text-base font-medium text-neutral-800'}>{item.display_name}</Text>
                  {item.address && (
                    <Text className={'text-sm italic'}>
                      {item.address.city || item.address.town || item.address.village}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className={'items-center justify-center pt-6'}>
                  <Text className={'text-xl font-semibold'}>
                    {isBusy ? 'Searching…' : error ? 'Search failed' : 'No search results'}
                  </Text>
                  <Text className={'pb-4 text-base'} style={{ color: '#777E90' }}>
                    {error
                      ? 'Please try again in a moment.'
                      : 'Check spelling or try a new search'}
                  </Text>
                  <Image
                    source={require('@/assets/images/find-location.png')}
                    style={{ width: 170, height: 170, resizeMode: 'contain' }}
                  />
                </View>
              }
            />
          ) : (
            <FlashList
              indicatorStyle={'black'}
              showsVerticalScrollIndicator={true}
              ref={listRef}
              fadingEdgeLength={6}
              estimatedItemSize={46}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48 }}
              ItemSeparatorComponent={() => (
                <View className={'py-3'}>
                  <View
                    className={'w-full'}
                    style={{ height: 1, backgroundColor: COLOR.neutral['42'] }}
                  />
                </View>
              )}
              data={listData}
              refreshing={isBusy}
              onRefresh={refetch}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => String(item.place_id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={10}
                  className={'flex-row items-center gap-4'}
                  onPress={() => onSelect({ place_id: item.place_id, display_name: item.display_name })}>
                  <Text className={'text-base font-medium text-neutral-800'}>{item.display_name}</Text>
                  {item.address && (
                    <Text className={'text-sm italic'}>
                      {item.address.city || item.address.town || item.address.village}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className={'items-center justify-center pt-6'}>
                  <Text className={'text-xl font-semibold'}>
                    {isBusy ? 'Searching…' : error ? 'Search failed' : 'No search results'}
                  </Text>
                  <Text className={'pb-4 text-base'} style={{ color: '#777E90' }}>
                    {error
                      ? 'Please try again in a moment.'
                      : 'Check spelling or try a new search'}
                  </Text>
                  <Image
                    source={require('@/assets/images/find-location.png')}
                    style={{ width: 170, height: 170, resizeMode: 'contain' }}
                  />
                </View>
              }
            />
          )
        ) : (
          <ActivityIndicator animating={true} className={'mt-4'} size={20} />
        )}
        <FadingEdge />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SearchLocationBottomSheet;
