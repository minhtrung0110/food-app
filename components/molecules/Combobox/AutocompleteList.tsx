import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import OptionItem from './OptionItem';
import { PlaceOption } from '@/app/types/common';

export default function AutocompleteList({
  data,
  query,
  loading,
  onSelect,
  emptyText = 'No results',
}: {
  data: PlaceOption[];
  query: string;
  loading?: boolean;
  onSelect: (opt: PlaceOption) => void;
  emptyText?: string;
}) {
  return (
    <View className="border-neutral-40 absolute top-12 right-0 left-0 z-50 overflow-hidden rounded-2xl border bg-white shadow-md">
      {loading ? (
        <View className="items-center py-6">
          <ActivityIndicator />
        </View>
      ) : data.length === 0 ? (
        <View className="px-3 py-3">
          <Text className="text-[13px] text-neutral-400">{emptyText}</Text>
        </View>
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => <OptionItem item={item} query={query} onPress={onSelect} />}
          style={{ maxHeight: 260 }}
        />
      )}
    </View>
  );
}
