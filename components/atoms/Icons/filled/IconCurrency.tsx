import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.56 10.914h-1.514V8.862h2.977a1.068 1.068 0 001.046-1.086 1.068 1.068 0 00-1.046-1.086h-2.977v-.6a1.047 1.047 0 10-2.093 0v.6H9.475a3.28 3.28 0 00-3.348 3.2 3.28 3.28 0 003.348 3.2h1.478v2.052H7.978a1.087 1.087 0 000 2.172h2.975v.6a1.047 1.047 0 102.093 0v-.6h1.514a3.26 3.26 0 003.313-3.2 3.26 3.26 0 00-3.313-3.2zm1.222 3.2a1.152 1.152 0 01-1.222 1.024h-1.514v-2.052h1.514a1.152 1.152 0 011.222 1.026v.002zM9.475 8.862h1.478v2.052H9.475a1.175 1.175 0 01-1.257-1.026 1.175 1.175 0 011.257-1.026z"
        fill={props.color || '#C1C7D0'}
      />
    </Svg>
  );
}

export default SvgComponent;
