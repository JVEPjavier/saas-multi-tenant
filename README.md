# 📱 Booking SaaS - Sistema Multi-Tenant de Reservas

Sistema completo de gestión de reservas multi-tenant con backend Laravel y aplicación móvil React Native.

## 🏗️ Arquitectura del Proyecto

```
saas multi-tenant/
├── booking-saas/      # Backend API (Laravel 10 + Filament)
└── booking-app/       # App Móvil (React Native + Expo)
```

## ✨ Características

### Backend (Laravel)
- 🏢 **Multi-tenancy**: Soporte para múltiples negocios en una sola instalación
- 🔐 **Autenticación**: Laravel Sanctum para API tokens
- 👥 **Panel Admin**: Filament 3.0 para gestión administrativa
- 📅 **Gestión de Citas**: Sistema completo de reservas
- 👨‍💼 **Personal**: Gestión de empleados y servicios
- 🕐 **Horarios**: Control de disponibilidad y horarios

### App Móvil (React Native)
- 📱 **Cross-Platform**: iOS y Android con Expo
- 🎨 **UI Moderna**: Componentes personalizados y diseño responsivo
- 🔄 **Estado Global**: Zustand para gestión de estado
- 🌐 **Navegación**: Expo Router con file-based routing
- 🔒 **Autenticación**: Login/Registro por teléfono

## 🚀 Inicio Rápido

### Prerrequisitos

- **Backend**: PHP 8.1+, Composer, MySQL/PostgreSQL
- **Frontend**: Node.js 18+, npm/yarn
- **Móvil**: Expo Go app (para testing en dispositivo físico)

### 1️⃣ Clonar el Repositorio

```bash
git clone <repository-url>
cd "saas multi-tenant"
```

### 2️⃣ Configurar Backend

```bash
cd booking-saas
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --host=0.0.0.0 --port=8000
```

Ver [booking-saas/README.md](booking-saas/README.md) para más detalles.

### 3️⃣ Configurar App Móvil

```bash
cd booking-app
npm install
# Actualizar .env con la IP de tu backend
npx expo start --clear
```

Ver [booking-app/README.md](booking-app/README.md) para más detalles.

## 🔑 Credenciales de Prueba

### Tenants Disponibles
- `demo-barbershop` - Barbería de demostración
- `elegant-salon` - Salón de belleza

### Clientes de Prueba
| Nombre | Teléfono | Email |
|--------|----------|-------|
| John Doe | `+1111111111` | john@example.com |
| Jane Smith | `+2222222222` | jane@example.com |
| Bob Johnson | `+3333333333` | bob@example.com |

### Panel Admin (Filament)
```
URL: http://localhost:8000/admin
Email: admin@example.com
Password: password
```

## 📚 Documentación

- [Backend README](booking-saas/README.md) - Configuración y API del backend
- [Frontend README](booking-app/README.md) - Configuración de la app móvil
- [API Documentation](booking-saas/docs/API.md) - Endpoints y ejemplos (si existe)

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Laravel 10
- **Admin Panel**: Filament 3.0
- **Auth**: Laravel Sanctum
- **Database**: MySQL/PostgreSQL
- **Permissions**: Spatie Laravel Permission

### Frontend
- **Framework**: React Native (Expo)
- **Routing**: Expo Router
- **State**: Zustand
- **HTTP**: Axios
- **UI**: Custom components

## 📁 Estructura del Proyecto

### Backend (booking-saas)
```
app/
├── Http/Controllers/Api/  # Controladores API
├── Models/                # Modelos Eloquent
└── Filament/             # Recursos Filament
database/
├── migrations/           # Migraciones
└── seeders/             # Seeders de prueba
routes/
└── api.php              # Rutas API
```

### Frontend (booking-app)
```
app/
├── (auth)/              # Pantallas de autenticación
├── (tabs)/              # Pantallas principales
└── _layout.tsx          # Layout raíz
components/
└── ui/                  # Componentes reutilizables
services/
└── api/                 # Servicios API
store/
└── auth.ts              # Store de autenticación
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

**Backend (.env)**:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=booking_saas
DB_USERNAME=root
DB_PASSWORD=
```

**Frontend (.env)**:
```env
EXPO_PUBLIC_API_URL=http://192.168.1.38:8000/api
```

> ⚠️ **Importante**: Reemplaza `192.168.1.38` con la IP de tu máquina en la red local

## 🧪 Testing

### Backend
```bash
cd booking-saas
php artisan test
```

### Frontend
```bash
cd booking-app
npm test
```

## 📱 Ejecutar en Dispositivo

1. Instala **Expo Go** en tu dispositivo móvil
2. Asegúrate de estar en la misma red que tu computadora
3. Escanea el QR code que aparece al ejecutar `npx expo start`

## 🐛 Troubleshooting

### Backend no responde
- Verifica que el servidor esté corriendo: `php artisan serve --host=0.0.0.0`
- Revisa los logs: `storage/logs/laravel.log`

### App no se conecta al backend
- Verifica que `EXPO_PUBLIC_API_URL` tenga la IP correcta
- Asegúrate de que ambos dispositivos estén en la misma red
- Reinicia Expo: `npx expo start --clear`

### Error "Customer not found"
- Usa uno de los teléfonos de prueba listados arriba
- O registra un nuevo usuario desde la app

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Tu Nombre - Desarrollo inicial

## 🙏 Agradecimientos

- Laravel Framework
- Filament Admin Panel
- Expo & React Native Community
