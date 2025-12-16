import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.624 10.1V6a1 1 0 00-1-1h-.387a1 1 0 00-1 1v4.1a3.169 3.169 0 000 5.877V18a1 1 0 001 1h.388a1 1 0 001-1v-2.024a3.169 3.169 0 000-5.877l-.001.001zM8.43 14.213a1.176 1.176 0 11.002-2.352 1.176 1.176 0 01-.002 2.352zm8.248-6.19V6a1 1 0 00-1-1h-.388a1 1 0 00-1 1v2.024a3.169 3.169 0 000 5.877V18a1 1 0 001 1h.388a1 1 0 001-1v-4.1a3.169 3.169 0 000-5.877zm-1.194 4.115a1.176 1.176 0 110-2.352 1.176 1.176 0 010 2.352z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default SvgComponent;
