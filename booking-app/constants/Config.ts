/**
 * App Configuration
 * Configuración general de la aplicación
 */

export const Config = {
    // API
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
    API_TIMEOUT: 30000, // 30 segundos

    // App Info
    APP_NAME: process.env.APP_NAME || 'Booking App',
    APP_VERSION: process.env.APP_VERSION || '1.0.0',

    // Tenant
    DEFAULT_TENANT_SLUG: process.env.DEFAULT_TENANT_SLUG || '',

    // Formato de fechas
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: 'HH:mm',
    DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
    API_DATE_FORMAT: 'YYYY-MM-DD',
    API_TIME_FORMAT: 'HH:mm:ss',

    // Paginación
    DEFAULT_PAGE_SIZE: 20,

    // Timeouts
    DEBOUNCE_DELAY: 300, // ms
    TOAST_DURATION: 3000, // ms

    // Validaciones
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,

    // Citas
    MIN_BOOKING_ADVANCE_HOURS: 2, // Mínimo 2 horas de anticipación
    MAX_BOOKING_ADVANCE_DAYS: 90, // Máximo 90 días de anticipación
    SLOT_DURATION_MINUTES: 15, // Duración de cada slot de tiempo

    // Cache
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos en ms

    // Imágenes
    DEFAULT_AVATAR: 'https://via.placeholder.com/150',
    DEFAULT_SERVICE_IMAGE: 'https://via.placeholder.com/300x200',
    DEFAULT_LOGO: 'https://via.placeholder.com/200x100',

    // Links
    SUPPORT_EMAIL: 'support@bookingapp.com',
    PRIVACY_POLICY_URL: 'https://bookingapp.com/privacy',
    TERMS_URL: 'https://bookingapp.com/terms',
} as const;

export default Config;
