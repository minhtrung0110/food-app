import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OrderCard } from '@/features/tabs/order/components/OrderCard';
import { ordersSample } from '@/libs/seed/order';
import { IconSearch } from '@/components/atoms/Icons/outline';
import { IconLocation } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';

// #172B4D — Figma Neutral 800, not yet in the COLOR palette
const TEXT_DARK = '#172B4D';

type TabType = 'ongoing' | 'history';

export default function TabOrder() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('history');

  const filtered = ordersSample.filter((o) =>
    activeTab === 'ongoing' ? o.status === 'ongoing' : o.status !== 'ongoing',
  );

  return (
    <View className="flex-1 bg-neutral-42">
      {/* Header: title + tab switcher */}
      <View style={{ paddingTop: insets.top }} className="bg-white">
        <View className="px-4 pt-4">
          <Text style={{ color: TEXT_DARK }} className="text-xl font-bold leading-7">
            Your Orders History
          </Text>
        </View>

        <View className="mt-4 flex-row px-4">
          {(['ongoing', 'history'] as TabType[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center pb-3">
              <Text
                className={
                  activeTab === tab
                    ? 'text-base font-semibold text-primary-400'
                    : 'text-base font-medium text-neutral-100'
                }>
                {tab === 'ongoing' ? 'Ongoing' : 'History'}
              </Text>
              {activeTab === tab && (
                <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400" />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Search bar */}
      <View className="border-t border-neutral-40 bg-white px-4 py-3">
        <View className="h-11 flex-row items-center gap-3 rounded-xl bg-neutral-42 px-3">
          <IconSearch width={18} height={18} color={COLOR.neutral[100]} />
          <TextInput
            placeholder="Search your orders..."
            placeholderTextColor={COLOR.neutral[100]}
            className="flex-1 text-sm"
            style={{ color: TEXT_DARK }}
          />
          <IconLocation width={18} height={18} color={COLOR.primary[400]} />
        </View>
      </View>

      {/* Order list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-3 p-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} item={order} />
          ))}
          {filtered.length === 0 && (
            <View className="items-center py-20">
              <Text className="text-sm text-neutral-100">No orders here yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
