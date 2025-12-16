import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.754 13.724a2.941 2.941 0 00-1.486-1.542L5.505 10.4a.778.778 0 01.041-1.475l12.443-3.888a.777.777 0 01.974.974l-3.888 12.443a.778.778 0 01-1.464.059c-.043-.107-.662-1.703-1.857-4.789z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default SvgComponent;
