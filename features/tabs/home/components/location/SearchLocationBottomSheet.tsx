// Libraries
import { IconClose } from '@/components/atoms/Icons/outline';
import { Input } from '@/components/atoms/Input';
import useBottomSheetStore from '@/stores/bottom-sheet/store';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR } from '@/constants/Colors';

// Component

// Constant

// Types

interface Props {
  // Define your component's props here
}

const SearchLocationBottomSheet: React.FC<Props> = (props) => {
  const { height } = useWindowDimensions();
  const viewport = useSafeAreaInsets();
  const { contentType, closeBottomSheet } = useBottomSheetStore();
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
        <Input />
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
            estimatedItemSize={46}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48 }}
            ItemSeparatorComponent={() => (
              <View className={'py-3'}>
                <View
                  className={'w-full'}
                  style={{ height: 1, backgroundColor: color.neutral['divider-02'] }}
                />
              </View>
            )}
            data={Object.entries(countryList)}
            renderItem={({ item: [key, value] }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={10}
                className={'flex-row items-center gap-4'}
                onPress={() => onSelect({ code: key, name: value })}>
                <AppImage
                  recyclingKey={key}
                  source={FLAG_API.replace('$code', key.toLowerCase())}
                  style={{ width: 16, height: 16, borderRadius: 8 }}
                />
                <Text className={'text-base'}>{value}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className={'items-center justify-center pt-6'}>
                <Text className={'text-xl font-semibold'}>No search results</Text>
                <Text className={'pb-4 text-base'} style={{ color: '#777E90' }}>
                  Check spelling or try new search
                </Text>
                <Image
                  source={require('@/assets/images/home/step-3.png')}
                  style={{ width: 150, height: 150 }}
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
