// components/atoms/Button.tsx
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';
import { cn } from '@/utils/style';

type Variant = 'primary' | 'outline' | 'ghost' | 'neutral';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = PressableProps & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  leftClassName?: string;
  rightIcon?: React.ReactNode;
  textClassName?: string;
  className?: string;
  label?: string;
  unstyled?: boolean; // thêm: bỏ toàn bộ style mặc định nếu cần
};

const sizeClass: Record<Size, string> = {
  sm: 'h-10 px-3 rounded-xl',
  md: 'h-12 px-4 rounded-2xl',
  lg: 'h-14 px-5 rounded-2xl',
};

// tách nền và viền theo variant để có thể loại riêng phần nền
const bgByVariant: Record<Variant, string> = {
  primary: 'bg-primary-500',
  outline: 'bg-transparent',
  ghost: 'bg-transparent',
  neutral: 'bg-neutral-42',
};

const borderByVariant: Record<Variant, string> = {
  primary: '',
  outline: 'border border-neutral-75',
  ghost: '',
  neutral: '',
};

const textByVariant: Record<Variant, string> = {
  primary: 'text-white',
  outline: 'text-primary-500',
  ghost: 'text-primary-500',
  neutral: 'text-neutral-800',
};

// regex nhận biết có bg-* trong className người dùng
const hasBgClass = (cls?: string) => /\bbg-[\w-]+\b/.test(cls || '');

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  leftIcon,
  rightIcon,
  label,
  textClassName,
  className,
  leftClassName,
  children,
  unstyled = false,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const applyBg = !unstyled && !hasBgClass(className); // nếu user đã truyền bg-* thì không thêm bg mặc định
  const container = cn(
    'flex-row items-center justify-center active:opacity-80 disabled:opacity-50',
    !unstyled && sizeClass[size],
    !unstyled && borderByVariant[variant],
    applyBg && bgByVariant[variant], // chỉ thêm nền khi user chưa truyền bg-*
    className
  );

  return (
    <Pressable
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      disabled={isDisabled}
      className={container}
      {...rest}>
      {({ pressed }) => (
        <>
          {leftIcon ? <View className={cn('mr-2', leftClassName)}>{leftIcon}</View> : null}

          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={cn(
                'text-base leading-5 font-medium',
                textByVariant[variant],
                textClassName
              )}>
              {typeof children === 'string' ? children : label}
            </Text>
          )}

          {rightIcon ? <View className="ml-2">{rightIcon}</View> : null}
        </>
      )}
    </Pressable>
  );
}
