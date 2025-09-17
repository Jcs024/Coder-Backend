# 📚 Documentación de la API - E-Commerce

Documentación completa de los endpoints disponibles en la API del e-commerce.

## 🔗 Base URL
http://localhost:8080/api


## 📦 Product Endpoints

### Obtener todos los productos
**GET** `/products`

**Descripción:** Retorna una lista de todos los productos disponibles en el sistema.

**Response:**

{
  "success": true,
  "count": 2,
  "products": [
    {
      "id": 1,
      "title": "GTA V",
      "description": "Juego de mundo abierto",
      "price": 58,
      "thumbnail": null,
      "code": "GTA001",
      "stock": 10,
      "status": true,
      "category": "videojuegos"
    }
  ]
}

**Codigos de estado:**

200 OK - Solicitud exitosa

500 Internal Server Error - Error del servidor

### Obtener producto por ID
**GET** /products/:pid

**Descripción:** Retorna un producto específico basado en su ID.

**Parameters:**

pid (number) - ID único del producto

**Response:**

{
  "success": true,
  "product": {
    "id": 1,
    "title": "GTA V",
    "description": "Juego de mundo abierto",
    "price": 58,
    "thumbnail": null,
    "code": "GTA001",
    "stock": 10,
    "status": true,
    "category": "videojuegos"
  }
}

**Códigos de estado:**

200 OK - Producto encontrado

404 Not Found - Producto no existe

500 Internal Server Error - Error del servidor

### Crear nuevo producto

**POST** /products

**Descripción:** Crea un nuevo producto en el sistema.

Body:
{
  "title": "Producto Nuevo",
  "description": "Descripción del producto",
  "price": 99.99,
  "code": "UNICO123",
  "stock": 50,
  "category": "categoria-ejemplo"
}

**Campos obligatorios:**

title (string) - Nombre del producto

description (string) - Descripción detallada

price (number) - Precio del producto

code (string) - Código único identificador

stock (number) - Cantidad disponible

category (string) - Categoría del producto

**Campos opcionales:**

thumbnail (string) - URL de imagen (default: null)

status (boolean) - Estado activo/inactivo (default: true)

**Response:**

{
  "success": true,
  "message": "Producto creado exitosamente",
  "product": {
    "id": 2,
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "price": 99.99,
    "thumbnail": null,
    "code": "UNICO123",
    "stock": 50,
    "status": true,
    "category": "categoria-ejemplo"
  }
}

**Códigos de estado:**

201 Created - Producto creado exitosamente

400 Bad Request - Datos inválidos o faltantes

409 Conflict - Código de producto ya existe

500 Internal Server Error - Error del servidor

### Actualizar producto

**PUT** /products/:pid

**Parameters:**

pid - ID del producto a actualizar

Body: (Campos a actualizar)

{
  "price": 79.99,
  "stock": 30
}

**Response:**
{
  "success": true,
  "message": "Producto actualizado",
  "product": {
    "id": 2,
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "price": 79.99,
    "thumbnail": null,
    "code": "UNICO123",
    "stock": 30,
    "status": true,
    "category": "categoria-ejemplo"
  }
}

### Eliminar producto
**DELETE** /products/:pid

**Parameters:**

pid - ID del producto a eliminar

**Response:**
{
  "success": true,
  "message": "Producto eliminado",
  "product": {
    "id": 2,
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "price": 79.99,
    "thumbnail": null,
    "code": "UNICO123",
    "stock": 30,
    "status": true,
    "category": "categoria-ejemplo"
  }
}

## 🛒 Cart Endpoints
Obtener todos los carritos
**GET** /carts

**Response:**

{
  "success": true,
  "count": 2,
  "carts": [
    {
      "id": 1,
      "products": [
        {
          "product": 1,
          "quantity": 2
        }
      ]
    },
    {
      "id": 2,
      "products": []
    }
  ]
}

### Crear nuevo carrito
**POST** /carts

**Response:**

{
  "success": true,
  "message": "Carrito creado exitosamente",
  "cart": {
    "id": 3,
    "products": []
  }
}

### Obtener carrito por ID
**GET** /carts/:cid

**Parameters:**

cid - ID del carrito

**Response:**
{
  "success": true,
  "cart": {
    "id": 1,
    "products": [
      {
        "product": 1,
        "quantity": 2
      }
    ]
  }
}

### Agregar producto al carrito
**POST** /carts/:cid/product/:pid

**Parameters:**

cid - ID del carrito

pid - ID del producto

**Response:**
{
  "success": true,
  "message": "Producto agregado al carrito",
  "cart": {
    "id": 1,
    "products": [
      {
        "product": 1,
        "quantity": 3
      }
    ]
  }
}

## 🌐 Web Endpoints

### Página principal
**GET** /

### Muestra todos los productos

Interfaz estática

### Productos en tiempo real
**GET** /realtimeproducts

Interfaz con WebSockets

Agregar/eliminar productos en tiempo real

Notificaciones con SweetAlert2

## ⚡ WebSockets Events
**Eventos del Cliente**
newProduct - Crear nuevo producto

deleteProduct - Eliminar producto

**Eventos del Servidor**
updateProducts - Actualizar lista de productos

productSuccess - Notificación de éxito

productError - Notificación de error

## 🎨 Ejemplos de Uso
**Ejemplo 1:** Crear producto con cURL

curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mouse Gamer",
    "description": "Mouse RGB 6400DPI",
    "price": 45.99,
    "code": "MGAMER001",
    "stock": 25,
    "category": "perifericos"
  }'

**Ejemplo 2:** Obtener carrito específico
    curl http://localhost:8080/api/carts/1

**Ejemplo 3:** Agregar producto al carrito
    curl -X POST http://localhost:8080/api/carts/1/product/1


## 🔍 Códigos de Estado HTTP
200 OK - Solicitud exitosa

201 Created - Recurso creado exitosamente

400 Bad Request - Datos inválidos

404 Not Found - Recurso no encontrado

500 Internal Server Error - Error del servidor

## 🚨 Manejo de Errores
Todos los endpoints retornan formato JSON consistente:

**Error Response:**

{
  "success": false,
  "error": "Mensaje de error descriptivo"
}

## 📊 Validaciones

**Productos**
✅ Todos los campos obligatorios presentes

✅ Precio y stock son números válidos

✅ Código único no duplicado

✅ Stock no negativo

**Carritos**
✅ ID de carrito válido

✅ ID de producto válido

✅ Producto existe antes de agregar al carrito

## 🔄 Persistencia

Los datos se persisten en archivos JSON:

src/data/products.json - Productos

src/data/carts.json - Carritos