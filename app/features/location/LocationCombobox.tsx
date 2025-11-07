import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, TextInput, View } from 'react-native';

import useDebounce from '@/hooks/useDebounce';
import { PlaceOption } from '@/app/types/common';
import InputFrame from '@/components/atoms/Input/InputFrame';
import AutocompleteList from '@/components/molecules/Combobox/AutocompleteList';

type Props = {
  value?: string;
  onChangeText?: (t: string) => void;
  onSelect?: (opt: PlaceOption) => void;
  placeholder?: string;
  // fetcher: nhận query và trả về danh sách options
  fetcher: (q: string) => Promise<PlaceOption[]>;
  disabled?: boolean;
};

export default function LocationComboBox({
  value: valueProp = '',
  onChangeText,
  onSelect,
  placeholder = 'Search location',
  fetcher,
  disabled,
}: Props) {
  const [value, setValue] = useState(valueProp);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const debounced = useDebounce(value, 250);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    onChangeText?.(value);
  }, [value]);

  useEffect(() => {
    let mounted = true;
    if (!debounced) {
      setOptions([]);
      return;
    }
    setLoading(true);
    fetcher(debounced)
      .then((res) => {
        if (mounted) setOptions(res);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [debounced]);

  function handleSelect(opt: PlaceOption) {
    setValue(opt.secondaryText ? `${opt.primaryText}, ${opt.secondaryText}` : opt.primaryText);
    setOpen(false);
    Keyboard.dismiss();
    onSelect?.(opt);
  }

  return (
    <View className="relative">
      <InputFrame
        ref={inputRef}
        value={value}
        onChangeText={(t) => {
          setValue(t);
          setOpen(true);
        }}
        placeholder={placeholder}
        onClear={() => {
          setValue('');
          setOptions([]);
          setOpen(false);
        }}
        disabled={disabled}
        returnKeyType="search"
        onSubmitEditing={() => {
          // nếu có gợi ý thì chọn phần tử đầu tiên
          if (options[0]) handleSelect(options[0]);
        }}
        onFocus={() => setOpen(true)}
      />

      {open ? (
        <>
          {/* bấm ngoài để đóng */}
          <Pressable
            className="absolute -top-10 -right-10 -bottom-10 -left-10"
            onPress={() => setOpen(false)}
          />
          <AutocompleteList
            data={options}
            query={value}
            loading={loading}
            onSelect={handleSelect}
          />
        </>
      ) : null}
    </View>
  );
}
