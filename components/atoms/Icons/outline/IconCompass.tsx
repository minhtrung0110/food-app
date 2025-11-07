import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function IconCompass(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5a7 7 0 100 14 7 7 0 000-14zm3.2 4.682l-1.193 3.542a1.235 1.235 0 01-.785.776l-3.567 1.18a.679.679 0 01-.855-.862l1.193-3.541a1.24 1.24 0 01.785-.777l3.567-1.179a.679.679 0 01.855.862v-.001z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default IconCompass;
