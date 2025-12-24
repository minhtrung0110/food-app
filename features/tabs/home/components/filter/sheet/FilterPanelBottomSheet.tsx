// Libraries
import React from 'react';
import { TabsItem, UITabs } from '@/components/molecules/tabs';
import { View } from 'react-native';
import FilterSortby from '@/features/tabs/home/components/filter/sheet/FilterSortby';
import FilterPrice from '@/features/tabs/home/components/filter/sheet/FilterPrice';
import { AppButton } from '@/components/atoms/Button/AppButton';
import useBottomSheetStore from '@/stores/bottom-sheet/store';
import FilterCategory from '@/features/tabs/home/components/filter/sheet/FilterCategory';

// Component

// Constant

// Types

interface FilterPanelBottomSheetProps {
  // Define your component's props here
}

const FilterPanelBottomSheet: React.FC<FilterPanelBottomSheetProps> = (props) => {
  const closeBottomSheet = useBottomSheetStore((state) => state.closeBottomSheet);
  const items: TabsItem[] = [
    {
      key: 'category',
      label: 'Category',
      children: <FilterCategory />,
    },
    {
      key: 'sort_by',
      label: 'Sort by',
      children: <FilterSortby />,
    },
    {
      key: 'price',
      label: 'Price',
      children: <FilterPrice />,
    },
  ];
  const handleComplete = () => {
    closeBottomSheet();
  };
  return (
    <View className="gap-0 pb-2">
      <UITabs items={items} tabBarClassName={'px-4'} contentClassName={'py-5 '} />
      <AppButton
        title="Complete"
        onPress={handleComplete}
        className="bg-primary-500"
        wrapperClassName="w-full px-10"
      />
    </View>
  );
};

export default FilterPanelBottomSheet;
