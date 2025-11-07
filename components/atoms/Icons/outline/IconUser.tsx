import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function IconUser(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.845 16.949v-1.006a2.013 2.013 0 011.166-1.725 13.385 13.385 0 019.978 0 2.013 2.013 0 011.166 1.725v1.006A2.052 2.052 0 0116.1 19H7.9a2.052 2.052 0 01-2.055-2.051zM12 5a3.42 3.42 0 10-.002 6.84A3.42 3.42 0 0012 5z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default IconUser;
