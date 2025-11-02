import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, View, ViewStyle } from 'react-native';
import { cn } from '@/utils/style';

export type Option<T = string> = { label: string; value: T };

type Size = 'sm' | 'md' | 'lg';

export type SelectProps<T = string> = {
  label?: string;
  placeholder?: string;
  value?: T;
  onChange?: (v: T) => void;
  options: Option<T>[];
  searchable?: boolean;
  size?: Size;
  disabled?: boolean;
  className?: string;
  contentStyle?: ViewStyle;
};

const sizeClass: Record<Size, string> = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
};

export function Select<T = string>({
  label,
  placeholder = 'Select…',
  value,
  onChange,
  options,
  searchable,
  size = 'md',
  disabled,
  className,
  contentStyle,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);

  const filtered = useMemo(() => {
    if (!searchable || !q.trim()) return options;
    const lower = q.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, q, searchable]);

  return (
    <View className="w-full">
      {label ? <Text className="mb-1 text-neutral-400">{label}</Text> : null}

      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={cn(
          'flex-row items-center rounded-xl border bg-white px-3',
          sizeClass[size],
          disabled ? 'opacity-50' : 'active:opacity-80',
          'border-neutral-40',
          className
        )}>
        <Text
          className={cn('flex-1 text-[16px]', selected ? 'text-neutral-400' : 'text-neutral-80')}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text className="text-neutral-80">▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/30" onPress={() => setOpen(false)}>
          <View className="mt-auto rounded-t-2xl bg-white p-4" style={contentStyle}>
            <View className="bg-neutral-40 mb-3 h-1.5 w-14 self-center rounded-full" />

            {searchable ? (
              <TextInput
                placeholder="Search…"
                placeholderTextColor="#97A0AF"
                className="border-neutral-40 mb-3 h-11 rounded-xl border px-3 text-[16px]"
                value={q}
                onChangeText={setQ}
              />
            ) : null}

            <FlatList
              data={filtered}
              keyExtractor={(_, i) => String(i)}
              style={{ maxHeight: 360 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange?.(item.value);
                    setOpen(false);
                    setQ('');
                  }}
                  className="active:bg-neutral-42 rounded-xl px-2 py-3">
                  <Text className="text-[16px] text-neutral-400">{item.label}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View className="bg-neutral-42 h-[1px]" />}
              ListEmptyComponent={
                <Text className="text-neutral-80 py-6 text-center">No results</Text>
              }
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
