import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlaceOption } from '@/app/types/common';

function highlight(text: string, query: string) {
  if (!query) return <Text className="text-[15px] text-neutral-800">{text}</Text>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <Text className="text-[15px] text-neutral-800">{text}</Text>;
  return (
    <Text className="text-[15px] text-neutral-800">
      {text.slice(0, idx)}
      <Text className="font-bold">{text.slice(idx, idx + q.length)}</Text>
      {text.slice(idx + q.length)}
    </Text>
  );
}

export default function OptionItem({
  item,
  query,
  onPress,
}: {
  item: PlaceOption;
  query: string;
  onPress: (opt: PlaceOption) => void;
}) {
  return (
    <Pressable onPress={() => onPress(item)} android_ripple={{ color: 'rgba(0,0,0,0.06)' }}>
      <View className="flex-row items-center px-3 py-2">
        <Ionicons name="location-outline" size={18} color="#6B778C" style={{ marginRight: 8 }} />
        <View className="flex-1">
          {highlight(item.primaryText, query)}
          {item.secondaryText ? (
            <Text className="text-[12px] text-neutral-400">{item.secondaryText}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
