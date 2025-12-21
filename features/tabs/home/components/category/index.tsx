// Libraries
import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { foodCategoriesSample } from '@/libs/seed/food-category';
import { AppImage } from '@/components/atoms/AppImage';

// Component

// Constant

// Types

const CategorySection: React.FC = (props) => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  }
  return (
    <View className={'shadow-smx rounded-2xl bg-white'}>
      <View className={'border-neutral-42 flex flex-row items-center justify-between border-b p-5'}>
        <Text className={'text-base leading-6 font-bold text-neutral-800'}>Category</Text>
        <Text className={'text-[14px] leading-5 font-medium text-neutral-800'}>See all</Text>
      </View>
      <View className={'py-5'}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 12, columnGap: 16 }} // thay pb-3 ở đây cho chắc
        >
          {foodCategoriesSample.map((item, i) => (
            <View
              key={item.id}
              style={{
                marginRight: i === foodCategoriesSample.length - 1 ? 16 : 0,
                marginLeft: i === 0 ? 16 : 0,
              }}
              className="justify-center gap-2">
              <View className="size-[100px] items-center justify-center rounded-full bg-yellow-50 p-6">
                <AppImage source={item.image} className="size-12" />
              </View>

              <Text className="text-center text-sm leading-5 font-medium text-neutral-800">
                {item.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategorySection;
