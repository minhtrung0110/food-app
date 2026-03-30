import { Text, View } from 'react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { IconShield } from '@/components/atoms/Icons/filled';
import { Button } from '@/components/atoms/Button';
import type { Order } from '@/libs/seed/order';

// #172B4D — Figma Neutral 800, not yet in the COLOR palette
const TEXT_DARK = '#172B4D';

export const OrderCard = ({ item }: { item: Order }) => {
  return (
    <View className="rounded-[15px] bg-white p-4 gap-3">
      {/* Restaurant row */}
      <View className="flex-row gap-3">
        <AppImage
          source={item.image}
          className="h-16 w-16 rounded-xl"
          contentFit="cover"
        />
        <View className="flex-1 justify-center gap-1.5">
          <View className="flex-row items-center gap-1.5">
            <Text
              numberOfLines={1}
              style={{ color: TEXT_DARK }}
              className="flex-1 text-[15px] font-bold leading-5">
              {item.restaurantName}
            </Text>
            <IconShield width={18} height={18} />
          </View>
          <Text numberOfLines={1} className="text-xs text-neutral-100">
            {item.address}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text style={{ color: TEXT_DARK }} className="text-sm font-semibold">
              ${item.price}
            </Text>
            <Text className="text-neutral-50 text-xs">•</Text>
            <Text className="text-xs text-neutral-100">
              {item.itemCount} {item.itemCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-neutral-40" />

      {/* Action buttons */}
      <View className="flex-row gap-3">
        <Button variant="neutral" size="sm" label="Rate" className="flex-1 rounded-xl" />
        <Button variant="primary" size="sm" label="Re-Order" className="flex-1 rounded-xl" />
      </View>
    </View>
  );
};
