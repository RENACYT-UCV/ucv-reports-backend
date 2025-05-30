## Pruebas con Postman

### 1. Crear Reporte (POST)

- **URL**: `http://localhost:3000/reportes`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "facultad": "Ingenieria",
    "turno": "Mañana",
    "Pabellon": "Pabellon A",
    "evidencia": "URL_de_evidencia",
    "descripcion": "Problema con el proyector en el aula 101",
    "fecha": "2023-10-27",
    "estado": "Pendiente",
    "Piso": "Piso 1",
    "Salon": "Aula 101",
    "Articulos": "Proyector",
    "Motivo": ""
  }
  ```

### 2. Obtener Todos los Reportes (GET)

- **URL**: `http://localhost:3000/reportes`
- **Método**: `GET`

### 3. Obtener Reporte por ID (GET)

- **URL**: `http://localhost:3000/reportes/:id` (reemplaza `:id` con el ID del reporte, ej. `http://localhost:3000/reportes/1`)
- **Método**: `GET`

### 4. Actualizar Reporte (PATCH)

- **URL**: `http://localhost:3000/reportes/:id` (reemplaza `:id` con el ID del reporte)
- **Método**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "estado": "En Proceso"
  }
  ```

  _Nota: Puedes enviar solo los campos que deseas actualizar._

### 5. Eliminar Reporte (DELETE)

- **URL**: `http://localhost:3000/reportes/:id` (reemplaza `:id` con el ID del reporte)
- **Método**: `DELETE`

### 6. Aprobar Reporte (PATCH)

- **URL**: `http://localhost:3000/reportes/:id/aprobar` (reemplaza `:id` con el ID del reporte)
- **Método**: `PATCH`

### 7. Desaprobar Reporte (PATCH)

- **URL**: `http://localhost:3000/reportes/:id/desaprobar` (reemplaza `:id` con el ID del reporte)
- **Método**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "motivo": "No cumple con los criterios de reporte."
  }
  ```
