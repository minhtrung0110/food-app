import {View} from 'react-native';
import React, {useMemo} from 'react';
import { COLOR } from '@/constants/Colors';



interface Props {
  color?: string;
  indicatorHeight?: number;
  indicatorWidth?: number;
  marginVertical?: number;
  marginHorizontal?: number;
}

export const Indicator = ({
                            color,
                            indicatorHeight,
                            indicatorWidth,
                            marginHorizontal,
                            marginVertical,
                          }: Props) => {

  const height = indicatorHeight || 4;
  const width = indicatorWidth || 100;
  const marginV = marginVertical || 8;
  const marginH = marginHorizontal || 0;
  const indicatorColor = useMemo(() => color || COLOR.neutral["200"], [color]);

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: indicatorColor,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: marginV,
        marginHorizontal: marginH,
      }}
    />
  );
};
