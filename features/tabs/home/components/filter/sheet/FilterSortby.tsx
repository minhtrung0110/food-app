// Libraries
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { AppButton } from '@/components/atoms/Button/AppButton';
import { IconBookmark, IconClock, IconFire } from '@/components/atoms/Icons/filled';

// Component

// Constant

// Types

export interface IFilterOption {
  id: string;
  label: string;
  icon: ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export const filterSortOptionsSample: IFilterOption[] = [
  {
    id: 'recommended',
    label: 'Recommended',
    icon: <IconBookmark width={24} height={24} />,
    selected: true,
  },
  {
    id: 'fastest_delivery',
    label: 'Fastest Delivery',
    icon: <IconClock width={24} height={24} />,
  },
  {
    id: 'most_popular',
    label: 'Most Popular',
    icon: <IconFire width={24} height={24} />,
  },
];

interface FilterSortByProps {}

const FilterSortBy: React.FC<FilterSortByProps> = (props) => {
  return (
    <View className={'gap-6 px-8 py-4'}>
      {filterSortOptionsSample.map((option) => (
        <AppButton
          variant={'secondary'}
          key={option.id}
          title={option.label}
          wrapperClassName="px-3 "
          className="items-start gap-3"
          textClassName="text-primary-800 text-base leading-6 font-medium"
          leftIcon={option.icon}
          loading={false}
        />
      ))}
    </View>
  );
};

export default FilterSortBy;
