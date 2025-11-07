import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import OptionItem from './OptionItem';
import { SelectOption } from '@/components/molecules/Combobox/type';

export default function AutocompleteList<T extends SelectOption>({
  data,
  query,
  loading,
  onSelect,
  emptyText = 'No results',
}: {
  data: T[];
  query: string;
  loading?: boolean;
  onSelect: (opt: T) => void;
  emptyText?: string;
}) {
  return (
    <View className="border-neutral-40 absolute top-14 right-0 left-0 z-50 min-h-16 overflow-hidden rounded-2xl border bg-white shadow-md">
      {loading ? (
        <View className="items-center py-6">
          <ActivityIndicator />
        </View>
      ) : data.length === 0 ? (
        <View className="px-3 py-3">
          <Text className="text-[14px] text-neutral-400">{emptyText}</Text>
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
