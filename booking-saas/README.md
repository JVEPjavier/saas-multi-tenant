# 🚀 Booking SaaS - Backend API

Backend Laravel para el sistema multi-tenant de gestión de reservas.

## 📋 Requisitos

- PHP 8.1 o superior
- Composer
- MySQL 8.0+ o PostgreSQL 13+
- Node.js 18+ (para compilar assets de Filament)

## ⚙️ Instalación

### 1. Instalar Dependencias

```bash
composer install
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` y configura tu base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=booking_saas
DB_USERNAME=root
DB_PASSWORD=tu_password
```

### 3. Generar Application Key

```bash
php artisan key:generate
```

### 4. Ejecutar Migraciones y Seeders

```bash
# Crear base de datos y poblar con datos de prueba
php artisan migrate:fresh --seed
```

Esto creará:
- 2 tenants de prueba (demo-barbershop, elegant-salon)
- 5 clientes por tenant
- Personal, servicios, horarios y citas de ejemplo
- Usuario admin para Filament

### 5. Compilar Assets (Filament)

```bash
npm run build
```

### 6. Iniciar Servidor

```bash
# Para desarrollo local
php artisan serve

# Para acceso desde red local (necesario para app móvil)
php artisan serve --host=0.0.0.0 --port=8000
```

El servidor estará disponible en `http://localhost:8000`

## 🔐 Acceso al Panel Admin

**URL**: `http://localhost:8000/admin`

**Credenciales**:
- Email: `admin@example.com`
- Password: `password`

## 📡 API Endpoints

### Autenticación

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "tenant_slug": "elegant-salon",
  "name": "Juan Pérez",
  "phone": "+5491123456789",
  "email": "juan@example.com"
}
```

**Respuesta**:
```json
{
  "customer": {
    "id": 1,
    "name": "Juan Pérez",
    "phone": "+5491123456789",
    "email": "juan@example.com"
  },
  "token": "1|abc123..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "tenant_slug": "elegant-salon",
  "phone": "+1111111111"
}
```

#### Obtener Usuario Actual
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### Servicios

```http
GET /api/services
Authorization: Bearer {token}
```

### Personal

```http
GET /api/staff
Authorization: Bearer {token}
```

### Citas

```http
# Listar citas del cliente
GET /api/appointments
Authorization: Bearer {token}

# Crear cita
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "service_id": 1,
  "staff_id": 1,
  "appointment_date": "2024-01-15",
  "start_time": "10:00:00"
}
```

## 🗄️ Estructura de Base de Datos

### Tablas Principales

- `tenants` - Negocios/Empresas
- `users` - Usuarios admin (Filament)
- `customers` - Clientes de cada tenant
- `staff` - Personal de cada tenant
- `services` - Servicios ofrecidos
- `appointments` - Citas/Reservas
- `schedules` - Horarios de disponibilidad

## 🔧 Comandos Útiles

### Desarrollo

```bash
# Limpiar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Ver rutas
php artisan route:list

# Crear nuevo modelo con migración
php artisan make:model NombreModelo -m

# Crear controlador
php artisan make:controller Api/NombreController

# Crear seeder
php artisan make:seeder NombreSeeder
```

### Base de Datos

```bash
# Ejecutar migraciones
php artisan migrate

# Revertir última migración
php artisan migrate:rollback

# Resetear y re-ejecutar todo
php artisan migrate:fresh --seed

# Ejecutar seeders específicos
php artisan db:seed --class=TenantSeeder
```

### Testing

```bash
# Ejecutar tests
php artisan test

# Con coverage
php artisan test --coverage
```

## 📦 Paquetes Principales

- **laravel/framework** (^10.0) - Framework base
- **laravel/sanctum** (^3.2) - Autenticación API
- **filament/filament** (3.0) - Panel administrativo
- **spatie/laravel-permission** (^6.23) - Roles y permisos
- **spatie/laravel-query-builder** (^5.7) - Query builder para API

## 🏗️ Arquitectura

### Multi-Tenancy

El sistema usa un enfoque de **multi-tenancy a nivel de base de datos compartida**:

- Todas las tablas tienen `tenant_id`
- Los modelos usan el trait `BelongsToTenant`
- El middleware `TenantScope` filtra automáticamente por tenant
- Cada request debe incluir `tenant_slug` en autenticación

### Autenticación

- **API**: Laravel Sanctum con tokens
- **Admin**: Session-based (Filament)
- Los clientes se autentican solo con teléfono (sin password)

## 🔒 Seguridad

### Configuración de CORS

Edita `config/cors.php` para permitir requests desde tu app móvil:

```php
'allowed_origins' => ['*'], // En producción, especifica dominios
```

### Rate Limiting

Las rutas API tienen rate limiting configurado en `app/Http/Kernel.php`:

```php
'api' => [
    'throttle:60,1', // 60 requests por minuto
],
```

## 🐛 Debugging

### Logs

Los logs se guardan en `storage/logs/laravel.log`

```bash
# Ver logs en tiempo real
tail -f storage/logs/laravel.log
```

### Query Debugging

Habilita query logging en tu código:

```php
DB::enableQueryLog();
// ... tu código
dd(DB::getQueryLog());
```

## 📊 Seeders de Prueba

### Tenants
- `demo-barbershop` - Barbería activa
- `elegant-salon` - Salón en período de prueba

### Clientes (para cada tenant)
- John Doe: `+1111111111`
- Jane Smith: `+2222222222`
- Bob Johnson: `+3333333333`
- Alice Brown: `+4444444444`
- Charlie Wilson: `+5555555555`

## 🚀 Despliegue

### Producción

1. Configurar variables de entorno de producción
2. Ejecutar migraciones: `php artisan migrate --force`
3. Optimizar: `php artisan optimize`
4. Compilar assets: `npm run build`
5. Configurar queue worker: `php artisan queue:work`

### Variables de Entorno Importantes

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-dominio.com

DB_CONNECTION=mysql
DB_HOST=tu-host
DB_DATABASE=tu-database

SANCTUM_STATEFUL_DOMAINS=tu-dominio.com
SESSION_DOMAIN=.tu-dominio.com
```

## 📝 Notas

- El sistema usa **soft deletes** en la mayoría de modelos
- Los timestamps son automáticos en todos los modelos
- Las citas tienen estados: pending, confirmed, completed, cancelled
- Los horarios se definen por día de la semana

## 🤝 Contribuir

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) en la raíz del proyecto.

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE)
