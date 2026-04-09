import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Percent } from 'lucide-react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { IconClock, IconCurrency, IconShield, IconStar } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';
import { restaurantDetailSample } from '@/libs/seed/restaurant';
import { PopularItemCard } from '@/features/restaurant/components/PopularItemCard';
import { MenuItemRow } from '@/features/restaurant/components/MenuItemRow';

type TabType = 'delivery' | 'review';

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('delivery');
  const restaurant = restaurantDetailSample;

  return (
    <View className="flex-1 bg-neutral-42">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {/* Cover Image */}
        <View className="relative h-[212px] w-full">
          <AppImage source={restaurant.coverImage} className="h-full w-full" contentFit="cover" />
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ top: insets.top + 12 }}
            className="absolute left-4 h-10 w-10 items-center justify-center rounded-full bg-white/80">
            <ChevronLeft size={24} color={COLOR.neutral[400]} />
          </TouchableOpacity>
        </View>

        {/* White card with rounded top */}
        <View className="-mt-6 rounded-t-[30px] bg-white pb-6 pt-5">
          {/* Restaurant header */}
          <View className="gap-3 px-[35px]">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 flex-row items-center gap-2">
                <Text className="text-[20px] font-bold tracking-wide text-[#172B4D]">
                  {restaurant.name}
                </Text>
                <IconShield width={24} height={24} />
              </View>
              <View className="flex-row items-center gap-3">
                <View className="rounded-[10px] bg-[#FFEBE5]/20 px-4 py-1">
                  <Text className="text-xs font-medium text-primary-400">Take Away</Text>
                </View>
                <TouchableOpacity>
                  <Heart size={22} color={COLOR.primary[400]} strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Status + address */}
            <View className="flex-row items-center gap-2">
              <Text
                className={
                  restaurant.status === 'open'
                    ? 'text-xs font-medium text-green-400'
                    : 'text-xs font-medium text-red-500'
                }>
                {restaurant.status === 'open' ? 'Open' : 'Close'}
              </Text>
              <View className="h-[3px] w-[3px] rounded-full bg-neutral-50" />
              <Text numberOfLines={1} className="flex-1 text-xs font-medium text-neutral-100">
                {restaurant.addressLine}
              </Text>
            </View>
          </View>

          {/* Info bar: rating, time, shipping + promo */}
          <View className="mx-[35px] mt-5 gap-3">
            <View className="flex-row items-center gap-2">
              {/* Rating pill */}
              <View className="flex-row items-center gap-1 rounded-[8px] bg-primary-400 px-2 py-[3px]">
                <IconStar width={16} height={16} color={COLOR.white} />
                <Text className="text-xs font-medium text-white">
                  {restaurant.rating.toFixed(1)}
                </Text>
              </View>
              <View className="h-[3px] w-[3px] rounded-full bg-neutral-50" />
              {/* Time */}
              <View className="flex-row items-center gap-1">
                <IconClock width={24} height={24} color={COLOR.neutral[50]} />
                <Text className="text-xs font-medium text-[#172B4D]">
                  {restaurant.etaMin} Mins
                </Text>
              </View>
              <View className="h-[3px] w-[3px] rounded-full bg-neutral-50" />
              {/* Shipping */}
              <View className="flex-row items-center gap-1">
                <IconCurrency width={24} height={24} color={COLOR.neutral[50]} />
                <Text className="text-xs font-medium text-[#172B4D]">
                  {restaurant.freeShipping ? 'Free shipping' : `$${restaurant.deliveryFee.toFixed(2)}`}
                </Text>
              </View>
            </View>

            {/* Promo banner */}
            {restaurant.promoCode && (
              <View className="flex-row items-center gap-3 rounded-[15px] bg-neutral-42 px-3 py-[10px]">
                <Percent size={20} color={COLOR.primary[400]} />
                <Text className="text-sm text-[#172B4D]">
                  Save ${restaurant.promoSaving?.toFixed(2)} with code {restaurant.promoCode}
                </Text>
              </View>
            )}
          </View>

          {/* Tab navigation */}
          <View className="mt-5 border-b border-neutral-42">
            <View className="flex-row px-[35px]">
              <TouchableOpacity
                onPress={() => setActiveTab('delivery')}
                className="relative mr-8 pb-3">
                <Text
                  className={`text-[13px] font-medium tracking-tight ${
                    activeTab === 'delivery' ? 'text-primary-400' : 'text-[#172B4D]'
                  }`}>
                  Delivery
                </Text>
                {activeTab === 'delivery' && (
                  <View className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-[3px] bg-primary-400" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('review')} className="relative pb-3">
                <Text
                  className={`text-[13px] font-medium tracking-tight ${
                    activeTab === 'review' ? 'text-primary-400' : 'text-[#172B4D]'
                  }`}>
                  Review
                </Text>
                {activeTab === 'review' && (
                  <View className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-[3px] bg-primary-400" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {activeTab === 'delivery' ? (
            <>
              {/* Popular Items */}
              <View className="mt-5 gap-4">
                <Text className="px-[35px] text-[16px] font-bold text-[#172B4D]">
                  Popular Items
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 35, gap: 12 }}>
                  {restaurant.popularItems.map((item) => (
                    <PopularItemCard key={item.id} item={item} />
                  ))}
                </ScrollView>
              </View>

              {/* Menu sections */}
              {restaurant.menuSections.map((section) => (
                <View key={section.id} className="mt-6">
                  <Text className="px-[35px] pb-4 text-[16px] font-bold text-[#172B4D]">
                    {section.title}
                  </Text>
                  <View className="h-px bg-neutral-42" />
                  <View className="gap-5 px-[35px] pt-5">
                    {section.items.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <MenuItemRow item={item} />
                        {index < section.items.length - 1 && (
                          <View className="h-px bg-neutral-42" />
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View className="mt-12 items-center px-[35px]">
              <Text className="text-base text-neutral-100">Reviews coming soon</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
