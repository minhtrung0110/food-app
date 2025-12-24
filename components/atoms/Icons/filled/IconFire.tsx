import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.381 18.762a5.283 5.283 0 01-3.717-5.415 4.885 4.885 0 011.559-3.5.668.668 0 01.561-.17c.364.059.242.7.183 1.065a1.762 1.762 0 001.41 2.089c2 0-1.372-3.992 2.128-7.732a.307.307 0 01.523.247c-.08 2 2.486 4.052 3.312 5.2a5.35 5.35 0 01-5.959 8.219v-.003z"
        fill={props.color || '#C1C7D0'}
      />
    </Svg>
  );
}

export default SvgComponent;
