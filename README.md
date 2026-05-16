# UCVReports

Sistema de gestión de reportes de fallas de equipos e infraestructura de la Universidad Central de Venezuela (UCV). Permite a docentes y personal técnico crear reportes de incidencias, asignarlos, gestionarlos y llevar un historial de resolución.

## Tecnologías

| Capa | Tecnología |
|---|---|
| API | NestJS + TypeORM |
| Frontend | HTML/CSS/JS estático servido con Express |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | JWT Bearer (Passport) |
| Contenedores | Docker Compose |

## Acceso al sistema

| Servicio | URL |
|---|---|
| Frontend | http://localhost:3001 |
| API | http://localhost:8001 |

### Credenciales de prueba

| Campo | Valor |
|---|---|
| usuario | `adminus` |
| contraseña | `Admin1234!` |
| cargo | Administrador |

> El nombre de usuario (`usuario`) es generado automáticamente por el sistema al registrar un usuario. El formato es: primeras letras del nombre + apellido paterno abreviado.

## Levantar el sistema

```bash
docker compose up -d
```

Para reconstruir imágenes tras cambios de código:

```bash
docker compose up --build -d
```

Para detener y eliminar volúmenes (reinicio limpio de BD):

```bash
docker compose down -v
```

> **Nota:** Si UCVDeportes también está corriendo, UCVReports usa los puertos **8001** (API) y **3001** (frontend) para evitar conflictos.

## Crear usuario inicial (si se reinicia la BD)

Al hacer `docker compose down -v` la BD se vacía. Para crear el primer usuario:

```bash
# 1. Crear un cargo
curl -X POST http://localhost:8001/cargos \
  -H "Content-Type: application/json" \
  -d '{"descripcion":"Administrador"}'

# 2. Crear usuario admin
curl -X POST http://localhost:8001/usuarios/add \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Admin",
    "apellido_paterno": "UCVReports",
    "apellido_materno": "Sistema",
    "contraseña": "Admin1234!",
    "id_cargo": 1
  }'
```

## Estructura del proyecto

```
UCVReports/
├── ucv-reports-backend/               # NestJS API
│   └── src/
│       ├── config/
│       │   └── database.config.ts     # Config TypeORM + Supabase SSL
│       └── modules/
│           ├── auth/                  # Login, JWT, recuperación de cuenta
│           ├── usuarios/              # CRUD usuarios
│           ├── cargo/                 # Roles/cargos del sistema
│           ├── reportes/              # Reportes de fallas
│           ├── historial_reportes/    # Historial de resolución
│           ├── hardware/              # Inventario de equipos
│           ├── pabellon/              # Pabellones de la universidad
│           ├── piso/                  # Pisos por pabellón
│           ├── salon/                 # Salones por piso
│           └── google-drive/          # Subida de evidencia fotográfica
├── ucv-reports-frontend/              # Frontend estático
│   ├── HTML/
│   │   ├── auth/
│   │   │   ├── login.html             # Inicio de sesión
│   │   │   ├── register.html          # Registro de usuario
│   │   │   ├── recuperacion.html      # Solicitar recuperación
│   │   │   └── recuperacion_cuenta.html # Código OTP + nueva contraseña
│   │   ├── index.html                 # Panel principal (dashboard)
│   │   ├── reporte_enviar/            # Crear nuevo reporte
│   │   ├── reportes_ver/              # Ver reportes asignados al técnico
│   │   ├── reportes_gestion/          # Gestión de reportes (admin)
│   │   └── reportes_globales/         # Vista global de todos los reportes
│   └── server.js                      # Servidor Express estático
└── docker-compose.yml
```

## API — Endpoints

Todos los endpoints (excepto login, register y recuperación) requieren header:
```
Authorization: Bearer {jwt_token}
```

### Autenticación

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/login` | Iniciar sesión → devuelve JWT | No |
| POST | `/auth/profile` | Verificar token y obtener perfil | Sí |
| POST | `/auth/verificar-datos-recuperacion` | Verificar datos para recuperar cuenta | No |
| POST | `/auth/change-password` | Cambiar contraseña | No |

**Body de login:**
```json
{
  "usuario": "adminus",
  "contraseña": "Admin1234!"
}
```

### Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/usuarios/add` | Registrar usuario | No |
| GET | `/usuarios` | Listar todos los usuarios | Sí |
| GET | `/usuarios/habilitados` | Listar usuarios activos | Sí |
| GET | `/usuarios/eliminados` | Listar usuarios desactivados | Sí |
| GET | `/usuarios/:id` | Ver usuario por ID | Sí |
| PUT | `/usuarios/:id` | Actualizar usuario | Sí |
| PUT | `/usuarios/:id/disable` | Deshabilitar usuario | Sí |
| PUT | `/usuarios/:id/enable` | Habilitar usuario | Sí |
| DELETE | `/usuarios/:id` | Eliminar usuario | Sí |
| GET | `/usuarios/buscar-usuario/:usuario` | Buscar por nombre de usuario exacto | Sí |
| GET | `/usuarios/buscar-parcial/:usuario` | Buscar por nombre parcial | Sí |
| GET | `/usuarios/role/:id_cargo` | Listar usuarios por cargo | Sí |

