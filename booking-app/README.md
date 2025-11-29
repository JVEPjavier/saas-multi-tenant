# 📱 Booking App - Aplicación Móvil

Aplicación móvil React Native (Expo) para el sistema de gestión de reservas.

## 📋 Requisitos

- Node.js 18 o superior
- npm o yarn
- Expo Go app (para testing en dispositivo físico)
- iOS Simulator (Mac) o Android Emulator (opcional)

## ⚙️ Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# API Configuration
# IMPORTANTE: Usa la IP de tu máquina en la red local, NO localhost
EXPO_PUBLIC_API_URL=http://192.168.1.38:8000/api

# App Configuration
APP_NAME=Booking App
APP_VERSION=1.0.0

# Environment
NODE_ENV=development
```

> ⚠️ **Importante**: 
> - Reemplaza `192.168.1.38` con la IP de tu máquina
> - NO uses `localhost` o `127.0.0.1` (no funcionará en dispositivos físicos)
> - Para encontrar tu IP: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)

### 3. Iniciar Expo

```bash
# Limpiar cache e iniciar
npx expo start --clear

# O simplemente
npm start
```

## 📱 Ejecutar la App

### En Dispositivo Físico (Recomendado)

1. Instala **Expo Go** desde:
   - [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS)
   - [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)

2. Asegúrate de que tu dispositivo esté en la **misma red WiFi** que tu computadora

3. Escanea el QR code que aparece en la terminal:
   - **iOS**: Usa la app de Cámara
   - **Android**: Usa Expo Go directamente

### En Emulador/Simulador

```bash
# Android
npm run android

# iOS (solo Mac)
npm run ios
```

## 🔑 Credenciales de Prueba

### Tenants Disponibles
- `demo-barbershop`
- `elegant-salon`

### Clientes de Prueba
| Nombre | Teléfono |
|--------|----------|
| John Doe | `+1111111111` |
| Jane Smith | `+2222222222` |
| Bob Johnson | `+3333333333` |
| Alice Brown | `+4444444444` |
| Charlie Wilson | `+5555555555` |

### Flujo de Prueba

1. **Seleccionar Tenant**: Ingresa `elegant-salon`
2. **Login**: Usa `+1111111111`
3. **O Registrarse**: Crea un nuevo usuario con cualquier teléfono

## 📁 Estructura del Proyecto

```
booking-app/
├── app/                      # Rutas y pantallas (Expo Router)
│   ├── (auth)/              # Pantallas de autenticación
│   │   ├── select-tenant.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/              # Pantallas principales (tabs)
│   │   ├── index.tsx        # Home
│   │   ├── booking.tsx      # Nueva reserva
│   │   ├── services.tsx     # Servicios
│   │   └── profile.tsx      # Perfil
│   ├── appointment/         # Detalle de cita
│   └── _layout.tsx          # Layout raíz
├── components/              # Componentes reutilizables
│   └── ui/                  # Componentes UI
│       ├── Button.tsx
│       └── Input.tsx
├── services/                # Servicios API
│   └── api/
│       ├── client.ts        # Cliente Axios
│       └── auth.ts          # Servicios de autenticación
├── store/                   # Estado global (Zustand)
│   └── auth.ts              # Store de autenticación
├── constants/               # Constantes
│   └── Colors.ts            # Paleta de colores
├── types/                   # TypeScript types
│   └── index.ts
├── .env                     # Variables de entorno
└── app.json                 # Configuración de Expo
```

## 🎨 Características

### Navegación
- **Expo Router**: File-based routing
- **Tabs**: Navegación principal con 4 tabs
- **Stack**: Navegación para pantallas modales

### Estado Global
- **Zustand**: Gestión de estado ligera y simple
- **AsyncStorage**: Persistencia de autenticación

### UI/UX
- **Componentes Personalizados**: Button, Input reutilizables
- **Dark Mode**: Soporte automático según sistema
- **Safe Area**: Manejo correcto de notch y barras

### API
- **Axios**: Cliente HTTP con interceptores
- **Auto-retry**: Reintentos automáticos en errores de red
- **Token Management**: Manejo automático de tokens

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar Expo
npm run android        # Abrir en Android
npm run ios            # Abrir en iOS (solo Mac)
npm run web            # Abrir en navegador

# Utilidades
npx expo start --clear # Limpiar cache
npx expo doctor        # Diagnosticar problemas
```

