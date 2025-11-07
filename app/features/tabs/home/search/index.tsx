import { View } from 'react-native';
import ComboBox from '@/components/molecules/Combobox';
import { searchCities } from '@/libs/seed/cities';
import { SelectOption } from '@/components/molecules/Combobox/type';
import { useState } from 'react';

export default function SearchSection() {
  const [value, setValue] = useState<SelectOption | null>(null);
  const handleSearchChange = (e: SelectOption) => {
    setValue(e);
  };
  return (
    <View className={'flex flex-col gap-6 rounded-b-4xl bg-white px-9 pt-14 pb-6 shadow-sm'}>
      <ComboBox
        fetcher={searchCities}
        onSelect={handleSearchChange}
        placeholder={'Search on Coody'}
      />

      <View className={'bg-neutral-40 h-16'}></View>
      <View className={'bg-neutral-40 mx-auto h-1 w-12'} />
    </View>
  );
}
