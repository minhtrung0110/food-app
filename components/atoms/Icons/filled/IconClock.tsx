import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5a7 7 0 100 14 7 7 0 000-14zm3.15 8.4h-3.144a.9.9 0 01-.875-.875V8.509a.875.875 0 011.75 0v3.137h2.269a.875.875 0 010 1.75v.004z"
        fill={props.color || '#C1C7D0'}
      />
    </Svg>
  );
}

export default SvgComponent;
