/**
 * Layout Constants
 * Espaciados, tamaños y dimensiones
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
    // Dimensiones de pantalla
    window: {
        width,
        height,
    },

    // Breakpoints
    isSmallDevice: width < 375,
    isMediumDevice: width >= 375 && width < 768,
    isLargeDevice: width >= 768,

    // Espaciados
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    // Radios de borde
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
        full: 9999,
    },

    // Tamaños de fuente
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
    },

    // Pesos de fuente
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },

    // Alturas de línea
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },

    // Tamaños de iconos
    iconSize: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
    },

    // Tamaños de avatar
    avatarSize: {
        xs: 24,
        sm: 32,
        md: 48,
        lg: 64,
        xl: 96,
    },

    // Alturas de componentes
    componentHeight: {
        input: 48,
        button: 48,
        buttonSmall: 36,
        buttonLarge: 56,
        header: 56,
        tabBar: 60,
        card: 120,
    },

    // Anchos máximos
    maxWidth: {
        content: 640,
        container: 1200,
    },

    // Sombras
    shadow: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
        },
        xl: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
    },

    // Z-index
    zIndex: {
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        fixed: 1200,
        modalBackdrop: 1300,
        modal: 1400,
        popover: 1500,
        toast: 1600,
    },
} as const;

export default Layout;
