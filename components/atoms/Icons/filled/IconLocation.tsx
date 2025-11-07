import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function IconLocation(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.018 18.632c1.654-1.355 4.743-4.356 4.743-7.871a5.761 5.761 0 00-11.522 0c0 3.515 3.089 6.516 4.743 7.871.59.491 1.446.491 2.036 0zM12 12.041a1.92 1.92 0 100-3.84 1.92 1.92 0 000 3.84z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default IconLocation;
