# 🛒 E-Commerce API - Backend

Una API RESTful completa para gestión de productos y carritos de compra, construida con Node.js, Express y Handlebars. Incluye WebSockets para actualizaciones en tiempo real.

## 🚀 Características

- ✅ API RESTful para productos y carritos
- ✅ WebSockets con Socket.io para tiempo real
- ✅ Motor de plantillas Handlebars
- ✅ Persistencia en archivos JSON
- ✅ Validación de datos completa
- ✅ Interfaz moderna con SweetAlert2
- ✅ Estilos responsivos y elegantes

## 📦 Estructura del Proyecto
back-entrega-1/
├── src/
│ ├── controllers/ # Controladores de la API
│ ├── managers/ # Gestores de datos (JSON)
│ ├── services/ # Lógica de negocio
│ ├── routes/ # Rutas de la API
│ ├── sockets/ # Configuración de WebSockets
│ ├── views/ # Plantillas Handlebars
│ ├── data/ # Archivos JSON de persistencia
│ └── config/ # Configuración de la app
├── public/ # Archivos estáticos (CSS, JS)
├── uploads/ # Archivos subidos (imágenes)
├── index.js # Punto de entrada principal
└── package.json # Dependencias del proyecto

## ⚡ Instalación

1. **Clonar el repositorio:**

git clone <tu-repositorio>
cd back-entrega-1

2. **Instalar dependencias:**

npm install

3. **Iniciar el servidor:**
# Desarrollo con nodemon
npm run dev

# Producción
npm start

4. **Abrir en el navegador:**

http://localhost:8080


# 🎯 Uso Rápido
1. Interfaz Web
Home: http://localhost:8080 - Lista de productos

Tiempo Real: http://localhost:8080/realtimeproducts - Gestión en tiempo real

2. API Endpoints
Productos: http://localhost:8080/api/products

Carritos: http://localhost:8080/api/carts

3. Ejemplos de API

# Obtener todos los productos
curl http://localhost:8080/api/products

# Crear un nuevo producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Producto Ejemplo",
    "description": "Descripción del producto",
    "price": 99.99,
    "code": "CODE123",
    "stock": 50,
    "category": "ejemplo"
  }'

# 🛠️ Dependencias Principales

## Production
express - Framework web

socket.io - WebSockets en tiempo real

express-handlebars - Motor de plantillas

multer - Manejo de archivos subidos

## Development
nodemon - Reinicio automático en desarrollo

sweetalert2 - Notificaciones elegantes

# Scripts Disponibles
npm run dev      # Desarrollo con nodemon
npm start        # Producción
npm test         # Ejecutar tests (próximamente)

# 🎨 Características de la Interfaz
Design Moderno: Gradientes y glassmorphism

Responsive: Adaptable a móviles y tablets

Tiempo Real: Actualización instantánea con WebSockets

Notificaciones: SweetAlert2 para mensajes elegantes

Validación: Formularios con validación client-side y server-side

# 🔧 Configuración
El puerto por defecto es 8080. Puedes modificarlo en:

src/config/config.js - Configuración general

src/app.js - Configuración del servidor

# 📊 Estructura de Datos

## Producto
{
  "id": 1,
  "title": "Producto Ejemplo",
  "description": "Descripción del producto",
  "price": 99.99,
  "thumbnail": null,
  "code": "CODE123",
  "stock": 50,
  "status": true,
  "category": "ejemplo"
}

## Carrito
{
  "id": 1,
  "products": [
    {
      "product": 1,
      "quantity": 2
    }
  ]
}