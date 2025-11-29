/**
 * Button Component
 * Componente de botón reutilizable
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    useColorScheme,
    TouchableOpacityProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    loading = false,
    fullWidth = false,
    disabled,
    style,
    ...props
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const getButtonStyle = () => {
        if (disabled) {
            return {
                backgroundColor: colors.disabled,
                borderColor: colors.disabled,
            };
        }

        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.secondary,
                    borderColor: colors.secondary,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderColor: colors.primary,
                };
            default:
                return {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                };
        }
    };

    const getTextStyle = () => {
        if (disabled) {
            return { color: colors.disabledText };
        }

        if (variant === 'outline') {
            return { color: colors.primary };
        }

        return { color: '#FFFFFF' };
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                fullWidth && styles.fullWidth,
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? colors.primary : '#FFFFFF'}
                />
            ) : (
                <Text style={[styles.text, getTextStyle()]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Button;
