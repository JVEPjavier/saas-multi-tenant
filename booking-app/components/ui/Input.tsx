/**
 * Input Component
 * Componente de input reutilizable
 */

import React from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={[styles.label, { color: colors.text }]}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        borderColor: error ? colors.error : colors.inputBorder,
                        color: colors.text,
                    },
                    style,
                ]}
                placeholderTextColor={colors.textMuted}
                {...props}
            />
            {error && (
                <Text style={[styles.error, { color: colors.error }]}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default Input;
