import React from 'react';

import ListPartner from '@/features/tabs/home/components/group-partner/ListPartner';
import { sortPartnersByTab } from '@/features/tabs/home/components/group-partner/helper';
import { partnersSampleMore } from '@/libs/seed/group-partner';
import { View } from 'react-native';
import { TabsItem, UITabs } from '@/components/molecules/tabs';

const GroupPartner = () => {
  const items: TabsItem[] = [
    {
      key: 'nearby',
      label: 'Nearby',
      children: <ListPartner data={sortPartnersByTab('nearby', partnersSampleMore)} />,
    },
    {
      key: 'sales',
      label: 'Sales',
      children: <ListPartner data={sortPartnersByTab('sales', partnersSampleMore)} />,
    },
    {
      key: 'rate',
      label: 'Rate',
      children: <ListPartner data={sortPartnersByTab('rate', partnersSampleMore)} />,
    },
    {
      key: 'fast',
      label: 'Fast',
      children: <ListPartner data={sortPartnersByTab('fast', partnersSampleMore)} />,
    },
  ];

  return (
    <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <UITabs items={items} contentClassName={'p-5'} />
    </View>
  );
};

export default GroupPartner;
