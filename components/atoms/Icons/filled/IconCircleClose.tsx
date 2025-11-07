import * as React from 'react';
import Svg, { Mask, Path, SvgProps } from 'react-native-svg';

function IconCircleClose(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zm-1.408-8.985L9.117 13.5a1 1 0 001.418 1.41l1.468-1.477 1.44 1.446a1 1 0 001.417-1.411l-1.447-1.453 1.482-1.491a1 1 0 00-1.418-1.41l-1.475 1.484-1.5-1.507a1 1 0 10-1.418 1.411l1.508 1.514z"
        fill="#42526E"
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
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm-1.408-8.985L9.117 13.5a1 1 0 001.418 1.41l1.468-1.477 1.44 1.446a1 1 0 001.417-1.411l-1.447-1.453 1.482-1.491a1 1 0 00-1.418-1.41l-1.475 1.484-1.5-1.507a1 1 0 10-1.418 1.411l1.508 1.514z"
          fill="#fff"
        />
      </Mask>
    </Svg>
  );
}

export default IconCircleClose;
