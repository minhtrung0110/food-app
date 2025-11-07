import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function IconMenu(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2 19a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zm0-8.4a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zM7.8 19a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zm0-8.4a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default IconMenu;
