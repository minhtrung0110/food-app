// Libraries
import { IconClose, IconSearch } from '@/components/atoms/Icons/outline';
import useBottomSheetStore from '@/stores/bottom-sheet/store';
import React, { useRef, useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR } from '@/constants/Colors';
import { useSearchLocation } from '@/queries/location';
import { FadingEdge } from '@/components/atoms/FadingEdge';
import { FlashList } from '@shopify/flash-list';
import { AdoInput } from '@/components/atoms/Input/AdoInput';
import useDebounce from '@/hooks/useDebounce';
import { useDerivedValue } from 'react-native-reanimated';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { scheduleOnRN } from 'react-native-worklets';
import { IconLocation } from '@/components/atoms/Icons/filled';
import { useAppStore } from '@/stores/app/store';
import { NominatimPlace } from '@/services/location/photon';
import { useShallow } from 'zustand/react/shallow';

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
  const { closeBottomSheet } = useBottomSheetStore();
  const { location, setLocation } = useAppStore(
    useShallow((state) => ({
      setLocation: state.setLocation,
      location: state.location,
    }))
  );

  const listRef = useRef<FlashList<any>>(null);
  // State
  const [showList, setShowList] = useState<boolean>(Platform.OS === 'ios');
  const [keyword, setKeyword] = useState(location?.address?.city || '');
  const debouncedKeyword = useDebounce(keyword, 1200);

  const { data, isLoading, error } = useSearchLocation({
    q: debouncedKeyword,
    limit: 10,
    countrycodes: 'vn',
    language: 'vi',
  });

  // Handle

  const onSelect = (item: NominatimPlace) => {
    setLocation({
      place_id: item.place_id,
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      address: item.address,
    });

    closeBottomSheet();
  };

  const onBottomsheetMounted = () => {
    setShowList(true);
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
            ref={listRef}
            fadingEdgeLength={6}
            // estimatedItemSize={46}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 48,
              paddingTop: 16,
            }}
            ItemSeparatorComponent={() => (
              <View className={'py-3'}>
                <View
                  className={'w-full'}
                  style={{ height: 1, backgroundColor: COLOR.neutral['42'] }}
                />
              </View>
            )}
            data={data}
            keyExtractor={(item) => String(item.place_id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={10}
                className={'flex-row items-start gap-1'}
                onPress={() => onSelect(item)}>
                <IconLocation width={26} height={26} color={COLOR.neutral['100']} />
                <View className={'flex-1 flex-col items-start gap-1'}>
                  <Text className={'text-base font-medium text-neutral-700'}>
                    {item.display_name}
                  </Text>

                  {item.address && (
                    <Text className={'text-sm italic'}>
                      {item.address.city || item.address.town || item.address.village}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className={'items-center justify-center gap-6 pt-6'}>
                <View className={'flex items-center gap-2'}>
                  <Text className={'text-xl font-semibold'}>No search results</Text>
                  <Text className={'text-base text-neutral-100'}>
                    Check spelling or try new search
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

export default SearchLocationBottomSheet;
