# 📚 Documentación de la API - E-Commerce
  API RESTful para gestión de **productos** y **carritos**, con persistencia en **MongoDB Atlas**.

## 🔗 Base URL
  http://localhost:8080/api

## 📦 Productos

### Obtener todos los productos

**GET** `/products`

- Retorna todos los productos.
- Soporta query params para **paginación, filtro y ordenamiento**:
  - `?limit=10&page=2`
  - `?category=videojuegos`
  - `?sort=price`

**Ejemplo de respuesta:**
{
  "success": true,
  "count": 2,
  "products": [...]
}

### Obtener producto por ID

**GET** /products/:pid

pid: ID de MongoDB del producto.

### Crear producto

POST /products

Body requerido:

{
  "title": "Producto Nuevo",
  "description": "Descripción",
  "price": 99.99,
  "code": "UNICO123",
  "stock": 50,
  "category": "ejemplo"
}


Campos opcionales:

thumbnail (string, default: null)

status (boolean, default: true)


### Actualizar producto

PUT /products/:pid

Actualiza campos específicos de un producto.

Body ejemplo:

{
  "price": 79.99,
  "stock": 30
}

### Eliminar producto

DELETE /products/:pid

Elimina un producto por su ID.

## 🛒 Carritos

### Obtener todos los carritos

GET /carts

### Crear nuevo carrito

POST /carts

### Obtener carrito por ID

GET /carts/:cid

cid: ID de MongoDB del carrito.

### Agregar producto a carrito

POST /carts/:cid/product/:pid

cid: ID de carrito.

pid: ID de producto.

Aumenta cantidad si el producto ya existe en el carrito.

### Eliminar producto de carrito

DELETE /carts/:cid/product/:pid

Elimina un producto específico de un carrito.

### Vaciar carrito

DELETE /carts/:cid

Elimina todos los productos del carrito.

## ⚡ WebSockets

Cliente → Servidor:

newProduct: crear producto.

deleteProduct: eliminar producto.

Servidor → Cliente:

updateProducts: lista actualizada.

productSuccess: confirmación.

productError: error.

## 🔍 Códigos de Estado

200 OK – Solicitud exitosa.

201 Created – Recurso creado.

400 Bad Request – Datos inválidos.

404 Not Found – No encontrado.

500 Internal Server Error – Error del servidor.

## 🚨 Manejo de Errores

Formato consistente:

{
  "success": false,
  "error": "Mensaje descriptivo"
}

## 📊 Validaciones

Productos

Campos obligatorios presentes.

price y stock deben ser números válidos.

code único en la colección.

Carritos

ID de carrito y producto deben existir en MongoDB.

No se pueden agregar productos inexistentes.

🎨 Ejemplos rápidos con cURL
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mouse Gamer",
    "description": "Mouse RGB",
    "price": 45.99,
    "code": "MGAMER001",
    "stock": 25,
    "category": "perifericos"
  }'

# Obtener carrito por ID
curl http://localhost:8080/api/carts/652fcc02123abc7890def457

