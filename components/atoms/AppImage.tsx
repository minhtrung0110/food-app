import { Image as ExpoImage, ImageProps } from 'expo-image';
import { styled } from 'nativewind';
import React from 'react';

const NWImage = styled(ExpoImage, { className: 'style' }); // tương đương cssInterop(Image, { className: 'style' }) :contentReference[oaicite:1]{index=1}

interface AppImageProps extends ImageProps {
  placeholder?: string;
}

export const AppImage: React.FC<AppImageProps> = (props) => {
  return (
    <NWImage
      source={require('@/assets/images/logo.png')}
      transition={600}
      placeholderContentFit="cover"
      contentPosition="center"
      {...props}
    />
  );
};
