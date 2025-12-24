// Libraries
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { foodCategoriesSample } from '@/libs/seed/food-category';
import { AppImage } from '@/components/atoms/AppImage';

// Component

// Constant

// Types

interface FilterCategoryProps {}

const FilterCategory: React.FC<FilterCategoryProps> = (props) => {
  return (
    <View className={'gap-6'}>
      <View className={'py-5'}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
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

export default FilterCategory;
