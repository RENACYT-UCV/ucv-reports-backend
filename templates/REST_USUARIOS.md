### Pruebas con Postman

### 1. Crear Usuario (POST)

- **URL**: `http://localhost:3000/usuarios/add`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "nombre": "Juan",
    "apellido_paterno": "Perez",
    "apellido_materno": "Gomez",
    "contraseña": "password123",
    "id_cargo": 1
  }
  ```

  _Nota: El `usuario` se generará automáticamente (ej. `juanperezg`) y el `Estado` se establecerá como 'Habilitado'._

### 2. Obtener Todos los Usuarios (GET)

- **URL**: `http://localhost:3000/usuarios`
- **Método**: `GET`

### 3. Obtener Usuario por ID (GET)

- **URL**: `http://localhost:3000/usuarios/:id` (reemplaza `:id` con el ID del usuario, ej. `http://localhost:3000/usuarios/1`)
- **Método**: `GET`

### 4. Actualizar Usuario (PUT)

- **URL**: `http://localhost:3000/usuarios/:id` (reemplaza `:id` con el ID del usuario)
- **Método**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "nombre": "Juanito"
  }
  ```

  _Nota: Puedes enviar solo los campos que deseas actualizar._

### 5. Deshabilitar Usuario (PUT)

- **URL**: `http://localhost:3000/usuarios/:id/disable` (reemplaza `:id` con el ID del usuario)
- **Método**: `PUT`

### 6. Habilitar Usuario (PUT)

- **URL**: `http://localhost:3000/usuarios/:id/enable` (reemplaza `:id` con el ID del usuario)
- **Método**: `PUT`

### 7. Eliminar Usuario (DELETE)

- **URL**: `http://localhost:3000/usuarios/:id` (reemplaza `:id` con el ID del usuario)
- **Método**: `DELETE`
