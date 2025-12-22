import React from 'react';
import { GPartner } from '@/libs/seed/group-partner';
import { View } from 'react-native';
import { PartnerFullCard } from '@/features/tabs/home/components/group-partner/PartnerFullCard';

interface ListPartnerProps {
  data: GPartner[];
}
const ListPartner: React.FC<ListPartnerProps> = ({ data }) => {
  return (
    <View className={'gap-5'}>
      {data.map((item, index) => (
        <PartnerFullCard item={item} key={index} />
      ))}
    </View>
  );
};

export default ListPartner;
