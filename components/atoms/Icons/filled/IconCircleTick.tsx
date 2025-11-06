import * as React from 'react';
import Svg, { Mask, Path, SvgProps } from 'react-native-svg';

function IconCircleCheck(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zm-2.293-9.707a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 12.586l-1.293-1.293z"
        fill={props.color || 'currentColor'}
      />
      <Mask
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={3}
        width={18}
        height={18}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm-2.293-9.707a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 12.586l-1.293-1.293z"
          fill="#fff"
        />
      </Mask>
    </Svg>
  );
}

export default IconCircleCheck;
