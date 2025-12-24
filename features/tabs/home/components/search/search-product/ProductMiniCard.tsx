import React from 'react';
import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { IconStar } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';
import { cn } from '@/utils/style';
import { Food } from '@/types/model/product';

interface ProductMiniCardProps {
  data: Food;
  className?: string;
}

const ProductMiniCard: React.FC<ProductMiniCardProps> = ({ data, className }) => {
  return (
    <View className={cn('flex-row items-center gap-4 p-4', className)}>
      <AppImage className={'size-20 rounded-xl'} source={data.image} />
      <View className={'space-y-3'}>
        <View className={'flex-row items-center justify-between gap-4'}>
          <Text className={'text-lg leading-6 font-semibold text-neutral-800'}>{data.name}</Text>
          <IconStar color={COLOR.primary['500']} width={28} height={28} />
        </View>
        <View className={'flex flex-row items-center gap-2'}>
          <Text className={'text-primary-500 text-base leading-5 font-medium'}>
            {data.basePrice}
          </Text>
          <Text className={'text-base leading-5 font-normal text-neutral-100'}>FOOD</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductMiniCard;
