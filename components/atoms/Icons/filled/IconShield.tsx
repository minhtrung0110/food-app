import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.373 5.067l5.385 1.987c.425.155.707.559.708 1.011v2.982a7.885 7.885 0 01-6.292 7.94 1.037 1.037 0 01-.34 0 7.885 7.885 0 01-6.292-7.94V8.065c0-.45.279-.853.7-1.011l5.385-1.987c.24-.089.505-.089.746 0zm-.562 8.777l3.013-3.275.008.004a.74.74 0 00-1.156-.925l-2.5 2.629-.9-.9a.74.74 0 00-1.047 1.047L10.71 13.9a.74.74 0 00.523.22h.041a.736.736 0 00.537-.276z"
        fill={props.color || '#00875A'}
      />
    </Svg>
  );
}

export default SvgComponent;
