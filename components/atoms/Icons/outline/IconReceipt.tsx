import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function IconReceipt(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.924 5H8.076a1.6 1.6 0 00-1.6 1.6v10.521c0 .198.077.388.216.529l1.105 1.13a.727.727 0 001.042 0l.8-.818a.727.727 0 011.042 0l.8.818a.73.73 0 001.043 0l.8-.818a.727.727 0 011.042 0l.8.818a.727.727 0 001.042 0l1.1-1.127a.764.764 0 00.218-.535V6.6A1.6 1.6 0 0015.924 5zM9.3 8.5h4.165a.736.736 0 110 1.472H9.3a.736.736 0 010-1.472zm0 2.688h2.129a.736.736 0 010 1.472H9.3a.736.736 0 110-1.472z"
        fill={props.color || '#42526E'}
      />
    </Svg>
  );
}

export default IconReceipt;