### Cargos (Roles)

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/cargos` | Listar todos los cargos | No |
| GET | `/cargos/:id` | Ver cargo por ID | No |
| POST | `/cargos` | Crear cargo | Sí |
| PATCH | `/cargos/:id` | Actualizar cargo | Sí |
| DELETE | `/cargos/:id` | Eliminar cargo | Sí |

### Reportes

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/reportes` | Crear reporte de falla | Sí |
| GET | `/reportes` | Listar reportes del usuario | Sí |
| GET | `/reportes/aprobados` | Listar reportes aprobados | Sí |
| GET | `/reportes/todos-con-usuario` | Todos los reportes con datos de usuario | Sí |
| GET | `/reportes/:id` | Ver reporte por ID | Sí |
| PATCH | `/reportes/:id` | Actualizar reporte | Sí |
| DELETE | `/reportes/:id` | Eliminar reporte | Sí |
| PATCH | `/reportes/:id/aprobar` | Aprobar reporte | Sí |
| PATCH | `/reportes/:id/desaprobar` | Desaprobar reporte | Sí |
| PATCH | `/reportes/:id/resolver` | Marcar reporte como resuelto | Sí |
| GET | `/reportes/detalle/:id_reporte` | Detalle completo del reporte | Sí |
| GET | `/reportes/resueltos/:usuario_id` | Reportes resueltos por usuario | Sí |
| GET | `/reportes/resueltos-personal/:id_personal` | Reportes resueltos por técnico | Sí |
| POST | `/reportes/tomar-reporte` | Asignar reporte a técnico | Sí |
| GET | `/reportes/buscar-usuario/:usuario` | Reportes de un usuario | Sí |

### Historial de Reportes

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/historial-reportes/add` | Agregar entrada al historial | Sí |
| GET | `/historial-reportes/:idUsuario` | Historial de un usuario | Sí |
| PATCH | `/historial-reportes/:id/estado` | Cambiar estado (Pendiente/Tomado) | Sí |
| GET | `/historial-reportes/resueltos-desaprobados` | Reportes resueltos y desaprobados | Sí |

### Hardware (Inventario de equipos)

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/hardware` | Listar equipos | Sí |
| POST | `/hardware` | Registrar equipo | Sí |
| GET | `/hardware/:id` | Ver equipo | Sí |
| POST | `/hardware/multiple` | Registrar múltiples equipos | Sí |
| GET | `/hardware/entrada-productos` | Ver entradas de productos | Sí |
| PATCH | `/hardware/:id/habilitar` | Habilitar equipo | Sí |
| PATCH | `/hardware/:id/descomponer` | Marcar equipo como dañado | Sí |
| PUT | `/hardware/:id/ubicacion` | Actualizar ubicación del equipo | Sí |
| GET | `/hardware/latest-code/:id_articulo` | Último código de artículo | Sí |
| GET | `/hardware/descompuesto/:idArticuloTipo` | Equipos dañados por tipo | Sí |

### Infraestructura (Pabellones, Pisos, Salones)

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/pabellon` | Listar pabellones | Sí |
| POST | `/pabellon` | Crear pabellón | Sí |
| GET | `/pabellon/:id` | Ver pabellón | Sí |
| PUT | `/pabellon/:id` | Actualizar pabellón | Sí |
| DELETE | `/pabellon/:id` | Eliminar pabellón | Sí |
| GET | `/piso` | Listar pisos | Sí |
| POST | `/piso` | Crear piso | Sí |
| GET | `/piso/:id` | Ver piso | Sí |
| PUT | `/piso/:id` | Actualizar piso | Sí |
| DELETE | `/piso/:id` | Eliminar piso | Sí |
| GET | `/piso/byPabellon/:idPabellon` | Pisos de un pabellón | Sí |
| GET | `/salon` | Listar salones | Sí |
| GET | `/salon/piso/:id_piso` | Salones de un piso | Sí |

### Google Drive (Evidencia fotográfica)

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/google-drive/reportes/:id/upload-evidencia` | Subir imagen de evidencia a Drive | Sí |

## Base de datos

Alojada en **Supabase** (PostgreSQL). TypeORM sincroniza el esquema automáticamente al iniciar (`synchronize: true`).

### Tablas principales

| Tabla | Descripción |
|---|---|
| `cargo` | Cargos/roles del sistema |
| `usuario` | Usuarios del sistema |
| `reporte` | Reportes de fallas |
| `historial_reporte` | Historial de estados de reportes |
| `hardware` | Inventario de equipos |
| `pabellon` | Pabellones universitarios |
| `piso` | Pisos de cada pabellón |
| `salon` | Salones de cada piso |

## Variables de entorno

Crea un archivo `.env` en `ucv-reports-backend/` con estos valores:

```env
DATABASE_URL=postgresql://postgres.hfqoomymwqchhbclupku:6udzchjFFKh5svq0@aws-1-us-east-2.pooler.supabase.com:5432/postgres
JWT_SECRET=ucv_reports_jwt_secret_change_in_production
```

## Flujo del sistema

```
Docente/Usuario
    │
    ├─→ Crea reporte de falla (salón, equipo, descripción)
    │       └─→ Estado: Pendiente
    │
    ├─→ Administrador aprueba el reporte
    │       └─→ Estado: Aprobado
    │
    ├─→ Técnico toma el reporte
    │       └─→ Estado: En progreso (Tomado en historial)
    │
    └─→ Técnico sube evidencia y marca como resuelto
            └─→ Estado: Resuelto
```
