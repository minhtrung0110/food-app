import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';
import {cn} from "@/utils/style";


type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = PressableProps & {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    textClassName?: string;
    className?: string;
    label?: string;
};

const sizeClass: Record<Size, string> = {
    sm: 'h-10 px-3 rounded-xl',
    md: 'h-12 px-4 rounded-2xl',
    lg: 'h-14 px-5 rounded-2xl',
};

const containerByVariant: Record<Variant, string> = {
    primary: 'bg-primary-500',
    outline: 'bg-transparent border border-neutral-75',
    ghost:   'bg-transparent',
};

const textByVariant: Record<Variant, string> = {
    primary: 'text-white',
    outline: 'text-primary-500',
    ghost:   'text-primary-500',
};

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
                           children,
                           ...rest
                       }: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            disabled={isDisabled}
            className={cn(
                'flex-row items-center justify-center active:opacity-80 disabled:opacity-50',
                sizeClass[size],
                containerByVariant[variant],
                className,
            )}
            {...rest}
        >
            {({ pressed }) => (
                <>
                    {leftIcon ? <View className="mr-2">{leftIcon}</View> : null}
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text className={cn('font-medium text-base leading-5 ', textByVariant[variant], textClassName)}>
                            {typeof children === 'string' ? children : label}
                        </Text>
                    )}
                    {rightIcon ? <View className="ml-2">{rightIcon}</View> : null}
                </>
            )}
        </Pressable>
    );
}
