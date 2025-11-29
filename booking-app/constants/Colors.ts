/**
 * Colors
 * Paleta de colores de la aplicación
 */

const tintColorLight = '#6366F1'; // Indigo-500
const tintColorDark = '#818CF8'; // Indigo-400

export const Colors = {
    light: {
        // Principales
        primary: '#6366F1', // Indigo-500
        primaryDark: '#4F46E5', // Indigo-600
        primaryLight: '#818CF8', // Indigo-400
        secondary: '#EC4899', // Pink-500
        accent: '#F59E0B', // Amber-500

        // Texto
        text: '#1F2937', // Gray-800
        textSecondary: '#6B7280', // Gray-500
        textMuted: '#9CA3AF', // Gray-400

        // Fondos
        background: '#FFFFFF',
        backgroundSecondary: '#F9FAFB', // Gray-50
        backgroundTertiary: '#F3F4F6', // Gray-100

        // Bordes
        border: '#E5E7EB', // Gray-200
        borderLight: '#F3F4F6', // Gray-100

        // Estados
        success: '#10B981', // Green-500
        warning: '#F59E0B', // Amber-500
        error: '#EF4444', // Red-500
        info: '#3B82F6', // Blue-500

        // Componentes
        card: '#FFFFFF',
        cardBorder: '#E5E7EB',
        input: '#FFFFFF',
        inputBorder: '#D1D5DB', // Gray-300
        inputFocus: '#6366F1',
        disabled: '#E5E7EB',
        disabledText: '#9CA3AF',

        // Navegación
        tabIconDefault: '#9CA3AF',
        tabIconSelected: tintColorLight,
        tabBar: '#FFFFFF',
        tabBarBorder: '#E5E7EB',

        // Otros
        tint: tintColorLight,
        shadow: 'rgba(0, 0, 0, 0.1)',
        overlay: 'rgba(0, 0, 0, 0.5)',
    },

    dark: {
        // Principales
        primary: '#818CF8', // Indigo-400
        primaryDark: '#6366F1', // Indigo-500
        primaryLight: '#A5B4FC', // Indigo-300
        secondary: '#F472B6', // Pink-400
        accent: '#FBBF24', // Amber-400

        // Texto
        text: '#F9FAFB', // Gray-50
        textSecondary: '#D1D5DB', // Gray-300
        textMuted: '#9CA3AF', // Gray-400

        // Fondos
        background: '#111827', // Gray-900
        backgroundSecondary: '#1F2937', // Gray-800
        backgroundTertiary: '#374151', // Gray-700

        // Bordes
        border: '#374151', // Gray-700
        borderLight: '#4B5563', // Gray-600

        // Estados
        success: '#34D399', // Green-400
        warning: '#FBBF24', // Amber-400
        error: '#F87171', // Red-400
        info: '#60A5FA', // Blue-400

        // Componentes
        card: '#1F2937',
        cardBorder: '#374151',
        input: '#1F2937',
        inputBorder: '#4B5563',
        inputFocus: '#818CF8',
        disabled: '#374151',
        disabledText: '#6B7280',

        // Navegación
        tabIconDefault: '#9CA3AF',
        tabIconSelected: tintColorDark,
        tabBar: '#1F2937',
        tabBarBorder: '#374151',

        // Otros
        tint: tintColorDark,
        shadow: 'rgba(0, 0, 0, 0.3)',
        overlay: 'rgba(0, 0, 0, 0.7)',
    },

    // Colores de estado de citas
    appointmentStatus: {
        pending: '#F59E0B', // Amber
        confirmed: '#3B82F6', // Blue
        completed: '#10B981', // Green
        cancelled: '#EF4444', // Red
        no_show: '#6B7280', // Gray
    },

    // Colores de categorías (para servicios/staff)
    categories: [
        '#EF4444', // Red
        '#F59E0B', // Amber
        '#10B981', // Green
        '#3B82F6', // Blue
        '#6366F1', // Indigo
        '#8B5CF6', // Violet
        '#EC4899', // Pink
        '#14B8A6', // Teal
    ],
} as const;

export default Colors;