## 🛠️ Tecnologías

### Core
- **React Native** 0.81.5
- **Expo** ~54.0
- **TypeScript** ~5.9.2

### Navegación
- **expo-router** ~6.0.15 - File-based routing
- **react-native-screens** ~4.16.0
- **react-native-safe-area-context** ~5.6.0

### Estado y Datos
- **zustand** ^5.0.8 - State management
- **axios** ^1.13.2 - HTTP client
- **@react-native-async-storage/async-storage** ^2.2.0

### UI
- **expo-status-bar** ~3.0.8
- **react-native-calendars** ^1.1313.0

## 🔍 Debugging

### Ver Logs de API

Los logs de API aparecen automáticamente en la consola:

```
🔧 API Configuration: { API_URL: "http://192.168.1.38:8000/api" }
📤 API Request: { method: "POST", fullURL: "..." }
📥 API Response: { status: 200, data: {...} }
❌ API Error: { status: 422, message: "..." }
```

### React DevTools

```bash
npx react-devtools
```

### Limpiar Cache

```bash
# Limpiar todo
npx expo start --clear

# Limpiar node_modules
rm -rf node_modules
npm install
```

## 🐛 Troubleshooting

### "Network Error" o no se conecta al backend

1. **Verifica la IP**: Asegúrate de que `EXPO_PUBLIC_API_URL` tenga la IP correcta
2. **Misma red**: Dispositivo y computadora deben estar en la misma WiFi
3. **Backend corriendo**: Verifica que Laravel esté en `http://0.0.0.0:8000`
4. **Firewall**: Desactiva temporalmente el firewall de Windows
5. **Reinicia Expo**: `npx expo start --clear`

### "Customer not found"

- Estás usando un teléfono que no existe
- Usa uno de los teléfonos de prueba: `+1111111111`
- O regístrate con un teléfono nuevo

### Cambios en .env no se reflejan

- **Reinicia Expo**: `npx expo start --clear`
- Las variables de entorno solo se cargan al inicio

### App se queda en blanco

1. Revisa la consola de Expo para errores
2. Verifica que todas las dependencias estén instaladas
3. Limpia cache: `npx expo start --clear`

### Error de SafeAreaView

- Ya está solucionado, usa `react-native-safe-area-context`
- Si persiste, reinstala: `npm install react-native-safe-area-context`

## 📱 Build para Producción

### Android (APK)

```bash
# Build de desarrollo
eas build --platform android --profile development

# Build de producción
eas build --platform android --profile production
```

### iOS (IPA)

```bash
# Requiere cuenta de Apple Developer
eas build --platform ios --profile production
```

### Configurar EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
```

## 🎯 Próximas Características

- [ ] Calendario de citas
- [ ] Notificaciones push
- [ ] Historial de citas
- [ ] Valoraciones y reseñas
- [ ] Pagos integrados
- [ ] Chat con el negocio

## 🔐 Seguridad

### Tokens
- Los tokens se almacenan en AsyncStorage (encriptado en iOS)
- Se envían automáticamente en cada request
- Se eliminan al hacer logout

### Datos Sensibles
- No almacenar passwords (el sistema usa solo teléfono)
- Los tokens expiran según configuración del backend

## 📝 Convenciones de Código

### Componentes
- PascalCase para nombres de componentes
- Usar TypeScript para props
- Exportar como default

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  // ...
}
```

### Estilos
- Usar StyleSheet.create
- Agrupar estilos relacionados
- Usar constantes para colores

## 🤝 Contribuir

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) en la raíz del proyecto.

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE)
