import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Keyboard, ViewStyle } from 'react-native';

interface FadingEdgeProps {
  style?: ViewStyle;
  hideOnKeyboard?: boolean;
}

export const FadingEdge = ({ style, hideOnKeyboard }: FadingEdgeProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (hideOnKeyboard) {
      const keyboardWillShow = Keyboard.addListener('keyboardDidShow', (e) => {
        setShow(false);
      });
      const keyboardWillHide = Keyboard.addListener('keyboardDidHide', () => {
        setShow(true);
      });
      return () => {
        keyboardWillShow.remove();
        keyboardWillHide.remove();
      };
    }
  }, []);

  return (
    <>
      {show && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.42)', '#FFFFFF']}
          locations={[0, 0.406, 1]}
          style={[
            {
              left: 0,
              right: 8,
              height: 50,
              position: 'absolute',
              bottom: -1,
            },
            style,
          ]}
        />
      )}
    </>
  );
};
