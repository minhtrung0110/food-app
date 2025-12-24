import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.838 17.579a1.317 1.317 0 002.073 1.178l3.173-1.886 3.17 1.886a1.32 1.32 0 002.077-1.178V6.75A1.749 1.749 0 0015.581 5H8.587a1.749 1.749 0 00-1.749 1.75v10.829z"
        fill={props.color || '#C1C7D0'}
      />
    </Svg>
  );
}

export default SvgComponent;
