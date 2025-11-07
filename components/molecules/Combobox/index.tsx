import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import useDebounce from '@/hooks/useDebounce';
import InputFrame, { InputFrameRef } from '@/components/atoms/Input/InputFrame';
import AutocompleteList from '@/components/molecules/Combobox/AutocompleteList';
import { SelectOption } from '@/components/molecules/Combobox/type';

type Props<T extends SelectOption> = {
  /** Giá trị text hiển thị trên input (controlled). Nếu không truyền, component sẽ tự quản lý. */
  value?: string;
  /** Thay đổi text mỗi lần người dùng gõ. */
  onChangeText?: (t: string) => void;

  /** Khi chọn 1 option. */
  onSelect?: (opt: T) => void;

  /** Placeholder cho input. */
  placeholder?: string;

  /** Hàm fetch dữ liệu theo query. */
  fetcher: (q: string) => Promise<T[]>;

  /** Map 1 option -> label để hiển thị vào input (mặc định: primaryText[, secondaryText]). */
  getOptionLabel?: (opt: T) => string;

  /** Khoá option -> key (mặc định: `${opt.id ?? opt.primaryText}_${idx}`) */
  keyExtractor?: (opt: T, idx: number) => string;

  /** Số ms debounce khi gõ (mặc định 250ms) */
  debounceMs?: number;

  /** Bắt đầu fetch khi query có tối thiểu bao nhiêu ký tự (mặc định 1). */
  minChars?: number;

  /** Mở dropdown khi focus (mặc định true). */
  openOnFocus?: boolean;

  /** Đóng dropdown sau khi chọn (mặc định true). */
  closeOnSelect?: boolean;

  /** Tự động chọn item đầu tiên khi nhấn submit (Enter/search) (mặc định true). */
  autoSelectFirstOnSubmit?: boolean;

  disabled?: boolean;

  /** Lắng nghe thay đổi trạng thái mở/đóng (tuỳ chọn) */
  onOpenChange?: (open: boolean) => void;
};

export default function ComboBox<T extends SelectOption>({
  value: valueProp,
  onChangeText,
  onSelect,
  placeholder = 'Search',
  fetcher,
  getOptionLabel,
  keyExtractor,
  debounceMs = 250,
  minChars = 1,
  openOnFocus = true,
  closeOnSelect = true,
  autoSelectFirstOnSubmit = true,
  disabled,
  onOpenChange,
}: Props<T>) {
  // controlled vs uncontrolled
  const [inner, setInner] = useState(valueProp ?? '');
  const value = valueProp !== undefined ? valueProp : inner;

  useEffect(() => {
    if (valueProp !== undefined) setInner(valueProp);
  }, [valueProp]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const debounced = useDebounce(value, debounceMs);
  const inputRef = useRef<TextInput | null>(null);
  const frameRef = useRef<InputFrameRef>(null);

  // label builder: "primary, secondary" mặc định
  const labelOf = useMemo(
    () =>
      getOptionLabel ??
      ((opt: SelectOption) =>
        opt.secondaryText ? `${opt.primaryText}, ${opt.secondaryText}` : opt.primaryText),
    [getOptionLabel]
  );

  // fetch theo debounced value
  useEffect(() => {
    let mounted = true;

    if (!debounced || debounced.trim().length < minChars) {
      setOptions([]);
      return;
    }

    setLoading(true);
    fetcher(debounced)
      .then((res) => mounted && setOptions(res))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [debounced, fetcher, minChars]);

  function setOpenSafe(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }

  function handleChange(t: string) {
    if (valueProp === undefined) setInner(t);
    onChangeText?.(t);
    setOpenSafe(true);
  }

  function handleSelect(opt: T) {
    const text = labelOf(opt as any);
    if (valueProp === undefined) setInner(text);
    onChangeText?.(text);
    onSelect?.(opt);
    Keyboard.dismiss();
    if (closeOnSelect) setOpenSafe(false);
  }

  return (
    <View className="relative">
      <InputFrame
        ref={(node) => {
          // trỏ cả TextInput thật và InputFrame wrapper
          inputRef.current = node as unknown as TextInput | null;
          frameRef.current = node as any;
        }}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (autoSelectFirstOnSubmit && options[0]) handleSelect(options[0]);
        }}
        onFocus={() => openOnFocus && setOpenSafe(true)}
        onClear={() => {
          if (valueProp === undefined) setInner('');
          onChangeText?.('');
          setOptions([]);
          setOpenSafe(false);
        }}
      />

      {open ? (
        <>
          {/* overlay bắt click ngoài để đóng dropdown */}
          <Pressable
            onPress={() => setOpenSafe(false)}
            style={StyleSheet.absoluteFill} // tương đương className="absolute inset-0"
          />
          <AutocompleteList<T>
            data={options}
            query={value}
            loading={loading}
            onSelect={handleSelect}
            // keyExtractor={(item, idx) =>
            //   keyExtractor?.(item, idx) ??
            //   String((item as any).id ?? `${(item as any).primaryText}_${idx}`)
            // }
            // AutocompleteList có thể đang render theo primary/secondary,
            // nếu bạn đã nâng cấp nó cho generic, có thể truyền thêm builder ở đây.
          />
        </>
      ) : null}
    </View>
  );
}
