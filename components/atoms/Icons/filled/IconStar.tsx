import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.554 3.792l1.17 2.467 2.394.254a.613.613 0 01.325 1.087l-1.91 1.57.591 2.64a.613.613 0 01-.916.657L8 11.124l-2.21 1.343a.613.613 0 01-.917-.658l.594-2.639-1.91-1.57a.613.613 0 01.326-1.085l2.394-.254 1.169-2.469a.613.613 0 011.108 0z"
        fill={props.color || '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
