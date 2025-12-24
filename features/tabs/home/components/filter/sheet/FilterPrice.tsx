import React from 'react';
import { Text, View } from 'react-native';
import { UISlider } from '@/components/atoms/Slider';

const FilterPrice = () => {
  return (
    <View className={'gap-6 px-8 pb-2'}>
      <Text className="text-left text-base font-semibold text-neutral-800">Max Delivery Fee</Text>
      <UISlider className={''} />
    </View>
  );
};

export default FilterPrice;
