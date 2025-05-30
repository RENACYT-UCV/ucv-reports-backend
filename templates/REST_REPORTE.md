### Pruebas con Postman - Módulo de Reportes

Este documento detalla los endpoints disponibles para el módulo de reportes y cómo interactuar con ellos usando Postman.

---

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
    "fecha": "2023-10-26",
    "estado": "Pendiente",
    "Piso": "Piso 1",
    "Salon": "Salon 101",
    "Articulos": "Proyector"
  }
  ```

---

### 2. Obtener Todos los Reportes (GET)

- **URL**: `http://localhost:3000/reportes`
- **Método**: `GET`

---

### 3. Obtener Reporte por ID (GET)

- **URL**: `http://localhost:3000/reportes/:id` (reemplaza `:id` con el ID del reporte, ej. `http://localhost:3000/reportes/1`)
- **Método**: `GET`

---

### 4. Aprobar Reporte (PATCH)

- **URL**: `http://localhost:3000/reportes/:id/aprobar` (reemplaza `:id` con el ID del reporte)
- **Método**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**: (No se requiere body para esta operación)

---

### 5. Desaprobar Reporte (PATCH)

- **URL**: `http://localhost:3000/reportes/:id/desaprobar` (reemplaza `:id` con el ID del reporte)
- **Método**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body (raw, JSON)**:

  ```json
  {
    "motivo": "No cumple con los criterios de aprobación."
  }
  ```

---

### 6. Eliminar Reporte (DELETE)

- **URL**: `http://localhost:3000/reportes/:id` (reemplaza `:id` con el ID del reporte)
- **Método**: `DELETE`