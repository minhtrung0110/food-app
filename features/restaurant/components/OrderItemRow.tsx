import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MinusCircle, PlusCircle } from 'lucide-react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { COLOR } from '@/constants/Colors';
import type { ImageSourcePropType } from 'react-native';

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType;
};

type Props = {
  item: OrderItem;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const OrderItemRow = ({ item, onIncrement, onDecrement }: Props) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4">
      <View className="h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-[15px] bg-white">
        <AppImage source={item.image} className="h-[48px] w-[60px]" contentFit="contain" />
      </View>
      <View className="ml-3 flex-1 gap-2">
        <Text
          numberOfLines={1}
          className="text-[16px] font-medium tracking-tight text-[#172B4D]">
          {item.name}
        </Text>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1 rounded-[10px] bg-neutral-42 p-1">
            <TouchableOpacity
              onPress={onDecrement}
              className="h-6 w-6 items-center justify-center">
              <MinusCircle size={16} color={COLOR.neutral[100]} strokeWidth={1.5} />
            </TouchableOpacity>
            <Text className="w-6 text-center text-xs font-medium text-[#172B4D]">
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={onIncrement}
              className="h-6 w-6 items-center justify-center">
              <PlusCircle size={16} color={COLOR.primary[400]} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <Text className="text-xs font-medium text-primary-400">
            $ {(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
