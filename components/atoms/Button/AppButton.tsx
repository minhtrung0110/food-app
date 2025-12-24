// AppButton.tsx
import React, { ReactNode, useMemo } from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, TextProps, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export type AppButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title?: string;
  children?: ReactNode; // nếu muốn custom content thay vì title
  className?: string; // container (button background)
  contentClassName?: string; // row wrap content
  textClassName?: string; // title text
  wrapperClassName?: string; // outer wrapper (rarely needed)
  variant?: ButtonVariant;
  size?: ButtonSize;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  loading?: boolean;
  disabled?: boolean;

  // animation
  pressScale?: number; // default 0.98
  pressOpacity?: number; // default 0.9
  enablePressAnim?: boolean; // default true

  // text props
  textProps?: TextProps;
};

const variantContainer: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-neutral-42',
  outline: 'border border-neutral-200 bg-transparent',
  ghost: 'bg-transparent',
  danger: 'bg-red-500',
};

const variantText: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-900',
  outline: 'text-neutral-900',
  ghost: 'text-neutral-900',
  danger: 'text-white',
};

const sizeContainer: Record<ButtonSize, string> = {
  sm: 'py-2.5 rounded-xl',
  md: 'py-4 rounded-2xl',
  lg: 'py-5 rounded-2xl',
};

const sizeText: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-base',
};

export const AppButton = ({
  title,
  children,
  className,
  wrapperClassName,
  contentClassName,
  textClassName,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,

  pressScale = 0.98,
  pressOpacity = 0.9,
  enablePressAnim = true,

  textProps,
  android_ripple,
  hitSlop = 8,
  accessibilityRole = 'button',

  onPressIn,
  onPressOut,
  ...rest
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    width: '100%',
  }));

  const mergedAndroidRipple = useMemo(() => {
    // ripple nhẹ cho primary/danger; các variant khác giữ mặc định hoặc user truyền
    if (android_ripple) return android_ripple;
    return { color: 'rgba(255,255,255,0.18)' };
  }, [android_ripple]);

  return (
    <View className={wrapperClassName}>
      <Pressable
        {...rest}
        className="w-full"
        disabled={isDisabled}
        hitSlop={hitSlop}
        accessibilityRole={accessibilityRole}
        android_ripple={mergedAndroidRipple}
        onPressIn={(e) => {
          if (enablePressAnim && !isDisabled) {
            scale.value = withTiming(pressScale, { duration: 80 });
            opacity.value = withTiming(pressOpacity, { duration: 80 });
          }
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          if (enablePressAnim && !isDisabled) {
            scale.value = withTiming(1, { duration: 120 });
            opacity.value = withTiming(1, { duration: 120 });
          }
          onPressOut?.(e);
        }}>
        <Animated.View style={aStyle}>
          <View
            className={[
              'w-full items-center justify-center px-4',
              variantContainer[variant],
              sizeContainer[size],
              isDisabled ? 'opacity-50' : '',
              className ?? '',
            ].join(' ')}>
            <View
              className={[
                'flex-row items-center justify-center gap-2',
                contentClassName ?? '',
              ].join(' ')}>
              {leftIcon}

              {loading ? (
                <ActivityIndicator />
              ) : children ? (
                children
              ) : (
                <Text
                  {...textProps}
                  className={[
                    'text-center leading-5 font-medium tracking-tight',
                    sizeText[size],
                    variantText[variant],
                    textClassName ?? '',
                  ].join(' ')}
                  numberOfLines={1}>
                  {title}
                </Text>
              )}

              {rightIcon}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};
