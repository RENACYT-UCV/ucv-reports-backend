### Pruebas con Postman

### 1. Crear Piso (POST)

- **URL**: `http://localhost:3000/piso`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "numero_piso": 1,
    "idpabellon": 1
  }
  ```

### 2. Obtener Todos los Pisos (GET)

- **URL**: `http://localhost:3000/piso`
- **Método**: `GET`

### 3. Obtener Piso por ID (GET)

- **URL**: `http://localhost:3000/piso/:id` (reemplaza `:id` con el ID del piso, ej. `http://localhost:3000/piso/1`)
- **Método**: `GET`

### 4. Actualizar Piso (PUT)

- **URL**: `http://localhost:3000/piso/:id` (reemplaza `:id` con el ID del piso)
- **Método**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "numero_piso": 2
  }
  ```

  _Nota: Puedes enviar solo los campos que deseas actualizar._

### 5. Eliminar Piso (DELETE)

- **URL**: `http://localhost:3000/piso/:id` (reemplaza `:id` con el ID del piso)
- **Método**: `DELETE`

### 6. Obtener Pisos por Pabellón (GET)

- **URL**: `http://localhost:3000/piso/byPabellon/:idPabellon` (reemplaza `:idPabellon` con el ID del pabellón, ej. `http://localhost:3000/piso/byPabellon/1`)
- **Método**: `GET`
